import { useState , useEffect , useReducer } from 'react'
import {db} from '../firebase/config';
import { doc , deleteDoc } from 'firebase/firestore';


const stateDelete = {
  loading: null,
  error: null,
}

const reducer = (state , action) => {
  switch(action.type){
    case 'ERROR':
      return {...state , loading:false , error: true}
    case 'DELETE':
      return {...state , loading: false , error: null}
    case 'LOADING':
      return {...state , loading: true , error: action.payload}
    default:
      return {...state}
  }
}

export function useDelete(docCollection){

  const[state , dispatch] = useReducer(reducer , stateDelete);
  const[canceled , setCanceled] = useState(false);

  function verifyAndCanceled(action){
    if(!canceled){
      return dispatch(action)
    }
  }

  async function deleteDocument(id) {

    verifyAndCanceled({
      type: "LOADING",
    })
    try {

      const deleteDocument = await deleteDoc(doc(db , docCollection , id))

      verifyAndCanceled({
        type: "DELETE",
        payload: deleteDocument,
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

  return {deleteDocument , state}
}
