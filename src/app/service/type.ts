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
  age: number | null;
  grade: string;
};

type DeleteStudent = {
  id: number;
};

type EditStudent = {
  id: number;
  name: string;
  age: number;
  grade: string;
  attendance: boolean;
};
export type { StudentList, InsertStudent, DeleteStudent, EditStudent };
