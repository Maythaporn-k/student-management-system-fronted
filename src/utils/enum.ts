enum Paths {
  HOME = "/home",
  STUDENT_LIST = "/list",
  STUDENT_ABSENCE = "/absence",
  STUDENT_ASSIGNMENT = "/assignment",
}

type StudentList = {
  id?: number;
  Name?: string;
  Age?: number;
  grade?: string;
  email?: string;
  attendance?: boolean;
};

enum API_Paths {
  STUDENT_LIST = "/orch/student-list",
  STUDENT_CREATE = "/orch/create-user",
  STUDENT_DELETE = "/orch/delete-user",
}

export { Paths, StudentList, API_Paths };
