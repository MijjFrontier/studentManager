
import type { Student } from './types';
import { PlaceHolderImages } from './placeholder-images';

// Using 'let' to allow modification by server actions
let students: Student[] = [];

// Generate 35 students for demonstration
if (students.length === 0) {
  for (let i = 1; i <= 35; i++) {
    students.push({
      id: crypto.randomUUID(),
      studentId: `S${1000 + i}`,
      name: `Student Name ${i}`,
      email: `student.name.${i}@example.com`,
      phone: `(555) 555-55${i.toString().padStart(2, '0')}`,
      address: `${i * 123} Main St, Anytown, USA 12345`,
      avatarUrl: PlaceHolderImages[i-1]?.imageUrl || `https://picsum.photos/seed/${i}/200/200`
    });
  }
}


const ITEMS_PER_PAGE = 20;

const simulateLatency = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getStudents(options: { query?: string; page?: number } = {}) {
  await simulateLatency();
  const { query, page = 1 } = options;

  let filteredStudents = students;

  if (query) {
    const lowercasedQuery = query.toLowerCase();
    filteredStudents = students.filter(
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
  
  let filteredStudents = students;
  if (query) {
    const lowercasedQuery = query.toLowerCase();
    filteredStudents = students.filter(
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
  const student = students.find((s) => s.id === id);
  if (!student) {
    return null;
  }
  return student;
}

export async function addStudent(studentData: Omit<Student, 'id' | 'studentId' | 'avatarUrl'>) {
    await simulateLatency();
    const newId = crypto.randomUUID();
    const newStudentId = `S${1000 + students.length + 1}`;
    const newAvatarIndex = (students.length % PlaceHolderImages.length);

    const newStudent: Student = {
        ...studentData,
        id: newId,
        studentId: newStudentId,
        avatarUrl: PlaceHolderImages[newAvatarIndex]?.imageUrl || `https://picsum.photos/seed/${newId}/200/200`
    };
    students.unshift(newStudent); // Add to the beginning of the array
    return newStudent;
}

export async function updateStudent(id: string, updates: Partial<Omit<Student, 'id' | 'studentId' | 'avatarUrl'>>) {
    await simulateLatency();
    const studentIndex = students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
        throw new Error('Student not found');
    }
    students[studentIndex] = { ...students[studentIndex], ...updates };
    return students[studentIndex];
}

export async function deleteStudentById(id: string) {
    await simulateLatency();
    const initialLength = students.length;
    students = students.filter((s) => s.id !== id);
    if (students.length === initialLength) {
        throw new Error('Student not found');
    }
    return { success: true };
}
