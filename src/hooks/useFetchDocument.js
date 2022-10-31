import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocument = (docCollection, search = null, uid = null) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    async function IsCanceled() {
      if (canceled) {
        return;
      }
      setLoading(true);
      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if(search){
          q = await query(collectionRef , where("tags" , "array-contains" , search) , orderBy("createIn"))
        }else if(uid){
          q = await query(collectionRef , where("uid" , "==" , uid) , orderBy("createIn"))
        }else{
          q = await query(collectionRef, orderBy("createIn"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocument(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          console.log(querySnapshot);
        });

        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(" Algo deu errado " + e.message);
      }

      setLoading(false);
    }

    IsCanceled();
  }, [docCollection, search, uid, canceled]);

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return { document, error, loading , setError};
};
