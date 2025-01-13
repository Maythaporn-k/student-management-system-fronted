type StudentList = {
  id: number;
  name: string;
  age: number;
  grade: string;
  email: string;
  attendance: boolean;
};

type InsertStudent = {
  name: string;
  age: number;
  grade: string;
};

type DeleteStudent = {
  id: number;
};
export type { StudentList, InsertStudent, DeleteStudent };
