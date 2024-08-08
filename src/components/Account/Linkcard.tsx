import React, { memo } from "react";
import { Typography, Button, Box } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import { formatDate } from "date-fns/format";
import { Timestamp } from "firebase/firestore";

interface LinkCardProps {
  id: string | number;
  createdAt: Timestamp;
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
  // deleteLink: () => string;
  // deleteLink: () => void;
  deleteLink: (linkDocID: string) => void;
  copyLink: (linkURL: string) => void;
}

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
}: LinkCardProps) => {
  console.log("link card rendered");
  const shortURL = `${window.location.host}/${shortCode}`;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="overline">
          Created at=={" "}
          {createdAt instanceof Timestamp
            ? formatDate(createdAt.toDate(), "d MMM, HH:mm")
            : "Invalid Date"}
        </Typography>
        <Box my={2}>
          <Typography style={{ marginBottom: "5px" }} variant="h5">
            Name: {name}
          </Typography>
          <Typography>Long URL: {longURL}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="primary">{shortURL}</Typography>

          <Box mx={2}>
            <Button
              onClick={() => copyLink(shortURL)}
              size="small"
              variant="outlined"
            >
              Copy
            </Button>
          </Box>
          <Button
            onClick={() => deleteLink(id as string)}
            color="secondary"
            size="small"
            variant="contained"
            disableElevation
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box>
        <Box>
          <Box display="flex" justifyContent="center">
            <Typography>{totalClicks}</Typography>
            <ChartIcon />
          </Box>
          <Typography variant="overline">Total Clicks</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(LinkCard);
