import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Posts.module.css'

export const Posts = ( {post, id}) => {
  return (

    <div className={styles.post}>
      <div className={styles.info
      }>
      <h3 className={styles.title}> {post.title} # {id} </h3>
      <Link to={`/post/${post.id}`} className={styles.details}> Detalhes </Link>
      </div>
      <div className={styles.card}>
        <img className={styles.image} src={post.image}  alt={post.title}/>
        <p className={styles.text}> {post.body} </p>
        <p className={styles.created}> Criado por:  {post.createBy} </p>
        </div>
        <div className={styles.tag}>
          {post.tags && post.tags.map((tag , id) => (
            <p key={id}> # {tag} </p>
          ))}
        </div>
    </div>
  )
}
