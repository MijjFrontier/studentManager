export type Student = {
  id: string; // uuid
  studentId: string; // human-readable id
  name: string;
  email: string;
  phone: string;
  address: string;
  studyProgram: string;
  campus: string;
  academicPeriod: string;
};

export type Campus = {
  id: string;
  name: string;
};

export type StudyProgram = {
  id: string;
  name: string;
};

export type AcademicPeriod = {
  id: string;
  name: string;
};
