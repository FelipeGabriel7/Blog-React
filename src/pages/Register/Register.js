import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Register.module.css";

export const Register = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");


  const navigate = useNavigate();
  const { createUser, error: authError, loading } = useAuth();


  async function handleIsSubmit(e) {
    e.preventDefault();

    if (password.length < 6 || password.length >= 16) {
      setError(" A senha precisa ter entre 6 e 16 caracteres ")
      return
    }

    if (password !== confirm) {
      setError(" As senhas precisam ser iguais ")
      return
    }


    const user = {
      text: text,
      email: email,
      password: password,
    }

    const res = await createUser(user);


    console.log(res)

    setSucess(" Usuário criado com sucesso ")
    setError("");
    setEmail("");
    setPassword("")
    setConfirm("")
    setText("")
  }

  function handleLogin() {
    navigate('/login')
  }


  return (
    <div className={styles.register}>

      {error !== "" && <h1 className="error"> {error} </h1>}
      {sucess !== "" && <h1 className="sucess"> {sucess} </h1>}

      <h2 className={styles.title}> Cadastre-se </h2>
      <h5 style={{ color: "#7b7b7b" }}>
        {" "}
        Venha com a gente utilizar um dos melhores blogs{" "}
      </h5>
      <form onSubmit={handleIsSubmit} className={styles.form}>
        <label>
          Nome
          <input
            className={styles.iptn}
            type="text"
            name="name"
            placeholder="informe seu nome"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            className={styles.iptn}
            type="email"
            name="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Senha
          <input
            className={styles.iptn}
            type="password"
            name="password"
            placeholder="*********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirme sua senha
          <input
            className={styles.iptn}
            type="password"
            name="new-password"
            placeholder="*********"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {!loading && (
          <div style={{display: 'flex' , gap: '1rem'}}>
            <input className={styles.create} type="submit" value="Criar Conta" />
            <button className={styles.create} onClick={handleLogin}> Login </button> 
          </div>
        )}
        {loading && <button disabled className={styles.create} type="submit"> Aguarde </button>}
      </form>
    </div>
  );
};
