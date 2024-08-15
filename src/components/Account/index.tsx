import React from "react";
import { useState, Fragment, useEffect, useCallback, useMemo } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import LinkCard from "./Linkcard";
import ShortenURLModal from "./ShortenURLModal";
import { auth } from "../../firebase";
import {
  getFirestore,
  serverTimestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

// console.log(auth.currentUser?.uid);

interface LinkCardProps {
  id: string | number;
  createdAt: Timestamp; // Update the type to Timestamp
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
}

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [newLinkToastr, setNewLinkToastr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState<LinkCardProps[]>([]);
  const userUid = auth.currentUser?.uid;
  const firestore = getFirestore();

  const userCollection = useMemo(() => {
    return collection(firestore, "users", userUid ?? "", "links");
  }, [firestore, userUid]);

  const handleCreateShortenLink = async (name: string, longURL: string) => {
    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    // const userCollection = collection(
    //   firestore,
    //   "users",
    //   userUid ?? "",
    //   "links"
    // );

    const resp = await addDoc(userCollection, link);

    const docRef = doc(userCollection, resp.id);
    const docSnap = await getDoc(docRef);
    const createdAt = docSnap.data()?.createdAt;

    setLinks((links) => [
      ...links,
      { ...link, createdAt: createdAt as Timestamp, id: resp.id },
    ]);
    // setLinks((prevLinks) => [...prevLinks, {...link, id: resp.id }]);
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "users", userUid ?? "", "links")
      );
      const docs = querySnapshot.docs;

      const tempLinks: LinkCardProps[] = [];

      docs.forEach((doc) => {
        const { createdAt, name, longURL, shortCode, totalClicks } = doc.data();
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt,
          name,
          longURL,
          shortCode,
          totalClicks,
        });
      });

      setLinks(tempLinks);
      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLinks();
  }, [firestore, userUid]);

  const handleDeleteLink = useCallback(
    async (linkDocID: string) => {
      if (window.confirm("Are you sure you want to delete this link?")) {
        const linkDocRef = doc(
          firestore,
          "users",
          userUid ?? "",
          "links",
          linkDocID
        );
        await deleteDoc(linkDocRef);
        setLinks((oldLinks) =>
          oldLinks.filter((link) => link.id !== linkDocID)
        );
      }
    },
    [firestore, userUid]
  );

  const handleCopyLink = useCallback((shortURL: string) => {
    copy(shortURL);
    setNewLinkToastr(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkToastr}
        onClose={() => setNewLinkToastr(false)}
        autoHideDuration={3000}
        message="Link copied to the clipboard"
      />
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />

      <Box mt={{ xs: 3, sm: 5 }} p={{ xs: 2, sm: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create New
              </Button>
            </Box>

            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img
                  style={{
                    width: "225px",
                    height: "auto",
                    marginBottom: "24px",
                  }}
                  src="/assets/nodata.svg"
                  alt="no links"
                />
                <Typography>You have no links created yet</Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt.toMillis() -
                    prevLink.createdAt.toMillis()
                )
                .map((link, idx) => (
                  <Fragment key={link.id}>
                    <LinkCard
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />
                    {idx !== links.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
