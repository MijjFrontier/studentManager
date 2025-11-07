import { getStudentById } from '@/lib/data';
import { getCourses } from '@/lib/select-data';
import { notFound } from 'next/navigation';
import { NoteForm } from '@/components/note-form';

export default async function NewNotePage({
  params,
}: {
  params: { id: string };
}) {
  const studentId = params.id;
  const [student, courses] = await Promise.all([
    getStudentById(studentId),
    getCourses(),
  ]);

  if (!student) {
    notFound();
  }

  return <NoteForm student={student} courses={courses} />;
}
