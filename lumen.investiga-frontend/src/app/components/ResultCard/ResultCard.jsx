import * as React from "react";
import Image from 'next/image';
import styles from "./ResultCard.module.css"
import MyRating from "../Rating/MyRating";

export default function ResultCard({ title, subtitle, description, id, onClick, readOnly, withRating = true, rating}) {
    return (
      <div className={styles.trabajo}>
        <div className={styles.card} id={id} onClick={onClick}>
          <Image
            src="/document-icon.svg"
            alt="document icon"
            width={50}
            height={50}
            className={styles.icon}
          />
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
            { withRating == true ? <MyRating readOnly={readOnly} rating={rating}/> : null}
          </div>
        </div>
      </div>
    );
}
