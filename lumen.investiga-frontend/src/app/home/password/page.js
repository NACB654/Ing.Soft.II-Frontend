"use client";

import MyTextInput from "../../components/TextInputs/MyTextInputs";
import MyButtons from "../../components/Buttons/MyButtons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./password.module.css";



export default function PasswordPage() {
    const router = useRouter()
    const [password2, setPassword] = useState('');
    const [values, setValues] = useState({
        password: "",
        email:""
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    
      const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleClick = async () => {
        if (values.password == password2) {
          const result = await usuarioAPI.registrarUsaurio(values)
    
          if (result.data) {
            console.log(result.data)
            alert("Contraseña cambiada")
            router.push("/")
          }
        }else {
          alert("Las contraseñas no coinciden")
        }
    }
    return(
        <main className={styles.main}>
            <div className={styles.form}>
            <h1 className={styles.title}>Cambiar tu contraseña</h1>
            <div className={styles.campos}>
                <div className={styles.textos}>
                    <MyTextInput
                        label={"Contaseña"}
                        password={"password"}
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
                    <MyButtons label={"Cambiar contraseña"} onClick={handleClick} />
                </div>
            </div>
        </main>
    );
}
