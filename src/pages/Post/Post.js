import React from "react";
import { useState } from "react";

// CSS
import styles from './Post.module.css'

// hooks
import { useInsert } from '../../hooks/UseInsert'
import { useContextAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'

export const Post = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  
  const [formError, setFormError] = useState("");
  const [formSucess , setFormSucess] = useState("")

  const { insertDocument , state } = useInsert("posts")
  const { user } = useContextAuth();
  const { email } = user
  console.log(user)
  console.log(email)

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault()
    setFormError("");

    if(title === "" || body === "" || tags === ""){
      return setFormError(" Informe um valor válido ")
    }

    try {
      new URL(image);
    } catch (e) {
      console.log(e)
     return setFormError(" Informe uma url válida ")
    }

    if(formError) return;

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const post = {
      title: title,
      image: image,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createBy: email
    }

    setFormSucess(" Post adicionado com sucesso ")

    setTimeout(() => {
      navigate('/')
   }, 2500)

    const response = await insertDocument(post)
    console.log(response)

  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Criar Post </h2>
      <h4 className={styles.subtitle}> Crie novas historias e compartilhe momentos ! </h4> 

      {formError && <h3 className="error"> {formError} </h3>}
      {formSucess && <h3 className="sucess"> {formSucess} </h3> }

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Titulo
          <input
            required
            type="text"
            name="title"
            value={title}
            placeholder="Nome do post"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Imagem
          <input
            required
            type="text"
            name="image"
            value={image}
            placeholder="https://www.example.com"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Tags
          <input
            required
            type="text"
            name="tags"
            placeholder="Tags separadas por virgula"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <label>
          Descrição
          <textarea
            required
            placeholder="descrição"
            name="desc"
            value={body}
            columns="50"
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        {state.loading && <button className={styles.btn} disabled type="submit"> Adicionar  </button>}
        {!state.loading && <button className={styles.btn} type="submit"> Adicionar  </button>}
      </form>
    </div>
  );
};
