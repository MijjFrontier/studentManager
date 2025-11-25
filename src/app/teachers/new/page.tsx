import { TeacherForm } from '@/components/teacher-form';
import { getCourses } from '@/lib/select-data';

export default async function NewTeacherPage() {
  const courses = await getCourses();
  return <TeacherForm courses={courses} />;
}
