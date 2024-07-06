"use client";

import MyTextInput from "../../components/TextInputs/MyTextInputs";
import MyButtons from "../../components/Buttons/MyButtons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./password.module.css";
import { useUserContext } from "../layout";
import usuarioAPI from "@/app/api/usuarioApi";

export default function PasswordPage() {
  const router = useRouter();
  const user = useUserContext();

  const [password2, setPassword] = useState("");
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    console.log(values.password);
    console.log(password2);
      
    if (values.password == password2) {
      const result = await usuarioAPI.cambiarPassword({
        id: user?.id,
        password: values.password,
      });

      if (result.data) {
        console.log(result.data);
        alert("Contraseña cambiada");
        router.push("/home/profile");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h1 className={styles.title}>Cambiar tu contraseña</h1>
        <div className={styles.campos}>
          <div className={styles.textos}>
            <MyTextInput
              label={"Contraseña"}
              name={"password"}
              type={"password"}
              onChange={handleChange}
              placeholder={"Escribe tu nueva contraseña"}
            />
            <MyTextInput
              label={"Confirmar Contraseña"}
              name={"confirmPassword"}
              type={"password"}
              onChange={handlePassword}
              placeholder={"Confirma tu nueva contraseña"}
            />
          </div>
        </div>
        <div className={styles.boton}>
          <MyButtons
            label={"Cambiar contraseña"}
            width={"200px"}
            onClick={handleClick}
          />
        </div>
      </div>
    </main>
  );
}
