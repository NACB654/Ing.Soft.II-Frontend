import MyButtons from "../components/Buttons/MyButtons";
import MyTextInput from "../components/TextInputs/MyTextInputs";
import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h1 className={styles.title}>Crea tu cuenta</h1>
        <div className={styles.campos}>
            <div className={styles.textos}>
                <MyTextInput label={"Nombres"} placeholder={"Escribe tus nombres"} />
                <MyTextInput label={"Apellidos"} placeholder={"Escribe tus apellidos"} />
                <MyTextInput label={"Codigo"} placeholder={"Escribe tu codigo"} />
            </div>

            <div className={styles.textos}>
                <MyTextInput label={"Correo"} placeholder={"Ingresa tu correo"} />
                <MyTextInput label={"Contraseña"} placeholder={"Ingresa tu contraseña"} />
                <MyTextInput label={"Confirmar Contraseña"} placeholder={"Confirma tu contraseña"} />
            </div>
        </div>

        <div className={styles.boton}>
            <MyButtons label={"Crear Cuenta"}/>
        </div>

      </div>

        <div className={styles.images}>
            <div className={styles.imagen1}>
                <img src="./image 13.png" width="200" height="200"/>
            </div>
            <div className={styles.imagen2}>
                <img src="./image 14.png" width="200" height="200"/>
            </div>
        </div>
    </main>
  );
}