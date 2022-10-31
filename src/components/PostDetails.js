import React from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'

import { Link } from 'react-router-dom'

// styles
import styles from './PostDetails.module.css'

export const PostDetails = () => {

  const { id } = useParams()
  console.log(id)
  const { document: posts , loading , error } = useDocument("posts" , id)


  return (
    <div className={styles.postOne}>
      {!posts && <h1 className="error"> Algo deu errado ... </h1>}
      {posts && (
        <div className={styles.post}>
           <h1> {posts.title} </h1>
           <img src={posts.image} alt={posts.title} />
           <p> {posts.body} </p>
           <p> Criado por: <span className={styles.email}>{posts.createBy}</span> </p>
           <div className={styles.tags}>
              {posts && posts.tags.map(post => (
                <>
                  <p key={post.id}> # {post}</p>
                </>
              ))}
               <Link to="/" className={styles.return}> Retornar </Link>
           </div>
        </div>
      )}
        
    </div>
  )
}
