
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
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number seems too short.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
  };
  message?: string | null;
};

export async function createStudent(prevState: State, formData: FormData) {
  const validatedFields = StudentFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create student. Please check the fields.',
    };
  }

  try {
    await addStudent(validatedFields.data);
  } catch (error) {
    return { message: 'Database Error: Failed to Create Student.' };
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
  });

   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update student. Please check the fields.',
    };
  }

  try {
    await updateStudentData(id, validatedFields.data);
  } catch (e) {
    return { message: 'Database Error: Failed to Update Student.' };
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
    return { message: 'Database Error: Failed to Delete Student.' };
  }
}
