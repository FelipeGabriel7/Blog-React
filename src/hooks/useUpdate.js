import { useState , useEffect , useReducer } from 'react'
import {db} from '../firebase/config';
import {  doc , updateDoc } from 'firebase/firestore';


const stateInsert = {
  loading: null,
  error: null,
}

const reducer = (state , action) => {
  switch(action.type){
    case 'ERROR':
      return {...state , loading:false , error: true}
    case 'UPDATE':
      return {...state , loading: false , error: null}
    case 'LOADING':
      return {...state , loading: true , error: action.payload}
    default:
      return {...state}
  }
}

export function useUpdate(docCollection){

  const[state , dispatch] = useReducer(reducer , stateInsert);
  const[canceled , setCanceled] = useState(false);

  function verifyAndCanceled(action){
    if(!canceled){
      return dispatch(action)
    }
  }

  async function  updateDocument(id , database) {

    verifyAndCanceled({
      type: "LOADING",
    })
    try {

      const updateRef = await doc(db , docCollection , id)
      const updateDocumentRef = await updateDoc(updateRef , database);

      verifyAndCanceled({
        type: "UPDATE",
        payload: updateDocumentRef,
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

  return { updateDocument , state}
}
