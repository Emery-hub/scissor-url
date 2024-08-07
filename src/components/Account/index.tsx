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

console.log(auth.currentUser?.uid);

interface LinkCardProps {
  id: string | number;
  createdAt: Timestamp; // Update the type to Timestamp
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
}

// const dummyData: LinkCardProps[] = [
//   {
//     id: "31r08ms0fam",
//     createdAt: Timestamp.fromDate(new Date()),
//     name: "Dummy name",
//     longURL: "http://www.google.com",
//     shortCode: "masdom",
//     totalClicks: 312,
//   },
//   {
//     id: "31r089987ms0fam",
//     createdAt: Timestamp.fromDate(new Date()),
//     name: "Dummy name 2",
//     longURL: "http://www.google.com",
//     shortCode: "masdom real",
//     totalClicks: 352,
//   },
//   {
//     id: "31r089435987ms0fam",
//     createdAt: Timestamp.fromDate(new Date()),
//     name: "Dummy name 3",
//     longURL: "http://www.google.com",
//     shortCode: "masdom-real",
//     totalClicks: 152,
//   },
// ];

const Account = () => {
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
    };

    fetchLinks();
  }, [firestore, userUid]);

  const handleDeleteLink = useCallback(
    async (linkDocID: string) => {
      const linkDocRef = doc(
        firestore,
        "users",
        userUid ?? "",
        "links",
        linkDocID
      );
      await deleteDoc(linkDocRef);
      setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkDocID));
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
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
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

            {links
              .sort(
                (prevLink, nextLink) =>
                  nextLink.createdAt.toMillis() - prevLink.createdAt.toMillis()
              )
              .map((link, idx) => (
                <Fragment key={link.id}>
                  <LinkCard
                    {...link}
                    // deleteLink={() => handleDeleteLink(link.id.toString())}
                    // deleteLink={() => handleDeleteLink(link.id.toString())}
                    deleteLink={handleDeleteLink}
                    copyLink={handleCopyLink}
                  />
                  {idx !== links.length - 1 && (
                    <Box my={4}>
                      <Divider />
                    </Box>
                  )}
                </Fragment>
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
