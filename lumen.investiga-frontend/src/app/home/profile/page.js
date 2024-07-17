"use client";

import MyTextInput from "../../components/TextInputs/MyTextInputs";
import MyButtons from "../../components/Buttons/MyButtons";
import MyTabs from "../../components/Tabs/MyTabs";
import React, { useState, useEffect } from "react";
import styles from "./profiledoc.module.css";
import { useUserContext } from "../layout";
import MyTextArea from "@/app/components/TextArea/MyTextArea";
import MyAutoCompleteList from "@/app/components/Autocomplete/MyAutoCompleteList";
import areasAPI from "@/app/api/areaApi";
import cursoAPI from "@/app/api/cursoApi";
import periodoAPI from "@/app/api/periodoApi";
import odsAPI from "@/app/api/odsApi";
import profesorAPI from "@/app/api/profesorApi";
import ResultCard from "@/app/components/ResultCard/ResultCard";
import trabajosAPI from "@/app/api/trabajosApi";
import { useRouter } from "next/navigation";
import usuarioAPI from "@/app/api/usuarioApi";
import Image from 'next/image';

export default function ProfilePage() {
  const user = useUserContext();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(user?.foto_url);
  const [showInsertPage, setShowInsertPage] = useState(false);
  const [values, setValues] = useState({
    name: user?.name,
    last_name: user?.last_name,
    codigo: user?.codigo,
    email: user?.email,
  });
  const [formValues, setFormValues] = useState({});
  const [areas, setAreas] = useState([{ id: 0, label: "" }]);
  const [subareas, setSubareas] = useState([{ id: 0, label: "" }]);
  const [cursos, setCursos] = useState([{ id: 0, label: "" }]);
  const [periodos, setPeriodos] = useState([{ id: 0, label: "" }]);
  const [ods, setOds] = useState({ id: 0, label: "" });
  const [subidos, setSubidos] = useState([{}]);
  const [guardados, setGuardados] = useState([{}]);
  const [area, setArea] = useState([""]);
  const [subarea, setSubArea] = useState([""]);
  const [curso, setCurso] = useState([""]);
  const [periodo, setPeriodo] = useState([""]);
  const [odsId, setOdsId] = useState([""]);
  const [pdf, setPdf] = useState({name: "", url: ""});

  const handleLoadAreas = async () => {
    const result = await areasAPI.getAreasYSubareas();

    if (result.data) {
      // console.log(result.data)
      const areas = result.data
        .map((item) => ({ id: item.area.id, label: item.area.descripcion }))
        .filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => t.id === value.id && t.label === value.label)
        );
      const subareas = result.data.map((item) => ({
        id: item.id,
        label: item.descripcion,
        area: item.area.descripcion,
      }));
      setAreas(areas);
      setSubareas(subareas);
    }
  };

  const handleLoadCursos = async () => {
    const result = await cursoAPI.getCursos();

    if (result.data) {
      // console.log(result.data)
      const cursos = result.data.map((item) => ({
        id: item.id,
        label: item.descripcion,
      }));
      setCursos(cursos);
    }
  };

  const handleLoadPeriodos = async () => {
    const result = await periodoAPI.getPeriodos();

    if (result.data) {
      // console.log(result.data)
      const periodos = result.data.map((item) => ({
        id: item.id,
        label: item.descripcion,
      }));
      setPeriodos(periodos);
    }
  };

  const handleLoadODS = async () => {
    const result = await odsAPI.getODS();

    if (result.data) {
      // console.log(result.data)
      const ods = result.data.map((item) => ({
        id: item.id,
        label: item.descripcion,
      }));
      setOds(ods);
    }
  };

  const handleLoadSubidos = async () => {
    const result = await trabajosAPI.getTrabajos(user?.name);

    if (result.data) {
      console.log(result.data);
      setSubidos(result.data);
    }
    setIsLoading(!isLoading)
  };

  const handleLoadGuardados = async () => {
    const result = await trabajosAPI.getTrabajosGuardados(user?.id);

    if (result.data) {
      console.log(result.data);
      setGuardados(result.data);
    }
    setIsLoading(!isLoading)
  };

  useEffect(() => {
    if (user?.isTeacher) {
      handleLoadAreas();
      handleLoadCursos();
      handleLoadPeriodos();
      handleLoadODS();
      handleLoadSubidos();
    }
    else {
      handleLoadGuardados();
    }
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file)
      formData.append("id", user?.id)

      const result = await usuarioAPI.subirFoto(formData)

      if (result.data) {
        alert("Imagen guardada");
      }
    }
  };

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("hola")
      const formData = new FormData();
      formData.append("file", file)

      const result = await profesorAPI.subirPdf(formData)

      if (result.data) {
        console.log(result.data)
        const data = {
          name: file.name,
          url: result.data.url
        }
        setPdf(data);
      }
    }
    else {
      alert("Error al subir archivo. Intentelo de nuevo")
    }
  };

  const handleSubirArchivo = async () => {
    if (
      formValues.titulo == "" ||
      formValues.abstract == "" ||
      formValues.keywords == ""
    ) {
      alert("Faltan datos por completar");
    } else {
      formValues.subareaId = subarea.id;
      formValues.cursoId = curso.id;
      formValues.periodoId = periodo.id;
      formValues.ods = odsId.map((item) => item.id);
      formValues.profesor = user?.name;
      formValues.puntaje = 0;
      formValues.archivo_url = pdf.url
      console.log(formValues);

      const result = await profesorAPI.subirTrabajo(formValues);
      console.log(result);

      if (result.data) {
        console.log(result.data);
        alert("Trabajo creado");
        location.reload();
      }
      // setShowInsertPage(false);
    }
  };

  const handleShowInsertPage = () => {
    setShowInsertPage(true);
  };

  const handleModificar = async () => {
    if (values.name == "" || values.last_name == "" || values.email == "" || values.codigo == "") {
      alert("Complete todos los datos")
    }
    else {
      const data = values;
      data.id = user.id
      const result = await usuarioAPI.modificarDatos(data);

      if (result.data) {
        alert("Los datos han sido actualizados")
        location.reload();
      }
    }
    
  }

  return (
    <main className={styles.main}>
      <div className={styles.tabs}>
        <h1 className={styles.title}>Mi perfil</h1>
        <MyTabs
          label={user?.isTeacher ? "Trabajos Subidos" : "Trabajos Guardados"}
          selectedTab={selectedTab}
          onChange={handleTabChange}
        />
      </div>
      {selectedTab === 0 && !isLoading && (
        <div className={styles.total}>
          <div className={styles.datos}>
            <div className={styles.contenedores}>
              <div className={styles.textos}>
                <MyTextInput
                  label={"Nombres"}
                  name={"name"}
                  placeholder={"Escribe tus nombres"}
                  value={values.name}
                  onChange={handleChange}
                />
                <MyTextInput
                  label={"Apellidos"}
                  name={"last_name"}
                  placeholder={"Escribe tus apellidos"}
                  value={values.last_name}
                  onChange={handleChange}
                />
                <MyTextInput
                  label={"Codigo"}
                  name={"codigo"}
                  placeholder={"Escribe tu codigo"}
                  value={values.codigo}
                  onChange={handleChange}
                />
                <MyTextInput
                  label={"Correo"}
                  name={"email"}
                  placeholder={"Escribe tu correo"}
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.botones}>
                <MyButtons
                  label={"Modificar"}
                  width={"180px"}
                  onClick={handleModificar}
                />
                <MyButtons
                  label={"Cambiar contraseña"}
                  variant="outlined"
                  width={"180px"}
                  onClick={() => router.push("/home/password")}
                />
              </div>
            </div>
          </div>
          <div className={styles.cambiar}>
            <Image
              src={
                selectedImage == "" || selectedImage == null
                  ? "/user.png"
                  : selectedImage
              }
              alt="foto_perfil"
              width={200}
              height={200}
            />
            <MyButtons
              label={"Cambiar foto"}
              onClick={() => document.getElementById("upload-image").click()}
            />
            <input
              className={styles}
              id="upload-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}
      {selectedTab === 1 && user.isTeacher == false && (
        <div className={styles.trabajosGuardados}>
          <div className={styles.results}>
            {guardados?.map((item, key) => {
              return (
                <ResultCard
                  title={item.titulo}
                  subtitle={item.alumno?.name + " " + item.alumno?.last_name}
                  description={item.abstract}
                  key={key}
                  withRating={false}
                  onClick={() => router.push(`/home/detalle?id=${item.id}`)}
                />
              );
            })}
          </div>
        </div>
      )}
      {selectedTab === 1 && user.isTeacher == true && (
        <div className={styles.boton}>
          {!showInsertPage && (
            <div className={styles.trabajosSubidos}>
              <MyButtons
                label={"Subir archivo"}
                width={"200px"}
                onClick={handleShowInsertPage}
              />
              <div className={styles.results}>
                {subidos?.map((item, key) => {
                  return (
                    <ResultCard
                      title={item.titulo}
                      subtitle={
                        item.alumno?.name + " " + item.alumno?.last_name
                      }
                      description={item.abstract}
                      key={key}
                      withRating={false}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {showInsertPage && (
            <div className={styles.formulario}>
              <MyTextInput
                label={"Titulo"}
                name={"titulo"}
                placeholder={"Escriba el nombre del artículo"}
                width={"600px"}
                onChange={handleFormChange}
              />
              <MyTextArea
                label={"Abstract"}
                placeholder={"Ingrese el abstract"}
                name={"abstract"}
                onChange={handleFormChange}
              />
              <MyTextInput
                label={"Keywords"}
                name={"keywords"}
                placeholder={"Escriba los keywords seguidos por comas"}
                width={"600px"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value.split(", "),
                  })
                }
              />
              <MyAutoCompleteList
                label={"Area"}
                placeholder={"Seleccione el area..."}
                options={areas}
                onChange={(e, area) => setArea(area)}
              />
              <MyAutoCompleteList
                label={"Subarea"}
                placeholder={"Seleccione la subarea..."}
                options={subareas.filter((item) => item.area == area?.label)}
                onChange={(e, subarea) => setSubArea(subarea)}
              />
              <MyAutoCompleteList
                label={"Periodo"}
                placeholder={"Seleccione el periodo..."}
                options={periodos}
                onChange={(e, periodo) => setPeriodo(periodo)}
              />
              <MyAutoCompleteList
                label={"ODS"}
                placeholder={"Seleccione las ODS..."}
                options={ods}
                multiple={true}
                onChange={(e, ods) => setOdsId(ods)}
              />
              <div className={styles.autores}>
                <MyTextInput
                  label={"Nombre - Alumno"}
                  placeholder={"Ingrese el nombre del alumno"}
                  name={"name"}
                  width={"280px"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      alumno: {
                        ...formValues.alumno,
                        [e.target.name]: e.target.value,
                      },
                    })
                  }
                />
                <MyTextInput
                  label={"Apellido - Alumno"}
                  placeholder={"Ingrese el codigo del alumno"}
                  name={"last_name"}
                  width={"280px"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      alumno: {
                        ...formValues.alumno,
                        [e.target.name]: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className={styles.autores}>
                <MyTextInput
                  label={"Nombre - Asesor"}
                  placeholder={"Ingrese el nombre del asesor"}
                  name={"name"}
                  width={"280px"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      asesor: {
                        ...formValues.asesor,
                        [e.target.name]: e.target.value,
                      },
                    })
                  }
                />
                <MyTextInput
                  label={"Apellido - Asesor"}
                  placeholder={"Ingrese el codigo del asesor"}
                  name={"last_name"}
                  width={"280px"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      asesor: {
                        ...formValues.asesor,
                        [e.target.name]: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <MyAutoCompleteList
                label={"Curso"}
                placeholder={"Seleccione el curso..."}
                options={cursos}
                onChange={(e, curso) => setCurso(curso)}
              />
              <div className={styles.pdf}>
                <p className={styles.pdfName}>{ pdf.name }</p>
                <MyButtons
                  label={"Buscar archivo"}
                  onClick={() => document.getElementById("upload-pdf").click()}
                />
                <input
                  className={styles}
                  id="upload-pdf"
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={handlePdfChange}
                />
              </div>
              <MyButtons label={"Subir archivo"} onClick={handleSubirArchivo} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
