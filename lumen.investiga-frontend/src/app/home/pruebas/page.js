import MyButtons from "@/app/components/Buttons/MyButtons";
import MyTabs from "@/app/components/Tabs/MyTabs";
import MyTextInput from "@/app/components/TextInputs/MyTextInputs";
import styles from "./pruebas.module.css"

export default function PruebasPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <MyTextInput
          label={"Usuario"}
          placeholder={"Ingresa tu usuario"}
          width="200px"
        />
        <br />
        <MyButtons label={"Ingresar"} width="200px" />
        <br />
        <MyTabs />
      </div>
    </main>
  );
}