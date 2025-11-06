import { getStudentById } from '@/lib/data';
import { StudentForm } from '@/components/student-form';
import { notFound } from 'next/navigation';
import { getLevels, getSections } from '@/lib/select-data';

export default async function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [student, levels, sections] = await Promise.all([
    getStudentById(id),
    getLevels(),
    getSections(),
  ]);

  if (!student) {
    notFound();
  }

  return <StudentForm 
    student={student} 
    levels={levels} 
    sections={sections} 
  />;
}
