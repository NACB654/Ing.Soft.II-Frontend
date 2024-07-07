'use client'

import MyTextInput from "@/app/components/TextInputs/MyTextInputs";
import MyButtons from "@/app/components/Buttons/MyButtons";
import styles from "./search.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import trabajosAPI from "@/app/api/trabajosApi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


export default function SearchPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [totales, setTotales] = useState({})

  const handleClick = () => {
    router.push(`/home/results?keyword=${value}`);
  };

  const handleLoad = async () => {
    const result = await trabajosAPI.visualizarTotales();

    if (result.data) {
      console.log(result.data)
      setTotales(result.data);
    }
  }

  useEffect(() => {
    handleLoad();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.box1}>
        <div className={styles.buscador}>
          <MyTextInput
            label={"Buscar"}
            placeholder={"Ingresa una o más palabras clave"}
            width={"690px"}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={styles.boton}>
            <MyButtons label={"Buscar"} onClick={handleClick} />
          </div>

          <div className={styles.carruselBox}>
            <h2 className={styles.h2}>Mira algunos videos referenciales aqui</h2>
            <Carousel className={styles.carrusel} showThumbs={false}  autoPlay infiniteLoop interval={5000}>
              <div>
                <iframe
                  className={styles.video}
                  allowfullscreen
                  src="https://contenidos.ulima.edu.pe/bibliofiles/gsu/Videotutoriales/APA_2022/Módulo1/Integridad_academica/Integridad2024.mp4"
                ></iframe>
              </div>
              <div>
                <iframe
                  className={styles.video}
                  allowfullscreen
                  src="https://contenidos.ulima.edu.pe/bibliofiles/gsu/Videotutoriales/APA_2022/Módulo1/tipos_citas_agosto.mp4"
                ></iframe>
              </div>
              <div>
                <iframe
                  className={styles.video}
                  allowfullscreen
                  src="https://contenidos.ulima.edu.pe/bibliofiles/gsu/Videotutoriales/APA_2022/Módulo1/Referencias_agosto.mp4"
                ></iframe>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className={styles.resultados}>
        <div className={styles.tituloResultados}>Lo más trabajado</div>
        <div className={styles.listaResultados}>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Área / Subárea</div>
            {totales?.areasYSubareas?.map((item) => {
              return (
                <div className={styles.categoriaItem}>
                  {item.area.descripcion} / {item.descripcion}<span className={styles.cantidad}>{item.totalTrabajos}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Curso</div>
            {totales?.cursos?.map((item) => {
              return (
                <div className={styles.categoriaItem}>
                  {item.descripcion}<span className={styles.cantidad}>{item.totalTrabajos}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Periodo</div>
            {totales?.periodos?.map((item) => {
              return (
                <div className={styles.categoriaItem}>
                  {item.descripcion}<span className={styles.cantidad}>{item.totalTrabajos}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>ODS</div>
            {totales?.ods?.map((item) => {
              return (
                <div className={styles.categoriaItem}>
                  {item.descripcion}<span className={styles.cantidad}>{item.totalTrabajos}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Asesor</div>
            {totales?.asesores?.map((item) => {
              return (
                <div className={styles.categoriaItem}>
                  {item.name} {item.last_name}<span className={styles.cantidad}>{item.totalTrabajos}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
