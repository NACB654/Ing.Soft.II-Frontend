"use client"

import { useEffect, useState, useContext, createContext } from "react";
import styles from "./layout.module.css"
import Image from 'next/image';
import usuarioAPI from "../api/usuarioApi";
import { useRouter } from "next/navigation";

const UserContext = createContext(null);

export default function HeaderLayout({ children }) {
  const router = useRouter();

  const [userData, setUserData] = useState(null);

  const handleLoad = async () => {
    const userId = localStorage.getItem("id")
    console.log(userId)
    
    const user = await usuarioAPI.getUser(userId)
    console.log(user?.data)

    setUserData(user?.data)
  }

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <UserContext.Provider value={userData}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Image src="/logo.svg" alt="logo" width={91} height={91} />
          <p className={styles.textTitle}>Lumen Investiga</p>
        </div>
        <div className={styles.profile}>
          <p className={styles.textProfile}>{userData?.name +  " " + userData?.last_name}</p>
          <button className={styles.buttonProfile} onClick={() => router.push("/home/profile")}>
            <Image src={userData?.foto_url == null ? "/user.png" : userData?.foto_url} alt="avatar" width={70} height={70} />
          </button>
        </div>
      </header>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}