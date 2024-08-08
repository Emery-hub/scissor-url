import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app, firestore } from "../../firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
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
      //   if (linkDoc.exists()) {
      //     const { longURL, linkID, userUid } = linkDoc.data();
      //     firestore
      //       .collection("users")
      //       .doc(userUid)
      //       .collection("links")
      //       .doc(linkID)
      //       .update({});
      //     window.location.href = longURL;
      //   } else {
      //     setLoading(false);
      //   }

      if (linkDoc.exists()) {
        const { longURL, linkID, userUid } = linkDoc.data();
        const userLinkDocRef = doc(
          collection(firestore, "users", userUid, "links"),
          linkID
        );
        await updateDoc(userLinkDocRef, {
          totalClicks: increment(1),
        });
        window.location.href = longURL;
      } else {
        setLoading(false);
      }
    };
    fetchLinkDoc();
  }, [shortCode]);

  if (loading)
    return (
      <Box mt={5} justifyContent="center" textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link...</Typography>
      </Box>
    );
  else
    return (
      <Box mt={10} textAlign="center">
        <Typography>Link is not valid</Typography>
      </Box>
    );

  //   return null;
};

export default LinkRedirect;
