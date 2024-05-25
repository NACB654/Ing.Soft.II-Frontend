import MyTextInput from "@/app/components/TextInputs/MyTextInputs"
import MyButtons from "@/app/components/Buttons/MyButtons"
import styles from "./search.module.css"

export default function SearchPage() {
    return (
        <main className={styles.main}>
            <div className={styles.buscador}>
                <MyTextInput label={"Buscar"} placeholder={"Ingresa una o más palabras clave"} width={"690px"} />

                <div className={styles.boton}>
                    <MyButtons label={"Buscar"} />
                </div>
            </div>

            <div className={styles.resultados}>
                <div className={styles.tituloResultados}>Lo más trabajado</div>
                <div className={styles.listaResultados}>
                    <div className={styles.categoria}>
                        <div className={styles.categoriaTitulo}>Área</div>
                        <div className={styles.categoriaItem}>Software <span className={styles.cantidad}>55</span></div>
                        <div className={styles.categoriaItem}>IoT <span className={styles.cantidad}>32</span></div>
                        <div className={styles.categoriaItem}>Cloud Computing <span className={styles.cantidad}>27</span></div>
                    </div>
                    <div className={styles.categoria}>
                        <div className={styles.categoriaTitulo}>Curso</div>
                        <div className={styles.categoriaItem}>Seminario I <span className={styles.cantidad}>127</span></div>
                        <div className={styles.categoriaItem}>TPI <span className={styles.cantidad}>96</span></div>
                        <div className={styles.categoriaItem}>Seminario II <span className={styles.cantidad}>45</span></div>
                    </div>
                </div>
            </div>
        </main>
    )
}
