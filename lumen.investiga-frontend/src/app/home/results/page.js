"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./results.module.css";

export default function ResultPage() {
  const router = useRouter();
  const [resultados, setResultados] = useState([{}]);

  const handleLoad = () => {
    const query = router.query;
    console.log(query);
  };

  useEffect(() => {
    handleLoad();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.resultados}>
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
      </div>
    </main>
  );
}
