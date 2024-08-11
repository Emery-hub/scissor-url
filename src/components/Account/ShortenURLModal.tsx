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
import { error } from "console";

// type ShortenURLModalProps = {
//   open: boolean;
//   handleClose: () => void;
// };
interface ShortenURLModalProps {
  handleClose: () => void;
  createShortenLink: (name: string, longURL: string) => void;
}

interface FormState {
  name: string;
  longURL: string;
}

interface ErrorsState {
  name: string;
  longURL: string;
}

const ShortenURLModal: React.FC<ShortenURLModalProps> = ({
  handleClose,
  createShortenLink,
}) => {
  const [errors, setErrors] = useState<ErrorsState>({
    name: "",
    longURL: "",
  });

  const [form, setForm] = useState<FormState>({
    name: "",
    longURL: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = () => {
    const errors: ErrorsState = {
      name: "",
      longURL: "",
    };
    const tName = form.name.trim();
    const tLongURL = form.longURL.trim();

    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (tName.length < 3 || tName.length > 15) {
      errors.name =
        "The name should be at least 3 characters and max of 15 characters";
    }
    if (!regex.test(tLongURL)) {
      errors.longURL = "Please enter a valid URL";
    }

    if (!!Object.keys(errors).length) return setErrors(errors);

    createShortenLink(tName, tLongURL);
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

  console.log(errors);
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
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="Name"
          />
        </Box>

        <TextField
          error={!!errors.longURL}
          helperText={errors.longURL}
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
