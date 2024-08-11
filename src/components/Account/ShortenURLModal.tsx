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

// type ShortenURLModalProps = {
//   open: boolean;
//   handleClose: () => void;
// };
interface ShortenURLModalProps {
  handleClose: () => void;
  createShortenLink: (name: string, longURL: string) => void;
}

const ShortenURLModal: React.FC<ShortenURLModalProps> = ({
  handleClose,
  createShortenLink,
}) => {
  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = () => {
    createShortenLink(form.name, form.longURL);
    handleClose();
  };

  // const ShortenURLModal = ({ handleClose, createShortenLink }: ShortenURLModalProps) => {
  //   const [form, setForm] = useState({
  //     name: "",
  //     longURL: "",
  //   });

  //   const handleChange = (event: { target: { name: any; value: any } }) =>
  //     setForm((oldForm) => ({
  //       ...oldForm,
  //       [event.target.name]: event.target.value,
  //     }));

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
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create a Short URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
