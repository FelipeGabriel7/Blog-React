import React from "react";
import { UseQuery } from "../../hooks/UseQuery";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";

// components
import { Posts } from "../../components/Posts";

export const Search = () => {
  const search = UseQuery();
  const searchValue = search.get("query");

  const { document: post } = useFetchDocument("posts", searchValue);

  return (
    <div style={{ padding: "5rem", margin: "0 auto" }}>
      {post && post.length === 0 && (
        <>
          <h1 style={{ padding: "2rem" }}> Não existe post com essas tags </h1>
          <Link
            to="/"
            style={{
              background: "#000",
              color: "#fff",
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            {" "}
            Retornar{" "}
          </Link>
        </>
      )}
      {post &&
        post.map((po, id) => (
          <>
            <Posts post={po} id={id} key={id} />
            <Link
              to="/"
              style={{
                background: "#000",
                color: "#fff",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              {" "}
              Retornar{" "}
            </Link>
          </>
        ))}
    </div>
  );
};
