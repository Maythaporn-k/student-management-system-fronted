import AxiosInstance from "@/app/service/axiosInstance";
import { DeleteStudent, EditStudent, InsertStudent, StudentList } from "./type";
import { API_Paths } from "@/utils/enum";

const Service = {
  getStudentList: () => AxiosInstance.get<StudentList>(API_Paths.STUDENT_LIST),
  insertStudent: (studentData: InsertStudent) =>
    AxiosInstance.post<InsertStudent>(API_Paths.STUDENT_CREATE, studentData),
  deleteStudent: (studentId: DeleteStudent) =>
    AxiosInstance.delete<DeleteStudent>(API_Paths.STUDENT_DELETE, {
      data: studentId,
    }),
  updateStudent: (studentData: EditStudent) =>
    AxiosInstance.put<EditStudent>(API_Paths.STUDENT_UPDATE, studentData),
};

export default Service;
