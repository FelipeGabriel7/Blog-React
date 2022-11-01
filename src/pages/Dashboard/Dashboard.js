import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContextAuth } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Dashboard.module.css'

// icons 
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { useDelete } from '../../hooks/useDelete';

export const Dashboard = () => {

  const { user } = useContextAuth();
  const userId = user.uid;
  const { document: post, loading} = useFetchDocument("posts", null, userId)
  const {deleteDocument } = useDelete("posts");


  return (
    <div className={styles.container}>
      {loading && <h1> Carregando ... </h1>}
      <div className={styles.header}>
        <h2> Dashboard </h2>
        <p> Gerencie os seus posts </p>
      </div>
      {post && post.length === 0 && (
        <div className={styles.dashboard}>
          <h1 className={styles.text}> Você ainda não possui posts </h1>
          <NavLink to="/post" className="button"> Criar novo Post  </NavLink>
        </div>
      )}
      <div className={styles.dashboard}>
        {post && post.map(po => (

          <>
          

            <div className={styles.dashboardPost} key={po.id}>
              <p > {po.title}</p>
              <span className={styles.alteration}>  <BsTrashFill onClick={() => deleteDocument(po.id)} style={{color: '#f44e'}}/> | <Link to={`/post/edit/${po.id}`}> <AiFillEdit/> </Link> |  <Link className='button' to={`/post/${po.id}`}> Ver post </Link> </span> 
            </div>
          </>

        ))}
      </div>
    </div>
  )
}
