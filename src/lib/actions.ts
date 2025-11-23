'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addStudent,
  updateStudent as updateStudentData,
  deleteStudentById,
  addNote,
  addTeacher,
} from '@/lib/data';

// --- Student Actions ---

const StudentFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
  phone: z.string().regex(/^\d{9}$/, { message: 'El número de teléfono debe tener 9 dígitos.' }),
  address: z.string().optional(),
  level: z.string({ required_error: 'El nivel es requerido.' }).min(1, { message: 'El nivel es requerido.' }),
  grade: z.string({ required_error: 'El grado es requerido.' }).min(1, { message: 'El grado es requerido.' }),
  section: z.string({ required_error: 'La sección es requerida.' }).min(1, { message: 'La sección es requerida.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    level?: string[];
    grade?: string[];
    section?: string[];
  };
  message?: string | null;
  data?: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    level: string;
    grade: string;
    section: string;
  }
};

export async function createStudent(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = StudentFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear el estudiante. Por favor, comprueba los campos.',
      data: rawFormData as State['data'],
    };
  }
  
  const dataToSave = {
    ...validatedFields.data,
    address: validatedFields.data.address || '',
  };

  try {
    await addStudent(dataToSave);
  } catch (error) {
    return { message: 'Error de base de datos: No se pudo crear el estudiante.', data: rawFormData as State['data'] };
  }

  revalidatePath('/');
  redirect(`/?success_message=${encodeURIComponent('Estudiante creado con éxito.')}`);
}

export async function updateStudent(id: string, prevState: State, formData: FormData): Promise<State> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = StudentFormSchema.safeParse(rawFormData);

   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al actualizar el estudiante. Por favor, comprueba los campos.',
      data: rawFormData as State['data'],
    };
  }
  
  const dataToSave = {
    ...validatedFields.data,
    address: validatedFields.data.address || '',
  };

  try {
    await updateStudentData(id, dataToSave);
  } catch (e) {
    return { message: 'Error de base de datos: No se pudo actualizar el estudiante.', data: rawFormData as State['data'] };
  }

  const redirectPath = `/students/${id}`;
  revalidatePath('/');
  revalidatePath(redirectPath);
  redirect(`${redirectPath}?success_message=${encodeURIComponent('Estudiante actualizado con éxito.')}`);
}

export async function deleteStudent(id: string) {
  try {
    await deleteStudentById(id);
    revalidatePath('/');
    redirect(`/?success_message=${encodeURIComponent('Estudiante eliminado con éxito.')}`);
  } catch (e) {
    return { message: 'Error de base de datos: No se pudo eliminar el estudiante.' };
  }
}

// --- Notes Actions ---

const NoteFormSchema = z.object({
    studentId: z.string(),
    course: z.string({ required_error: 'La materia es requerida.' }).min(1, { message: 'La materia es requerida.' }),
    score: z.coerce.number().min(0, { message: 'La nota debe ser como mínimo 0.' }).max(20, { message: 'La nota debe ser como máximo 20.' }),
});


export type NoteState = {
    errors?: {
        course?: string[];
        score?: string[];
    };
    message?: string | null;
}

export async function createNote(prevState: NoteState, formData: FormData) {
    const validatedFields = NoteFormSchema.safeParse({
        studentId: formData.get('studentId'),
        course: formData.get('course'),
        score: formData.get('score'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error al registrar la nota. Por favor, comprueba los campos.',
        };
    }

    try {
        await addNote(validatedFields.data);
    } catch (e) {
        return { message: 'Error de base de datos: No se pudo registrar la nota.' };
    }
    
    const studentId = validatedFields.data.studentId;
    const redirectPath = `/students/${studentId}`;
    revalidatePath(redirectPath);
    redirect(`${redirectPath}?success_message=${encodeURIComponent('Nota registrada con éxito.')}`);
}


// --- Teacher Actions ---
const TeacherFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
  phone: z.string().regex(/^\d{9}$/, { message: 'El número de teléfono debe tener 9 dígitos.' }),
});

export type TeacherState = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
  };
  message?: string | null;
  data?: {
    name: string;
    email: string;
    phone: string;
  }
};

export async function createTeacher(prevState: TeacherState, formData: FormData): Promise<TeacherState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = TeacherFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear el profesor. Por favor, comprueba los campos.',
      data: rawFormData as TeacherState['data'],
    };
  }

  try {
    await addTeacher(validatedFields.data);
  } catch (error) {
    return { message: 'Error de base de datos: No se pudo crear el profesor.', data: rawFormData as TeacherState['data'] };
  }

  revalidatePath('/teachers');
  redirect(`/teachers?success_message=${encodeURIComponent('Profesor creado con éxito.')}`);
}
