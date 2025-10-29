'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addStudent,
  updateStudent as updateStudentData,
  deleteStudentById,
} from '@/lib/data';
import { cookies } from 'next/headers';

const StudentFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
  phone: z.string().regex(/^\d{9}$/, { message: 'El número de teléfono debe tener 9 dígitos.' }),
  address: z.string().optional(),
  studyProgram: z.string().min(2, { message: 'El programa de estudios es requerido.' }),
  campus: z.string().min(2, { message: 'El campus es requerido.' }),
  academicPeriod: z.string().min(2, { message: 'El periodo académico es requerido.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    studyProgram?: string[];
    campus?: string[];
    academicPeriod?: string[];
  };
  message?: string | null;
  success?: boolean;
  redirectPath?: string;
};

export async function createStudent(prevState: State, formData: FormData) {
  const validatedFields = StudentFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear el estudiante. Por favor, comprueba los campos.',
      success: false,
    };
  }
  
  const dataToSave = {
    ...validatedFields.data,
    address: validatedFields.data.address || '',
  };

  try {
    await addStudent(dataToSave);
  } catch (error) {
    return { message: 'Error de base de datos: No se pudo crear el estudiante.', success: false };
  }

  revalidatePath('/');
  redirect(`/?success_message=${encodeURIComponent('Estudiante creado con éxito.')}`);
}

export async function updateStudent(id: string, prevState: State, formData: FormData) {
  const validatedFields = StudentFormSchema.safeParse(Object.fromEntries(formData.entries()));

   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al actualizar el estudiante. Por favor, comprueba los campos.',
      success: false,
    };
  }
  
  const dataToSave = {
    ...validatedFields.data,
    address: validatedFields.data.address || '',
  };

  try {
    await updateStudentData(id, dataToSave);
  } catch (e) {
    return { message: 'Error de base de datos: No se pudo actualizar el estudiante.', success: false };
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
