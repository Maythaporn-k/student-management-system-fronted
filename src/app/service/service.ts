import AxiosInstance from "@/app/service/axiosInstance";
import { DeleteStudent, InsertStudent, StudentList } from "./type";
import { API_Paths } from "@/utils/enum";

const Service = {
  getStudentList: () => AxiosInstance.get<StudentList>(API_Paths.STUDENT_LIST),
  insertStudent: (studentData: InsertStudent) =>
    AxiosInstance.post<InsertStudent>(API_Paths.STUDENT_CREATE, studentData),
  deleteStudent: (studentId: DeleteStudent) =>
    AxiosInstance.delete<DeleteStudent>(API_Paths.STUDENT_DELETE, {
      data: studentId, // Axios expects the data in the 'data' field for DELETE requests
    }),
};

export default Service;
