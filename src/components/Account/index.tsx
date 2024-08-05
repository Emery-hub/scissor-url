import React from "react";
import { useState, Fragment } from "react";
import Navbar from "./Navbar";
import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import LinkCard from "./Linkcard";
import ShortenURLModal from "./ShortenURLModal";

interface LinkCardProps {
  id: string | number;
  createdAt: string; // Update the type to string
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
}

const dummyData: LinkCardProps[] = [
  {
    id: "31r08ms0fam",
    createdAt: new Date().toDateString(),
    name: "Dummy name",
    longURL: "http://www.google.com",
    shortCode: "masdom",
    totalClicks: 312,
  },
  {
    id: "31r089987ms0fam",
    createdAt: new Date().toDateString(),
    name: "Dummy name 2",
    longURL: "http://www.google.com",
    shortCode: "masdom real",
    totalClicks: 352,
  },
  {
    id: "31r089435987ms0fam",
    createdAt: new Date().toDateString(),
    name: "Dummy name 3",
    longURL: "http://www.google.com",
    shortCode: "masdom-real",
    totalClicks: 152,
  },
];

const Account = () => {
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState(dummyData);

  return (
    <>
      {openModal && (
        <ShortenURLModal handleClose={() => setOpenModal(false)} open={false} />
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

            {links.map((link, idx) => (
              <Fragment key={link.id}>
                <LinkCard {...link} />
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
