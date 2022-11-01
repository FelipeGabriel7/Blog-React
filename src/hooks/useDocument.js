import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useDocument = (docCollection, title) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (canceled) {
        return;
      }
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, title);
        const snapDoc = await getDoc(docRef);

        setDocument(snapDoc.data());
        setLoading(false);

      } catch (e) {
        setError(e.message);
        console.log(e);

        setLoading(false);
      }
    }

    setLoading(false);
    loadDocument();
  }, [docCollection , title]);

  useEffect(() => {
    return () => setCanceled(true)
  })

  return { document , loading , error };
};
