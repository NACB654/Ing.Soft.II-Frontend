"use client"

import MyButtons from "../components/Buttons/MyButtons";
import MyTextInput from "../components/TextInputs/MyTextInputs";
import Switch from '@mui/joy/Switch';
import styles from "./register.module.css";
import { useState } from "react";
import usuarioAPI from "../api/usuarioApi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()

  const [checked, setChecked] = useState(false);
  const [pass2, setPass2] = useState('');
  const [values, setValues] = useState({
    name: "",
    last_name: "",
    email: "",
    codigo: "",
    password: "",
    foto_url: "",
    isTeacher: false,
  });

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    setValues({...values, ["isTeacher"]: e.target.checked})
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handlePassword = (e) => {
    setPass2(e.target.value)
  }

  const handleClick = async () => {
    if (values.password == pass2) {
      const result = await usuarioAPI.registrarUsaurio(values)

      if (result.data) {
        console.log(result.data)
        alert("Usuario creado")
        router.push("/")
      }
    }
    else {
      alert("La confirma bien tu contraseña")
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h1 className={styles.title}>Crea tu cuenta</h1>
        <div className={styles.campos}>
          <div className={styles.textos}>
            <MyTextInput
              label={"Nombres"}
              name={"name"}
              onChange={handleChange}
              placeholder={"Escribe tus nombres"}
            />
            <MyTextInput
              label={"Apellidos"}
              name={"last_name"}
              onChange={handleChange}
              placeholder={"Escribe tus apellidos"}
            />
            <MyTextInput
              label={"Codigo"}
              name={"codigo"}
              type={"number"}
              onChange={handleChange}
              placeholder={"Escribe tu codigo"}
            />
          </div>
          <div className={styles.textos}>
            <MyTextInput
              label={"Correo"}
              name={"email"}
              onChange={handleChange}
              placeholder={"Ingresa tu correo"}
            />
            <MyTextInput
              label={"Contraseña"}
              name={"password"}
              onChange={handleChange}
              type={"password"}
              placeholder={"Ingresa tu contraseña"}
            />
            <MyTextInput
              label={"Confirmar Contraseña"}
              placeholder={"Confirma tu contraseña"}
              onChange={handlePassword}
              type={"password"}
            />
          </div>
        </div>
        <div className={styles.boton}>
          <div className={styles.switch}>
            <p className={styles.p}>¿Eres profesor?</p>
            <Switch
              checked={checked}
              onChange={handleCheck}
              sx={{ "& .MuiSwitch-track.Mui-checked": { backgroundColor: "#F37021" } }}
            />
          </div>
          <MyButtons label={"Crear Cuenta"} onClick={handleClick} />
        </div>
      </div>

        <div className={styles.images}>
            <div className={styles.imagen1}>
                <img src="./image 13.png" width="300" height="300"/>
            </div>
            <div className={styles.imagen2}>
                <img src="./image 14.png" width="300" height="300"/>
            </div>
        </div>

    </main>
  );
}
