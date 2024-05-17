import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <h1 className={styles.title}>LUMENINVESTIGA</h1>
      <form className={styles.form}>
        <label htmlFor="email">Correo</label>
        <input type="email" id="email" className={styles.input} placeholder="Ingrese su correo" required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" className={styles.input} placeholder="Ingrese su contraseña" required />

        <button type="submit" className={styles.button}>Ingresar</button>
        <button type="button" className={styles.buttonSecondary}>Crear Cuenta</button>
      </form>    
    </main>
  );
}
