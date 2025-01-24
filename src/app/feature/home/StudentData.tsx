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
  Box,
} from "@mui/material";

import { InsertStudent, StudentList } from "@/app/service/type";
import Service from "@/app/service/service";
import InsertIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepRounded";
import EditIcon from "@mui/icons-material/EditOutlined";
import AlertModal from "@/app/component/AlertModal";
import axios from "axios";

const StudentData: React.FC = () => {
  let isLoading = true;
  const [isError, setIsError] = useState(false);

  //TODO:disabled validate next line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [students, setStudents] = useState<any>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState<InsertStudent>({
    name: "",
    age: null,
    grade: "",
  });

  const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(
    null
  );
  const [attendance, setAttendance] = useState<boolean | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const clearFormData = () => {
    setFormData({
      name: "",
      age: null,
      grade: "",
    });
  };

  //TODO: fetch list
  const fetchStudents = async () => {
    isLoading = true;
    try {
      const response = await Service.getStudentList();
      setStudents(response.data);
      if (response.data.message) {
        console.log(response.data.message);
        setIsNoData(true);
      } else {
        setIsNoData(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsNoData(false);
      setIsError(true);
    } finally {
      isLoading = false;
    }
  };

  const handleFormChange = (field: keyof InsertStudent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //TODO: handle insert
  const handleInsert = async () => {
    if (!formData.name || !formData.age || !formData.grade) {
      setFormError("All fields are required, Please try again.");
      return;
    }
    isLoading = true;
    try {
      const response = await Service.insertStudent(formData);
      setMessage(response.data.message);
      fetchStudents();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("error", error.response?.data.message);
        setMessage(error.response?.data?.message);
      }
    } finally {
      isLoading = false;
      setIsInsertModalOpen(false);
      setSnackBarOpen(true);
      clearFormData();
    }
  };
  //TODO: handle edit
  const handleEdit = async () => {
    if (!selectedStudent) return;

    if (!formData.name || !formData.age || !formData.grade) {
      setFormError("All fields are required, Please try again.");
      return;
    }

    isLoading = true;
    try {
      const response = await Service.updateStudent({
        id: selectedStudent.id,
        name: formData.name,
        age: formData.age,
        grade: formData.grade,
        attendance: attendance ?? selectedStudent.attendance,
      });
      setMessage(response.data.message);
      fetchStudents();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("error", error.response?.data.message);
        setMessage(error.response?.data?.message);
      }
    } finally {
      isLoading = false;
      setIsEditModalOpen(false);
      setSnackBarOpen(true);
    }
  };

  //TODO: handle delete
  const handleDelete = async () => {
    if (!deleteId) return;
    isLoading = true;
    console.log(deleteId);
    try {
      const response = await Service.deleteStudent({ id: deleteId });
      setMessage(response.data.message);
      fetchStudents();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("error", error.response?.data.message);
        setMessage(error.response?.data?.message);
      }
    } finally {
      isLoading = false;
      setIsDeleteModalOpen(false);
      setSnackBarOpen(true);
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

  function CustomNoResultsOverlay() {
    return (
      <div className="flex flex-col items-center justify-center mt-8 ">
        {!isNoData && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#d2d2d2"
            width={96}
            viewBox="0 0 523 299"
            aria-hidden
            focusable="false"
          >
            <path
              className="no-results-primary"
              d="M262 20c-63.513 0-115 51.487-115 115s51.487 115 115 115 115-51.487 115-115S325.513 20 262 20ZM127 135C127 60.442 187.442 0 262 0c74.558 0 135 60.442 135 135 0 74.558-60.442 135-135 135-74.558 0-135-60.442-135-135Z"
            />
            <path
              className="no-results-primary"
              d="M348.929 224.929c3.905-3.905 10.237-3.905 14.142 0l56.569 56.568c3.905 3.906 3.905 10.237 0 14.143-3.906 3.905-10.237 3.905-14.143 0l-56.568-56.569c-3.905-3.905-3.905-10.237 0-14.142ZM212.929 85.929c3.905-3.905 10.237-3.905 14.142 0l84.853 84.853c3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0l-84.853-84.853c-3.905-3.905-3.905-10.237 0-14.142Z"
            />
            <path
              className="no-results-primary"
              d="M212.929 185.071c-3.905-3.905-3.905-10.237 0-14.142l84.853-84.853c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-84.853 84.853c-3.905 3.905-10.237 3.905-14.142 0Z"
            />
            <path
              className="no-results-secondary"
              d="M0 43c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 53 0 48.523 0 43ZM0 89c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 99 0 94.523 0 89ZM0 135c0-5.523 4.477-10 10-10h74c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 181c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 227c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM523 227c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10ZM523 181c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 135c0 5.523-4.477 10-10 10h-74c-5.523 0-10-4.477-10-10s4.477-10 10-10h74c5.523 0 10 4.477 10 10ZM523 89c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 43c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10Z"
            />
          </svg>
        )}
        <Box sx={{ mt: 2, fontWeight: "bold", fontSize: "16px" }}>
          {" "}
          {isNoData ? "No Data." : " No results found."}{" "}
        </Box>
      </div>
    );
  }

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
    <div className="flex justify-center mb-4  max-h-fit">
      <div className="w-4/5  h-[600px ]overflow-auto">
        {isError && <Alert severity="error">Error fetching data!</Alert>}
        {snackBarOpen && message && (
          <Alert
            severity={message.includes("successfully") ? "success" : "error"}
          >
            {message}
          </Alert>
        )}
        <br />
        <DataGrid
          rows={students}
          pageSizeOptions={[5, 10, 15]}
          columns={columns}
          disableColumnMenu
          loading={isLoading}
          slots={{
            toolbar: CustomToolbar,
            noResultsOverlay: CustomNoResultsOverlay,
            noRowsOverlay: CustomNoResultsOverlay,
          }}
          pagination
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
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
              value={formData.age === null ? "" : formData.age}
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
