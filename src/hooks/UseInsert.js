import { useState , useEffect , useReducer } from 'react'
import {db} from '../firebase/config';
import { collection , addDoc , Timestamp  } from 'firebase/firestore';


const stateInsert = {
  loading: null,
  error: null,
}

const reducer = (state , action) => {
  switch(action.type){
    case 'ERROR':
      return {...state , loading:false , error: true}
    case 'SUCESS':
      return {...state , loading: false , error: null}
    case 'LOADING':
      return {...state , loading: true , error: action.payload}
    default:
      return {...state}
  }
}

export function useInsert(docCollection){

  const[state , dispatch] = useReducer(reducer , stateInsert);
  const[canceled , setCanceled] = useState(false);

  function verifyAndCanceled(action){
    if(!canceled){
      return dispatch(action)
    }
  }

  async function insertDocument(database) {

    verifyAndCanceled({
      type: "LOADING",
    })
    try {

      const document = {...database , createIn: Timestamp.now()}

      const insertDatabase = await addDoc(
        collection(db , docCollection),
        document
      )

      verifyAndCanceled({
        type: "SUCESS",
        payload: insertDatabase,
      })
      
    } catch (e) {
      
      verifyAndCanceled({
        type: "ERROR",
        payload: e,
      })
    }
  }

  useEffect(() => {
    return () => setCanceled(false)
  }, [])

  return {insertDocument , state}
}
