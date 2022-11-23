import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error , setError] = useState("");
  const [sucess , setSucess] = useState("");

  const { LoginUser } = useAuth()

  async function handleSubmit(e){
    e.preventDefault();
    setError("")

    if(password < 6 || password >= 16){
      return setError(" A senha precisa ter entre 6 e 16 caracteres ")
    }

    if(password === ""){
      return setError(" Informe uma senha para realizar o login ")
    }

    if(email === ""){
      return setError(" Informe um email válido ")
    }

    const user = {
      email: email,
      password: password,
    }
    setSucess(" Usuário logado com sucesso ")

    const res = await LoginUser(user)

    console.log(res)

  
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.title}> Realizar Login </h1>

      {error && <h3 className="error"> {error}</h3>}
      {sucess && <h3 className="sucess"> {sucess} </h3>}
      <h4> Realize o Login para utilizar nosso sistema </h4>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className={styles.iptnLogin}
            type="email"
            required
            name="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Senha
          <input
            className={styles.iptnLogin}
            type="password"
            required
            name="password"
            placeholder="*******"
            onChange={(e) => setPassWord(e.target.value)}
          />
        </label>
        <input className={styles.btn} type="submit" value="Entrar" />
      </form>
    </div>
  );
};
