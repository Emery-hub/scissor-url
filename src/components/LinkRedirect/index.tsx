import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { CircularProgress, Box, Typography } from "@mui/material";

// const LinkRedirect = () => {
//   const {shortCode} = useParams();

//   useEffect(() => {
//     const fetchLinkDoc = async () => {
//       const linkDoc = await firestore.collection('links').doc(shortCode).get();
//     };
//     fetchLinkDoc();
//   }, []);
//   return <div>{JSON.stringify(params, null, 2)}</div>;
// };

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const linkDocRef = doc(collection(firestore, "links"), shortCode);
      const linkDoc = await getDoc(linkDocRef);

      // Handle the fetched document here
      if (linkDoc.exists()) {
        const { longURL } = linkDoc.data();
        window.location.href = longURL;
      }
    };
    fetchLinkDoc();
  }, [shortCode]);

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return null;
};

export default LinkRedirect;
