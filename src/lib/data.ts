
import type { Student } from './types';

// To persist data across hot reloads in development
const globalForStudents = global as unknown as { students: Student[] | undefined };

// Initialize students array only if it's not already defined
if (!globalForStudents.students) {
    globalForStudents.students = [];
}

const ITEMS_PER_PAGE = 20;

const simulateLatency = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getStudents(options: { query?: string; page?: number } = {}) {
  await simulateLatency();
  const { query, page = 1 } = options;

  let filteredStudents = globalForStudents.students || [];

  if (query) {
    const lowercasedQuery = query.toLowerCase();
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(lowercasedQuery) ||
        student.email.toLowerCase().includes(lowercasedQuery) ||
        student.studentId.toLowerCase().includes(lowercasedQuery)
    );
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return filteredStudents.slice(startIndex, endIndex);
}

export async function getTotalStudentPages(query?: string) {
  await simulateLatency(100);
  
  let filteredStudents = globalForStudents.students || [];
  if (query) {
    const lowercasedQuery = query.toLowerCase();
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(lowercasedQuery) ||
        student.email.toLowerCase().includes(lowercasedQuery) ||
        student.studentId.toLowerCase().includes(lowercasedQuery)
    );
  }

  return Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
}

export async function getStudentById(id: string) {
  await simulateLatency();
  const student = (globalForStudents.students || []).find((s) => s.id === id);
  if (!student) {
    return null;
  }
  return student;
}

export async function addStudent(studentData: Omit<Student, 'id' | 'studentId'>) {
    await simulateLatency();
    
    if (!globalForStudents.students) {
        globalForStudents.students = [];
    }

    const newId = crypto.randomUUID();
    const newStudentId = `S${1000 + globalForStudents.students.length + 1}`;
    
    const newStudent: Student = {
        ...studentData,
        id: newId,
        studentId: newStudentId,
    };
    globalForStudents.students.unshift(newStudent); // Add to the beginning of the array
    return newStudent;
}

export async function updateStudent(id: string, updates: Partial<Omit<Student, 'id' | 'studentId'>>) {
    await simulateLatency();
    
    if (!globalForStudents.students) {
        globalForStudents.students = [];
    }
    
    const studentIndex = globalForStudents.students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
        throw new Error('Student not found');
    }
    globalForStudents.students[studentIndex] = { ...globalForStudents.students[studentIndex], ...updates };
    return globalForStudents.students[studentIndex];
}

export async function deleteStudentById(id: string) {
    await simulateLatency();

    if (!globalForStudents.students) {
        globalForStudents.students = [];
    }

    const initialLength = globalForStudents.students.length;
    globalForStudents.students = globalForStudents.students.filter((s) => s.id !== id);
    if (globalForStudents.students.length === initialLength) {
        throw new Error('Student not found');
    }
    return { success: true };
}
