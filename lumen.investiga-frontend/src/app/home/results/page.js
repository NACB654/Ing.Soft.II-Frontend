"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./results.module.css";
import MyTextInput from "@/app/components/TextInputs/MyTextInputs";
import MyButtons from "@/app/components/Buttons/MyButtons";
import ResultCard from "@/app/components/ResultCard/ResultCard";
import trabajosAPI from "@/app/api/trabajosApi";

export default function ResultPage() {
  const router = useRouter();
  const serachParams = useSearchParams();
  const [value, setValue] = useState("");
  const [resultados, setResultados] = useState([{}]);

  const [sortOrder, setSortOrder] = useState('asc'); // Estado para manejar el orden de los resultados

  const handleLoad = async () => {
    const query = serachParams.get("keyword");
    console.log(query);
    const result = await trabajosAPI.mostrarResultados({ keyword: query });
    
    if (result.data) {
      console.log(result.data);
      setResultados(result.data);
    }
  };


  const sortResults = (results, order) => {
    return results.sort((a, b) => {
      if (order === 'asc') {
        return a.titulo.localeCompare(b.titulo);
      } else {
        return b.titulo.localeCompare(a.titulo);
      }
    });
  };

  /*// Función de ordenamiento que no muta el array original
  const sortResults = (results, order) => {
    // Se crea una copia del array antes de ordenarlo para evitar mutar el estado directamente
    return [...results].sort((a, b) => {
      return order === 'asc' ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo);
    });
  }; */ 

  useEffect(() => {
    handleLoad();
  }, []);


  useEffect(() => {
    if (resultados.length > 0) {
      setResultados(prevResultados => sortResults([...prevResultados], sortOrder));
    }
  }, [sortOrder]);
  

  const handleClick = () => {
    router.push(`/home/results?keyword=${value}`);
  };


  return (
    <main className={styles.main}>
      <div className={styles.results}>
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

          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className={styles.dropdown}>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          </select>

        </div>
        <div className={styles.trabajos}>
          {resultados?.map((item, key) => {
            return (
              <ResultCard
                id={item.id}
                title={item.titulo}
                subtitle={item.alumno?.name + " " + item.alumno?.last_name}
                description={item.abstract}
                key={key}
                onClick={() => router.push(`/home/detalle?id=${item.id}`)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.resultados}>
        <div className={styles.tituloResultados}>Filtros</div>
        <aside className={styles.filters}>
          <div className={styles.filterSection}>
            <h3>Área</h3>
            <label>
              <input type="checkbox" checked />
              IoT
            </label>
            <label>
              <input type="checkbox" />
              Software
            </label>
            <label>
              <input type="checkbox" />
              Cloud Computing
            </label>
            <label>
              <input type="checkbox" />
              Inteligencia Artificial
            </label>
          </div>
          <div className={styles.filterSection}>
            <h3>Periodo</h3>
            <label>
              <input type="checkbox" checked />
              2022-2
            </label>
            <label>
              <input type="checkbox" />
              2022-1
            </label>
            <label>
              <input type="checkbox" />
              2021-2
            </label>
          </div>
        </aside>
      </div>
    </main>
  );
}
