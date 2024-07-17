"use client";

import React, { useState, useEffect } from "react";
import styles from "./detalle.module.css";
import MyButtons from "@/app/components/Buttons/MyButtons";
import { useSearchParams } from "next/navigation";
import trabajosAPI from "@/app/api/trabajosApi";
import MyTextArea from "@/app/components/TextArea/MyTextArea";
import MyRating from "@/app/components/Rating/MyRating";
import cometarioAPI from "@/app/api/comentarioApi";
import dayjs from "dayjs";
import { useUserContext } from "../layout";
import MyBookmarkButton from "@/app/components/Bookmark/MyBookmarkButton";

export default function DetallePage() {
  const user = useUserContext();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [trabajo, setTrabajo] = useState({});
  const [comentarios, setComentarios] = useState([{}]);
  const [value, setValue] = useState("");
  const [isMarked, setIsMarked] = useState(false);

  const handleLoad = async () => {
    const query = searchParams.get("id");
    // console.log(query);
    const result = await trabajosAPI.mostrarDetalle(query);

    if (result.data) {
      // console.log(result.data);
      setTrabajo(result.data);

      if (result.data.usuarios.filter(item => item.id == user?.id).length > 0) {
        // console.log("hola")
        setIsMarked(true)
      }

      setIsLoading(!isLoading)
    }
  };

  const handleLoadComentarios = async () => {
    const query = searchParams.get("id");
    console.log(query);
    const result = await cometarioAPI.getComentarios(query);

    if (result.data) {
      // console.log(result.data);
      setComentarios(result.data);
    }
  };

  useEffect(() => {
    handleLoad();
    handleLoadComentarios();
  }, []);

  const handleClick = async () => {
    const data = {
      descripcion: value,
      trabajoId: trabajo.id,
      usuarioId: user.id
    }

    const result = await cometarioAPI.crearComentario(data)

    if (result.data) {
      alert("Tu comentario se envio satisfactoriamente")
      location.reload()
    }
  };

  return (
    <main className={styles.main}>
      {!isLoading && <section className={styles.detalle}>
        <div className={styles.trabajo1}>
          <h2 className={styles.h2}>{trabajo?.titulo}</h2>
          <p className={styles.abstract}>{trabajo?.abstract}</p>
          <label className={styles.label}>Keywords</label>
          <div className={styles.keywords}>
            {trabajo?.keywords?.map((item, key) => {
              return (
                <p className={styles.p} key={key}>
                  {item.descripcion}
                </p>
              );
            })}
          </div>
          <MyButtons
            label={"Abrir PDF"}
            onClick={() => window.open(trabajo?.archivo_url, `_blank`)}
          />
          <div className={styles.rating}>
            <MyRating readOnly={false} rating={0} trabajoId={trabajo?.id} />
            {!user?.isTeacher && (
              <MyBookmarkButton
                userId={user?.id}
                trabajoId={trabajo?.id}
                isMarked={isMarked}
              />
            )}
          </div>
        </div>
        <div className={styles.trabajo2}>
          <div className={styles.columna1}>
            <label className={styles.label}>Autor</label>
            <p className={styles.p}>
              {trabajo?.alumno?.name + " " + trabajo?.alumno?.last_name}
            </p>
            <label className={styles.label}>Asesor</label>
            <p className={styles.p}>
              {trabajo?.asesor?.name + " " + trabajo?.asesor?.last_name}
            </p>
            <label className={styles.label}>Profesor</label>
            <p className={styles.p}>
              {trabajo?.profesor?.name + " " + trabajo?.profesor?.last_name}
            </p>
            <label className={styles.label}>Periodo</label>
            <p className={styles.p}>{trabajo?.periodo?.descripcion}</p>
          </div>
          <div className={styles.columna2}>
            <label className={styles.label}>Curso</label>
            <p className={styles.p}>{trabajo?.curso?.descripcion}</p>
            <label className={styles.label}>Área / Subarea</label>
            <p className={styles.p}>
              {trabajo?.subArea?.area?.descripcion +
                " / " +
                trabajo?.subArea?.descripcion}
            </p>
            <label className={styles.label}>ODS</label>
            <p className={styles.p}>
              {trabajo?.ods?.map((item) => item.descripcion + " ")}
            </p>
          </div>
        </div>
      </section>}
      <section className={styles.comentarios}>
        <MyTextArea
          name={"descripcion"}
          placeholder={"Deja tu comentario"}
          label={"Comenta acerca de este trabajo"}
          onChange={(e) => setValue(e.target.value)}
        />
        <MyButtons label={"Enviar"} onClick={handleClick} />
      </section>
      <section className={styles.listaComentarios}>
        <label className={styles.label}>Comentarios</label>
        {!isLoading && comentarios.length > 0 ? (
          comentarios?.map((item, key) => {
            return (
              <div className={styles.comentario}>
                <div className={styles.infoUsuario}>
                  <p className={styles.nombre}>
                    {item.usuario?.name + " " + item.usuario?.last_name}
                  </p>
                  {dayjs(item.creationDate).format("DD/MM/YYYY")}
                </div>
                <div className={styles.infoComentario}>{item.descripcion}</div>
              </div>
            );
          })
        ) : (
          <p className={styles.sinComentarios}>No se han dejado comentarios</p>
        )}
      </section>
    </main>
  );
}
