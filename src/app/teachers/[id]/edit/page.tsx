
import { getTeacherById } from '@/lib/data';
import { TeacherForm } from '@/components/teacher-form';
import { notFound } from 'next/navigation';
import { getCourses } from '@/lib/select-data';

export default async function EditTeacherPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [teacher, courses] = await Promise.all([
    getTeacherById(id),
    getCourses(),
  ]);

  if (!teacher) {
    notFound();
  }

  return <TeacherForm teacher={teacher} courses={courses} />;
}
