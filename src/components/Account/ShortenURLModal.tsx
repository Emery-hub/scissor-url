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
  CircularProgress,
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    longURL: "",
  });
  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async () => {
    const errors = {
      name: "",
      longURL: "",
    };
    const tName = form.name.trim();
    const tLongURL = form.longURL.trim();

    // Name validation
    if (tName.length < 3 || tName.length > 15) {
      errors.name = "The Name should be min of 3 and max of 15 characters";
    }

    // URL validation (basic pattern)
    const urlPattern = new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    );

    if (!urlPattern.test(tLongURL)) {
      errors.longURL = "The URL should be a valid URL";
    }

    // If there are errors, set the error state and prevent submission
    if (errors.name || errors.longURL) {
      setErrors(errors);
      return;
    }

    // const expression =
    //   /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    // const regex = new RegExp(expression);

    // if (tName.length < 3 || tName.length > 15) {
    //   errors.name = "The Name should be min of 3 and max of 15 characters";
    // }
    // if (!regex.test(tLongURL)) {
    //   errors.longURL = "The URL should be a valid URL";
    // }

    // if (!!Object.keys(errors).length) return setErrors(errors);

    setLoading(true);
    try {
      setTimeout(() => createShortenLink(tName, tLongURL), 2000);
    } catch (err) {
      setLoading(false);
      handleClose();
    }
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disableElevation
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Create a Short URL"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
