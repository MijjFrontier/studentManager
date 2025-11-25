
import type { Student, Note, Teacher } from './types';

// To persist data across hot reloads in development
const globalForStudents = global as unknown as { students?: Student[] };
const globalForNotes = global as unknown as { notes?: Note[] };
const globalForTeachers = global as unknown as { teachers?: Teacher[] };

// Initialize data arrays only if they're not already defined
if (!globalForStudents.students) {
    globalForStudents.students = [];
}

if (!globalForNotes.notes) {
    globalForNotes.notes = [];
}

if (!globalForTeachers.teachers) {
    globalForTeachers.teachers = [];
}


const ITEMS_PER_PAGE = 20;

const simulateLatency = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Student Data ---

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

export async function updateStudent(id: string, updates: Partial<Omit<Student, 'id' | 'studentId' | 'password'>>) {
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

// --- Notes Data ---
export async function getNotesByStudentId(studentId: string): Promise<Note[]> {
    await simulateLatency();
    return (globalForNotes.notes || []).filter(note => note.studentId === studentId)
                                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function addNote(noteData: Omit<Note, 'id' | 'date'>) {
    await simulateLatency();
    if (!globalForNotes.notes) {
        globalForNotes.notes = [];
    }
    const newNote: Note = {
        ...noteData,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
    };
    globalForNotes.notes.unshift(newNote);
    return newNote;
}

// --- Teacher Data ---

export async function addTeacher(teacherData: Omit<Teacher, 'id' | 'teacherId'>) {
    await simulateLatency();
    
    if (!globalForTeachers.teachers) {
        globalForTeachers.teachers = [];
    }

    const newId = crypto.randomUUID();
    const newTeacherId = `T${100 + globalForTeachers.teachers.length + 1}`;
    
    const newTeacher: Teacher = {
        ...teacherData,
        id: newId,
        teacherId: newTeacherId,
    };
    globalForTeachers.teachers.unshift(newTeacher);
    return newTeacher;
}

export async function getTeachers(options: { query?: string; page?: number } = {}) {
    await simulateLatency();
    const { query, page = 1 } = options;

    let filteredTeachers = globalForTeachers.teachers || [];

    if (query) {
        const lowercasedQuery = query.toLowerCase();
        filteredTeachers = filteredTeachers.filter(
            (teacher) =>
                teacher.name.toLowerCase().includes(lowercasedQuery) ||
                teacher.email.toLowerCase().includes(lowercasedQuery) ||
                teacher.teacherId.toLowerCase().includes(lowercasedQuery)
        );
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredTeachers.slice(startIndex, endIndex);
}

export async function getTotalTeacherPages(query?: string) {
    await simulateLatency(100);

    let filteredTeachers = globalForTeachers.teachers || [];
    if (query) {
        const lowercasedQuery = query.toLowerCase();
        filteredTeachers = filteredTeachers.filter(
            (teacher) =>
                teacher.name.toLowerCase().includes(lowercasedQuery) ||
                teacher.email.toLowerCase().includes(lowercasedQuery) ||
                teacher.teacherId.toLowerCase().includes(lowercasedQuery)
        );
    }

    return Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
}


// --- Combined Data ---
type User = (Teacher | Student) & { type: 'teacher' | 'student' };

export async function getAllUsers(): Promise<User[]> {
    await simulateLatency(200); // short latency
    const students = (globalForStudents.students || []).map(s => ({ ...s, type: 'student' as const }));
    const teachers = (globalForTeachers.teachers || []).map(t => ({ ...t, type: 'teacher' as const }));
    
    const all = [...teachers, ...students];
    return all.sort((a, b) => a.name.localeCompare(b.name));
}
