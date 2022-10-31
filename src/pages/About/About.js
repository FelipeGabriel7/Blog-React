import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'


const linkStyle = {
  background: '#000',
  color: '#fff',
  padding: '0.5rem',
  borderRadius: '0.5rem'
}

export const About = () => {
  return (
    <div>
      <aside className={styles.about}>
        <h1 className={styles.title}> Sobre o <span> React Blog </span></h1>
        <p className={styles.text}> Este projeto consiste em um blog ,
          utilizando React no Front-End e Firebase
          no Back-end.
        </p>
        <Link style={{...linkStyle}} to="/post"> Criar Post </Link>
        <h2 className={styles.subtitle}> Conhecimentos utilizados </h2>
        <ul className={styles.list}>
            <li>  Routes </li>
            <li>  Hooks </li>
            <li>  Context API </li>
            <li>  CSS Modules </li>
            <li>  Custom Hooks </li>
            <li>  Firebase </li>
          </ul>
          <div className={styles.direct}>
             <p> Desenvolvido por FelipeGabriel7 &copy; All rights reserverd. </p>
          </div>
      </aside>
    </div>
  )
}
