'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addStudent,
  updateStudent as updateStudentData,
  deleteStudentById,
} from '@/lib/data';
import type { Student } from './types';

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
