import React, { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Dialog,
} from "@mui/material";

// Define props types
interface InsertModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  InsertUser: () => void;
}

const InsertModal: React.FC<InsertModalProps> = ({
  isOpen,
  handleClose,
  isLoading,
  InsertUser,
}) => {
  // State for form data
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [grade, setGrade] = useState("");

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Add New Student
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name Surname"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Grade"
          type="text"
          fullWidth
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#000000" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={InsertUser}
          disabled={isLoading}
          sx={{ color: "#ffffff", backgroundColor: "#000000" }}
        >
          {isLoading ? "Adding..." : "Add Student"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsertModal;
