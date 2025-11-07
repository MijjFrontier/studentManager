export type Student = {
  id: string; // uuid
  studentId: string; // human-readable id
  name: string;
  email: string;
  phone: string;
  address: string;
  level: string;
  grade: string;
  section: string;
};

export type Level = {
  id: string;
  name: string;
};

export type Grade = {
  id: string;
  name: string;
};

export type Section = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  studentId: string;
  course: string;
  score: number;
  date: string;
};

export type Course = {
  id: string;
  name: string;
};
