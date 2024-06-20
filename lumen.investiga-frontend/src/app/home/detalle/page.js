"use client";

import React, { useState, useEffect } from "react";
import styles from "./detalle.module.css";
import MyButtons from "@/app/components/Buttons/MyButtons";
import { useSearchParams } from "next/navigation";
import trabajosAPI from "@/app/api/trabajosApi";
import { style } from "@mui/system";
import MyTextArea from "@/app/components/TextArea/MyTextArea";

export default function DetallePage() {
  const searchParams = useSearchParams();
  const [trabajo, setTrabajo] = useState({});

  const handleLoad = async () => {
    const query = searchParams.get("id");
    console.log(query);
    const result = await trabajosAPI.mostrarDetalle(query);

    if (result.data) {
      console.log(result.data);
      setTrabajo(result.data);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.detalle}>
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
      </section>
      {<section className="comentarios">
        <MyTextArea name = {"descripcion"} placeholder = {"Deja tu comentario"} label = {"Comentario"}/>
        <MyButtons label={"Enviar"}/>

      </section>}
    </main>
  );
}
