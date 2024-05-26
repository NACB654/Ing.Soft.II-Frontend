'use client'

import MyTextInput from "@/app/components/TextInputs/MyTextInputs";
import MyButtons from "@/app/components/Buttons/MyButtons";
import styles from "./search.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleClick = () => {
    router.push(`/home/results?keyword=${value}`);
  };

  return (
    <main className={styles.main}>
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
      </div>
      <div className={styles.resultados}>
        <div className={styles.tituloResultados}>Lo más trabajado</div>
        <div className={styles.listaResultados}>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Área</div>
            <div className={styles.categoriaItem}>
              Software <span className={styles.cantidad}>55</span>
            </div>
            <div className={styles.categoriaItem}>
              IoT <span className={styles.cantidad}>32</span>
            </div>
            <div className={styles.categoriaItem}>
              Cloud Computing <span className={styles.cantidad}>27</span>
            </div>
          </div>
          <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>Curso</div>
            <div className={styles.categoriaItem}>
              Seminario I <span className={styles.cantidad}>127</span>
            </div>
            <div className={styles.categoriaItem}>
              TPI <span className={styles.cantidad}>96</span>
            </div>
            <div className={styles.categoriaItem}>
              Seminario II <span className={styles.cantidad}>45</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
