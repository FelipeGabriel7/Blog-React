import React from 'react'

// styles
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <>
    <footer className={styles.end}>
      <h3 className={styles.footer}> Escreva sobre o que você tem interesse </h3>
      <p className={styles.copy}> React Blog &copy; 2022 All rigths reserverd.</p>  
    </footer> 
    </>
  )
}
