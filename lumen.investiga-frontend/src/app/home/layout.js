import styles from "./layout.module.css"
import Image from 'next/image';

export default function HeaderLayout({children}) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.title}>
                    <Image 
                        src="/logo.svg"
                        alt="logo"
                        width={91}
                        height={91}
                    />
                    <p className={styles.textTitle}>Lumen Investiga</p>
                </div>
                <div className={styles.profile}>
                    <p className={styles.textProfile}>Perfil</p>
                    <Image 
                        src="/next.svg"
                        alt="avatar"
                        width={91}
                        height={91}
                    />
                </div>
            </header>
            {children}
        </>
    )
}