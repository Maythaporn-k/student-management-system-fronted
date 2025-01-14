import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoading?: boolean;
  description: string;
  title: string;
  handleSubmit: () => void;
}

const AlertModal: React.FC<AlertDialogProps> = ({
  isOpen,
  handleClose,
  isLoading,
  description,
  handleSubmit,
  title,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000000" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ color: "#000000" }}
            onClick={handleSubmit}
            autoFocus
            disabled={isLoading} // Disable the button if loading
          >
            {isLoading ? "Deleting..." : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertModal;
