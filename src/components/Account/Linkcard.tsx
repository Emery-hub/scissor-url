import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format, { formatDate } from "date-fns/format";

interface LinkCardProps {
  id: string | number;
  createdAt: string;
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
}

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortCode,
  totalClicks,
}: LinkCardProps) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="overline">
          Created at {formatDate(createdAt, "d MMM, HH:mm")}
        </Typography>
        <Box my={2}>
          <Typography variant="h5">Name: {name}</Typography>
          <Typography>Long URL: {longURL}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={3}>
            <Typography color="primary">
              {window.location.host}/{shortCode}
            </Typography>
          </Box>
          <Button size="small" variant="outlined">
            Copy
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

export default LinkCard;
