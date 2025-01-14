"use client";

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  useOnMount,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Chip,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { InsertStudent, StudentList } from "@/app/service/type";
import Service from "@/app/service/service";
import InsertIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepRounded";
import EditIcon from "@mui/icons-material/EditOutlined";
import AlertModal from "@/app/component/AlertModal";

const StudentData: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //TODO:disabled validate next line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [students, setStudents] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState<InsertStudent>({
    name: "",
    age: undefined,
    grade: "",
  });

  const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(
    null
  );
  const [attendance, setAttendance] = useState<boolean | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  //TODO: fetch list
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await Service.getStudentList();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useOnMount(() => {
    fetchStudents();
  });

  useEffect(() => {
    if (snackBarOpen) {
      const timer = setTimeout(() => setSnackBarOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [snackBarOpen]);

  const handleFormChange = (field: keyof InsertStudent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  //TODO: handle insert
  const handleInsert = async () => {
    if (!formData.name || !formData.age || !formData.grade) {
      setFormError("All fields are required, Please try again.");
      return;
    }
    setIsLoading(true);
    try {
      await Service.insertStudent(formData);
      setErrorMessage("Insert Success");
      // fetchStudents();
    } catch (error) {
      console.error("Error inserting student:", error);
      setErrorMessage("Failed to insert student. Please try again.");
    } finally {
      setIsLoading(false);
      setIsInsertModalOpen(false);
      setSnackBarOpen(true);
      fetchStudents();
    }
  };

  //TODO: handle edit
  const handleEdit = async () => {
    if (!selectedStudent) return;

    if (!formData.name || !formData.age || !formData.grade) {
      setFormError("All fields are required, Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      await Service.updateStudent({
        id: selectedStudent.id,
        name: formData.name,
        age: formData.age,
        grade: formData.grade,
        attendance: attendance ?? selectedStudent.attendance,
      });
      setErrorMessage("Edit Success");
      // fetchStudents();
    } catch (error) {
      console.error("Error editing student:", error);
      setErrorMessage("Failed to edit student. Please try again.");
    } finally {
      setIsLoading(false);
      setIsEditModalOpen(false);
      setSnackBarOpen(true);
      fetchStudents();
    }
  };

  //TODO: handle delete
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    console.log(deleteId);
    try {
      await Service.deleteStudent({ id: deleteId });
      setErrorMessage("Delete Success");
      // fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      setErrorMessage("Failed to delete student. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setSnackBarOpen(true);
      fetchStudents();
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "age", headerName: "Age", width: 100, type: "number" },
    { field: "grade", headerName: "Grade", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "attendance",
      headerName: "Attendance",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Present" : "Absence"}
          sx={{
            backgroundColor: params.value ? "#5CB338" : "#FB4141",
            color: "white",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          startIcon={<EditIcon />}
          sx={{ color: "#000000" }}
          onClick={() => {
            setSelectedStudent(params.row);
            setFormData({
              name: params.row.name,
              age: params.row.age,
              grade: params.row.grade,
            });
            setAttendance(params.row.attendance);
            setIsEditModalOpen(true);
          }}
        />
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          sx={{ color: "#000000" }}
          onClick={() => {
            setDeleteId(params.row.id);
            setIsDeleteModalOpen(true);
          }}
        />
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer className="flex justify-end m-2">
      <GridToolbarFilterButton
        slotProps={{
          button: {
            variant: "outlined",
            sx: { color: "#000000", borderColor: "#000000", height: "36px" },
          },
        }}
      />
      <Button
        variant="outlined"
        startIcon={<InsertIcon />}
        sx={{ color: "#000000", borderColor: "#000000" }}
        onClick={() => setIsInsertModalOpen(true)}
      >
        INSERT
      </Button>
      <GridToolbarExport
        slotProps={{
          button: {
            variant: "outlined",
            sx: { color: "#000000", borderColor: "#000000", height: "36px" },
          },
        }}
      />
    </GridToolbarContainer>
  );

  return (
    <div className="flex justify-center mt-8">
      <div className="w-4/5 h-fit overflow-auto">
        {isError && <Alert severity="error">Error fetching data!</Alert>}
        {snackBarOpen && errorMessage && (
          <Alert
            severity={errorMessage.includes("Success") ? "success" : "error"}
          >
            {errorMessage}
          </Alert>
        )}
        <br />
        <DataGrid
          rows={students}
          columns={columns}
          disableColumnMenu
          loading={isLoading}
          slots={{ toolbar: CustomToolbar }}
        />
        {/* Insert Dialog */}
        <Dialog
          open={isInsertModalOpen}
          onClose={() => setIsInsertModalOpen(false)}
        >
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            {formError && <div className="text-red mb-3">*{formError}</div>}
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => handleFormChange("age", Number(e.target.value))}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Grade"
              value={formData.grade}
              onChange={(e) => handleFormChange("grade", e.target.value)}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "#000000" }}
              onClick={() => {
                setIsInsertModalOpen(false);
                setFormError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleInsert}
              sx={{ bgcolor: "#000000", color: "#ffffff" }}
            >
              {" "}
              Insert Student{" "}
            </Button>{" "}
          </DialogActions>{" "}
        </Dialog>
        {/* Edit Dialog */}
        <Dialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            {formError && <div className="text-red mb-3">*{formError}</div>}
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => handleFormChange("age", Number(e.target.value))}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Grade"
              value={formData.grade}
              onChange={(e) => handleFormChange("grade", e.target.value)}
              fullWidth
              margin="dense"
            />

            <FormControl fullWidth margin="dense">
              <InputLabel className="mt-3" id="attendance-label">
                Attendance
              </InputLabel>
              <Select
                className="h-[55px]"
                labelId="attendance-label"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value === "true")}
              >
                <MenuItem value={"true"}>Present</MenuItem>
                <MenuItem value={"false"}>Absence</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "#000000" }}
              onClick={() => {
                setIsEditModalOpen(false);
                setFormError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ color: "#ffffff", backgroundColor: "#000000" }}
              onClick={handleEdit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <AlertModal
          isOpen={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          title="Delete Confirmation"
          description="Are you sure you want to delete this student?"
          handleSubmit={handleDelete}
        />
      </div>
    </div>
  );
};

export default StudentData;
