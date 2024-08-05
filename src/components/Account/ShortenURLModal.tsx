import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

type ShortenURLModalProps = {
  open: boolean;
  handleClose: () => void;
};

const ShortenURLModal = ({ handleClose }: ShortenURLModalProps) => {
  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  return (
    <Dialog fullWidth open={true} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Create a Shortened URL
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          <TextField
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="Name"
          />
        </Box>

        <TextField
          value={form.longURL}
          name="longURL"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long URL"
        />
      </DialogContent>

      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={() => console.log(form)}
            variant="contained"
            color="primary"
          >
            Shorten URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
