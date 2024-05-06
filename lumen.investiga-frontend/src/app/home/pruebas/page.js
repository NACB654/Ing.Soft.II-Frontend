import MyButtons from "@/app/components/Buttons/MyButtons";
import MyTabs from "@/app/components/Tabs/MyTabs";
import MyTextInput from "@/app/components/TextInputs/MyTextInputs";

export default function PruebasPage() {
  return (
    <>
      <MyTextInput
        label={"Usuario"}
        placeholder={"Ingresa tu usuario"}
        width="200px"
      />
      <br />
      <MyButtons label={"Ingresar"} width="200px" />
      <br />
      <MyTabs />
    </>
  );
}