import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SnackBarContext from "./snackbar-context";

const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const showSnackbarValue = (msg: string, sev: "success" | "error") => {
    setMessage(msg);
    setOpen(true);
    setSeverity(sev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const value = { showSnackbarValue };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        {severity}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SnackBarContext.Provider value={{ showSnackBar: showSnackbarValue }}>
      {children}
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        action={action}
      />
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
