"use client"; 
import MyTextInput from "../../../components/TextInputs/MyTextInputs";
import MyButtons from "../../../components/Buttons/MyButtons";
import MyTabs from "../../../components/Tabs/MyTabs";
import React, { useState, useEffect } from 'react';
import stylesDocente from "./profiledoc.module.css";
import stylesDocumento from "./doc.module.css";
import ProfileInsert from "../insertarRecurso/page";

export default function ProfilePage() {
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState("https://img.freepik.com/vector-premium/maestra-dibujos-animados-ilustracion-vectorial-palo-puntero_1023984-14073.jpg");
    const [insertedDataList, setInsertedDataList] = useState([]);
    const [showInsertPage, setShowInsertPage] = useState(false); 

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInsertData = (data) => {
        setInsertedDataList([...insertedDataList, data]); 
        setShowInsertPage(false);
    };

    const handleShowInsertPage = () => {
        setShowInsertPage(true);
    };

    return (
        <main>
            
            <h1 className={stylesDocente.title}>Mi perfil</h1>
            <div className={stylesDocente.boton}>
                <MyTabs label={"Información de la cuenta"} selectedTab={selectedTab} onChange={handleTabChange} />
            </div>
                {selectedTab === 0 && (
                    <div className={stylesDocente.total}>
                        <div className={stylesDocente.datos}> 
                            <div className={stylesDocente.contenedores}>
                                <div className={stylesDocente.textos}>
                                    <MyTextInput label={"Nombres"} placeholder={"Escribe tus nombres"} />
                                    <MyTextInput label={"Apellidos"} placeholder={"Escribe tus apellidos"} />
                                    <MyTextInput label={"Codigo"} placeholder={"Escribe tu codigo"} />
                                    <MyTextInput label={"Correo"} placeholder={"Escribe tu correo"} />
                                </div>
                                <div className={stylesDocente.botones}>
                                    <MyButtons label={"Modificar"} />
                                    <div className={stylesDocente.cambiarcontraseña}>
                                        
                                        <MyButtons label={"Cambiar contraseña"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={stylesDocente.cambiar}>
                        <img className={stylesDocente.imagen} src={selectedImage} />
                        <div className={stylesDocente.cambiarfoto}>
                            <label htmlFor="upload-image" className={stylesDocente.uploadButton}>Cambiar foto</label>
                            <input className={stylesDocente}id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                        </div>
                    </div>
                    </div>)}
                    {selectedTab === 1 && (
                <div className={stylesDocumento.total}>
                    <div className={stylesDocumento.datos}>
                        {insertedDataList.map((insertedData, index) => (
                            <div key={index} className={stylesDocumento.doc}>
                                <img className={stylesDocumento.imagen} src={insertedData.imageUrl} />
                                <div className={stylesDocumento.textoFechaWrapper}>
                                    <div className={stylesDocumento.texto}>
                                        <h2 className={stylesDocumento.titulo1}>{insertedData.title}</h2>
                                        <h3 className={stylesDocumento.autor1}>{insertedData.author}</h3>
                                        <p className={stylesDocumento.contenido}>{insertedData.summary}</p>
                                    </div>
                                    <div className={stylesDocumento.fecha}>
                                        <span>{insertedData.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedTab === 1 && (
                <div className={stylesDocumento.total}>
                    <div className={stylesDocumento.datos}>
                        <div className={stylesDocumento.boton}>
                            {!showInsertPage && <a className={stylesDocumento.insertar} onClick={handleShowInsertPage}>Insertar recurso</a>}
                            {showInsertPage && <ProfileInsert onInsert={handleInsertData} />}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}


