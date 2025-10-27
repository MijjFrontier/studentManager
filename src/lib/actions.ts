'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addStudent,
  updateStudent as updateStudentData,
  deleteStudentById,
} from '@/lib/data';

const StudentFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
  phone: z.string().min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos.' }),
  address: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
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
};

export async function createStudent(prevState: State, formData: FormData) {
  const validatedFields = StudentFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    studyProgram: formData.get('studyProgram'),
    campus: formData.get('campus'),
    academicPeriod: formData.get('academicPeriod'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear el estudiante. Por favor, comprueba los campos.',
    };
  }

  try {
    await addStudent(validatedFields.data);
  } catch (error) {
    return { message: 'Error de base de datos: No se pudo crear el estudiante.' };
  }

  revalidatePath('/');
  redirect('/');
}

export async function updateStudent(id: string, prevState: State, formData: FormData) {
  const validatedFields = StudentFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    studyProgram: formData.get('studyProgram'),
    campus: formData.get('campus'),
    academicPeriod: formData.get('academicPeriod'),
  });

   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al actualizar el estudiante. Por favor, comprueba los campos.',
    };
  }

  try {
    await updateStudentData(id, validatedFields.data);
  } catch (e) {
    return { message: 'Error de base de datos: No se pudo actualizar el estudiante.' };
  }

  revalidatePath('/');
  revalidatePath(`/students/${id}`);
  redirect(`/students/${id}`);
}

export async function deleteStudent(id: string) {
  try {
    await deleteStudentById(id);
    revalidatePath('/');
    redirect('/');
  } catch (e) {
    return { message: 'Error de base de datos: No se pudo eliminar el estudiante.' };
  }
}
