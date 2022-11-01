import React, { useEffect } from "react";
import { useState } from "react";

// CSS
import styles from "./Edit.module.css";

// hooks
import { useContextAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useUpdate } from "../../hooks/useUpdate";

export const Edit = () => {
  const { id } = useParams();
  console.log(id)
  const { document: posts } = useDocument("posts", id);


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const [formError, setFormError] = useState("");
  const [formSucess, setFormSucess] = useState("");

  useEffect(() => {

    if (posts) {
      setTitle(posts.title)
      setImage(posts.image)
      setBody(posts.body)

      const txtTag = posts.tags.join(", ");
      setTags(txtTag)
    }

  }, [posts])

  const { user } = useContextAuth();
  const { email } = user;
  const { updateDocument , state } = useUpdate("posts")

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (title === "" || body === "" || tags === "") {
      return setFormError(" Informe um valor válido ");
    }

    try {
      new URL(image);
    } catch (e) {
      console.log(e);
      return setFormError(" Informe uma url válida ");
    }

    if (formError) return;

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const post = {
      title: title,
      image: image,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createBy: email,
    };

    setFormSucess(" Post alterado com sucesso ");

    setTimeout(() => {
      navigate("/dashboard");
    }, 2500);

    const response = await updateDocument(id, post);
    console.log(response);
  }

  return (
    <div className={styles.container}>
      {posts && (
        <>
          <h2 className={styles.title}> Editar Post: {posts.title} </h2>
          <h4 className={styles.subtitle}> Altere seu post como desejar ! </h4>

          {formError && <h3 className="error"> {formError} </h3>}
          {formSucess && <h3 className="sucess"> {formSucess} </h3>}

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
            <div className={styles.preview}>
                <h4> Imagem da url utilizada </h4>
                <img src={posts.image} alt={posts.title} />
              </div>
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
            {state.loading && (
              <button className={styles.btn} disabled type="submit">
                {" "}
                Alterar{" "}
              </button>
            )}
            {!state.loading && (
              <button className={styles.btn} type="submit">
                {" "}
                Alterar{" "}
              </button>
            )}
          </form>

        </>
      )}
    </div>
  );
};
