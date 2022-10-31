import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { FcSearch } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Posts } from "../../components/Posts";

export const Home = () => {
  const [search, setSearch] = useState("");
  const { document: posts, loading, error , setError} = useFetchDocument("posts");

  console.log(posts)

  const navigate = useNavigate()
  const reference = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    if(search === "") return setError(" Informe um valor valido para continuar ")

    if(search){
      console.log(' Valor da search é ' + search)
      return navigate(`/search?query=${search}`)
    }

    setSearch("");
    reference.current.focus();
  }

  return (
    <div className={styles.home}>
      {error && <h1 className="error" style={{color: '#fff'}}> {error} </h1>}
      <h1 className={styles.title}> Confira Alguns posts </h1>
      <h2 className={styles.subtitle}> Aproveite e conheça sobre o blog </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.search}
          type="search"
          ref={reference}
          placeholder="Busque por um post"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.btn} type="submit">
          {" "}
          <FcSearch />{" "}
        </button>
      </form>

      <div className={styles.posts}>
        <h2 style={{ textAlign: "center", marginTop: "3em" }}>
          {" "}
          Confira alguns posts{" "}
        </h2>
        {loading && <p> Carregando ... </p>}

        {posts &&
          posts.map((post , id) => (
            <div key={post.id}>
              <Posts post={post} id={id}/>
            </div>
          ))}
        {posts && posts.length === 0 && (
          <>
            <h5 className={styles.text}> Não existe posts </h5>
            <Link to="/post" className={styles.postNew}>
              {" "}
              Criar novo Post{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
