
import{
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut

}from 'firebase/auth'

import { useState , useEffect } from 'react'

export const useAuth = () => {
  const[error , setError] = useState(null);
  const[loading , setLoading] = useState(null);

  //clean up
  const[canceled , setCanceled] = useState(false);

  const auth = getAuth();

  function verifyIsChecked(){
    if(canceled){
      return
    }
  }
  
  function logout () {
    verifyIsChecked()
    signOut(auth)
  }


  async function createUser(data){
    verifyIsChecked();

    setLoading(true);
    setError("");

    try {
      
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user , {
        displayName: data.displayName
      });
      setLoading(false)
      
      return user;

    } catch (e) {
      console.log(e)
      
      let messageError
      
      if(e.message.includes("email-already")){
        messageError = " Usuário ja existe ";
      }

      setError(messageError)

    }

    setLoading(false)
  }


  async function LoginUser(data) {

    verifyIsChecked()

    setLoading(true)
    setError("")

    try {

      await signInWithEmailAndPassword(
        auth ,
        data.email,
        data.password
        )
        setLoading(false)
      
    } catch (e) {
      
      let messageError
      
      if(e.message.includes("email-already")){
        messageError = " Usuário ja existe ";
      }else if(e.message.includes){
        messageError = " Senha inválida "
      }else{
        messageError = " Algo deu errado "
      }

      setError(messageError)
      
    }

    setLoading(false)

  }


  useEffect(() => {
    return () => {
      setCanceled(true);
    }
  }, [])

  return{
      auth,
      createUser,
      error,
      loading,
      logout,
      LoginUser
  }

}