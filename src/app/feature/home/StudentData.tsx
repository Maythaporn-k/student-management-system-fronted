"use client";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";

import { DeleteStudent, InsertStudent, StudentList } from "@/app/service/type";
import Alert from "@mui/material/Alert";
import Service from "@/app/service/service";

import InsertIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepRounded";
import InsertModal from "@/app/component/InsertModal";

const StudentData: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [students, setStudents] = useState<StudentList[]>([]);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [grade, setGrade] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fetchList() {
    setIsLoading(true);
    Service.getStudentList()
      .then((response) => {
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log("Error fetching data: ", error);
      });
  }

  const handleInsertModalClose = () => {
    setIsInsertModalOpen(false);
    setName("");
    setAge("");
    setGrade("");
    setErrorMessage(null);
  };

  // const handleDeleteModalClose = () => {
  //   setIsModalOpen(false);
  //   setErrorMessage(null);
  // };

  const InsertUser = () => {
    if (!name || !age || !grade) {
      setErrorMessage("All fields are required.");
      return;
    }

    const studentData: InsertStudent = {
      name,
      age,
      grade,
    };

    setIsLoading(true);
    Service.insertStudent(studentData)
      .then(() => {
        fetchList();
        setIsLoading(false);
        handleInsertModalClose();
        setErrorMessage("Success");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error inserting student: ", error);
        handleInsertModalClose();
        setErrorMessage("Failed to insert student. Please try again.");
      });
    setIsSnackBar(true);
  };

  const DeleteUser = (studentId: number) => {
    const deleteId: DeleteStudent = {
      id: studentId,
    };
    setIsLoading(true);
    Service.deleteStudent(deleteId)
      .then(() => {
        fetchList();
        setIsLoading(false);
        handleInsertModalClose();
        setErrorMessage("Success");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error inserting student: ", error);
        handleInsertModalClose();
        setErrorMessage("Failed to delete student. Please try again.");
      });
    setIsSnackBar(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setIsSnackBar(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isSnackBar]);

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
      renderCell: (params) => {
        if (params.value === false) {
          return (
            <Chip
              label="Absence"
              sx={{
                backgroundColor: "#FB4141",
                color: "white",
                fontWeight: "bold",
              }}
            />
          );
        }

        return (
          <Chip
            label="Present"
            sx={{
              backgroundColor: "#5CB338",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          sx={{ color: "#000000", borderColor: "#000000" }}
          onClick={() => DeleteUser(params.row.id)}
        ></Button>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="flex justify-end m-2">
        <GridToolbarFilterButton
          slotProps={{
            button: {
              variant: "outlined",
              sx: {
                color: "#000000",
                borderColor: "#000000",
              },
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<InsertIcon />}
          sx={{
            height: "32px",
            color: "#000000", // Set text color
            borderColor: "#000000", // Set border color
          }}
          onClick={() => {
            setIsInsertModalOpen(true);
          }}
        >
          INSERT
        </Button>

        <GridToolbarExport
          slotProps={{
            button: {
              variant: "outlined",
              sx: {
                color: "#000000",
                borderColor: "#000000",
              },
            },
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="flex justify-center  mt-8">
      <div className="w-4/5 h-fit overflow-auto">
        {isError && (
          <Alert variant="filled" severity="error">
            Error fetching data!
          </Alert>
        )}
        {isSnackBar && errorMessage != null && errorMessage != "Success" && (
          <Alert variant="filled" severity="error">
            {errorMessage}{" "}
          </Alert>
        )}
        {isSnackBar && errorMessage == "Success" && (
          <Alert variant="filled" severity="success">
            Insert Student Success !
          </Alert>
        )}
        <br />
        <DataGrid
          rows={students}
          columns={columns}
          rowSelection={false}
          disableColumnMenu={true}
          loading={isLoading}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
        <InsertModal
          InsertUser={InsertUser}
          handleClose={handleInsertModalClose}
          isLoading={isLoading}
          isOpen={isInsertModalOpen}
        />
      </div>
    </div>
  );
};

export default StudentData;
