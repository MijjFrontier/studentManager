import { getStudentById } from '@/lib/data';
import { StudentForm } from '@/components/student-form';
import { notFound } from 'next/navigation';

export default async function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return <StudentForm student={student} />;
}
