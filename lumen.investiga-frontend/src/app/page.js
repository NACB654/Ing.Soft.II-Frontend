"use client"

import { useState } from "react";
import MyButtons from "./components/Buttons/MyButtons";
import MyTextInput from "./components/TextInputs/MyTextInputs";
import styles from "./page.module.css";
import usuarioAPI from "./api/usuarioApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    console.log(values);
    const result = await usuarioAPI.iniciarSesion(values)

    if (result) {
      console.log(result.data)
      alert("Logeado")
    }
    else {
      alert("El correo o la contraseña ingresada no son correctos")
    }
  };

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <main className={styles.main}>
      <img src={"logo.png"} className={styles.logo} />
      <h1 className={styles.title}>LUMENINVESTIGA</h1>
      <div className={styles.form}>
        <MyTextInput
          label={"Correo"}
          placeholder={"Ingrese su correo"}
          name={"email"}
          onChange={handleChange}
        />
        <MyTextInput
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          name={"password"}
          type={"password"}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttons}>
        <MyButtons label={"Ingresar"} width={"180px"} onClick={handleClick} />
        <MyButtons
          label={"Crear cuenta"}
          variant={"outlined"}
          width={"180px"}
          onClick={handleRegister}
        />
      </div>
    </main>
  );
}
