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
  const [resultados, setResultados] = useState([{}]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedsubArea, setSelectedsubArea] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedODS, setSelectedODS] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");
  const [areas, setAreas] = useState([]);
  const [subAreas, setsubAreas] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [ods, setOds] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleLoad = async () => {
    const query = searchParams.get("keyword");
    setValue(query)
    const result = await trabajosAPI.mostrarResultados({ keyword: query });

    if (result?.data) {
      console.log(result?.data);
      setResultados(result?.data);

      let subarea = result?.data.map((item) => ({
        id: item.subArea.id,
        descripcion: item.subArea.descripcion,
        area: item.subArea.area.id,
      }));
      subarea = subarea.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.label === value.label)
      );
      console.log(subarea);
      setsubAreas(subarea);

      let periodo = result?.data.map((item) => ({
        id: item.periodo.id,
        descripcion: item.periodo.descripcion,
      }));
      periodo = periodo.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.label === value.label)
      );
      setPeriodos(periodo);

      let area = result?.data.map((item) => ({
        id: item.subArea.area.id,
        descripcion: item.subArea.area.descripcion,
      }));
      area = area.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.label === value.label)
      );
      setAreas(area);

      let curso = result?.data.map((item) => ({
        id: item.curso.id,
        descripcion: item.curso.descripcion,
      }));
      curso = curso.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.id === value.id && t.label === value.label)
      );
      setCursos(curso);

      let ods = result?.data.map((item) => item.ods.map((item2) => item2));
      ods = ods.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t[0].id === value[0].id && t[0].label === value[0].label
          )
      );
      setOds(ods);
    }
  };

  const sortResults = (results, order) => {
    return results.sort((a, b) => {
      if (order === "asc") {
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
      setResultados((prevResultados) =>
        sortResults([...prevResultados], sortOrder)
      );
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

  const handleFiltrar = async () => {
    const data = {
      keyword: value,
      areaId: selectedArea,
      subareaId: selectedsubArea,
      periodoId: selectedPeriod,
      ods: selectedODS,
      cursoId: selectedCurso
    }
    
    const result = await trabajosAPI.filtrarResultados(data)

    if (result.data) {
      console.log(result.data)
      setResultados(result.data)
    }
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

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.dropdown}
          >
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
              <option disabled selected value="">
                {" "}
                -- selecciona una área --{" "}
              </option>
              {areas.map((item, key) => {
                return (
                  <option value={item.id} key={key}>
                    {item.descripcion}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Subárea</h3>
            <select value={selectedsubArea} onChange={handlesubAreaChange}>
              <option disabled selected value="">
                {" "}
                -- selecciona una subárea --{" "}
              </option>
              {subAreas
                .filter((item) => item.area == selectedArea)
                .map((item, key) => {
                  return (
                    <option value={item.id} key={key}>
                      {item.descripcion}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Periodo</h3>
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option disabled selected value="">
                {" "}
                -- selecciona el periodo --{" "}
              </option>
              {periodos.map((item, key) => {
                return (
                  <option value={item.id} key={key}>
                    {item.descripcion}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>ODS</h3>
            <select value={selectedODS} onChange={handleODSChange}>
              <option disabled selected value="">
                {" "}
                -- selecciona la ODS --{" "}
              </option>
              {ods.map((item, key) => {
                return (
                  <option value={item[0].id} key={key}>
                    {item[0].descripcion}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.filterSection}>
            <h3>Curso</h3>
            <select value={selectedCurso} onChange={handleCursoChange}>
              <option disabled selected value="">
                {" "}
                -- selecciona el curso --{" "}
              </option>
              {cursos.map((item, key) => {
                return (
                  <option value={item.id} key={key}>
                    {item.descripcion}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.boton}>
            <MyButtons label={"Filtrar"} onClick={handleFiltrar} />
          </div>
        </aside>
      </div>
    </main>
  );
}
