import React from 'react'

// styles
import styles from './Navbar.module.css'

// Route to
import { NavLink } from 'react-router-dom'

// logo
import imageLogo from '../images/logo192.png'

// context
import { useContextAuth } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {

  const { user }  = useContextAuth();
  const { logout } = useAuth();


  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}> <img className={styles.logo} src={imageLogo} alt="logo do blog sendo um simbolo de um atomo" /> Blog React</h1>
      <aside className={styles.items}>
        {user && (
             <>
              <NavLink className={styles.item} to="/"> Home </NavLink>
              <NavLink className={styles.item} to="/post"> Post </NavLink>
             <NavLink className={styles.item} to="/dashboard"> Dashboard </NavLink>
             <NavLink className={styles.item} to="/About"> Sobre </NavLink>
           </>
        )}

        {!user && (
          <>
            <NavLink className={styles.item} to="/"> Home </NavLink>
            <NavLink className={styles.item} to="/login"> Login </NavLink>
            <NavLink className={styles.item} to="/register"> Criar Conta </NavLink>
            <NavLink className={styles.item} to="/About"> Sobre </NavLink>
          </>
        )}

        {user && (
          <button onClick={logout} className={styles.btn} > Sair </button>
        )}
      </aside>
    </div>
  )
}
