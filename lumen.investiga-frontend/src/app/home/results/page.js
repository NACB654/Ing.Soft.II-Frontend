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
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [resultados, setResultados] = useState([{ id: 0, titulo: "hola", alumno: { name: "p", last_name: "pp" }, abstract: "lorem ipsum" }]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedsubArea, setSelectedsubArea] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedODS, setSelectedODS] = useState('');
  const [selectedCurso, setSelectedCurso] = useState('');


  const [sortOrder, setSortOrder] = useState('asc');

  const handleLoad = async () => {
    const query = searchParams.get("keyword");
    console.log(query);
    const result = await trabajosAPI.mostrarResultados({ keyword: query });

    if (result?.data) {
      console.log(result?.data);
      setResultados(result?.data);
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

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handlesubAreaChange = (event) => {
    setSelectedsubArea(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleODSChange = (event) => {
    setSelectedODS(event.target.value);
  };

  const handleCursoChange = (event) => {
    setSelectedCurso(event.target.value);
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
                readOnly={true}
                rating={item.puntaje}
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
            <select value={selectedArea} onChange={handleAreaChange}>
              <option value="IoT">IoT</option>
              <option value="Software">Software</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Inteligencia Artificial">Inteligencia Artificial</option>
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Subárea</h3>
            <select value={selectedsubArea} onChange={handlesubAreaChange}>
              <option value="Procesamiento de Lenguaje Natural">Procesamiento de Lenguaje Natural</option>
              <option value="Aprendizaje Automático">Aprendizaje Automático</option>
              <option value="Minería de Datos">Minería de Datos</option>
              <option value="Seguridad de Sistemas y Aplicaciones">Seguridad de Sistemas y Aplicaciones</option>
              <option value="Computación de alto rendimiento">Computación de alto rendimiento</option>
              <option value="Redes y ciberseguridad">Redes y ciberseguridad</option>
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Periodo</h3>
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="2022-2">2022-2</option>
              <option value="2022-1">2022-1</option>
              <option value="2021-2">2021-2</option>
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>ODS</h3>
            <select value={selectedODS} onChange={handleODSChange}>
              <option value="ODS 1 - Fin de la Pobreza">ODS 1 - Fin de la Pobreza</option>
              <option value="ODS 2 - Hambre Cero">ODS 2 - Hambre Cero</option>
              <option value="ODS 3 - Salud y Bienestar">ODS 3 - Salud y Bienestar</option>
              <option value="ODS 4 - Educacion de Calidad">ODS 4 - Educacion de Calidad</option>
              <option value="ODS 5 - Igualdad de Genero">ODS 5 - Igualdad de Genero</option>
              <option value="ODS 6 - Agua Limpia y Saneamiento">ODS 6 - Agua Limpia y Saneamiento</option>
              <option value="ODS 7 - Energía Asequible y No Contaminable">ODS 7 - Energía Asequible y No Contaminable</option>
              <option value="ODS 8 - Trabajo Decente y Crecimiento Economico">ODS 8 - Trabajo Decente y Crecimiento Economico</option>
              <option value="ODS 9 - Industria, Innovacion e Infrastructura">ODS 9 - Industria, Innovacion e Infrastructura</option>
              <option value="ODS 10 - Reduccion de las Desigualdades">ODS 10 - Reduccion de las Desigualdades</option>
              <option value="ODS 11 - Ciudades y Comunidades Sostenibles">ODS 11 - Ciudades y Comunidades Sostenibles</option>
              <option value="ODS 12 - Produccion y Consumo Responsables">ODS 12 - Produccion y Consumo Responsables</option>
              <option value="ODS 13 - Accion por el Clima">ODS 13 - Accion por el Clima</option>
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Curso</h3>
            <select value={selectedCurso} onChange={handleCursoChange}>
              <option value="Taller de Propuesta de Investigacion">Taller de Propuesta de Investigacion</option>
              <option value="Seminario I">Seminario I</option>
              <option value="Seminario II">Seminario II</option>
            </select>
          </div>
          <div className={styles.boton}>
            <MyButtons label={"Filtrar"} onClick={handleClick} />
          </div>
        </aside>
      </div>
    </main>
  );
}

