
import { TeacherForm } from '@/components/teacher-form';
import { getCourses, getLevels, getSections } from '@/lib/select-data';

export default async function NewTeacherPage() {
  const [courses, levels, sections] = await Promise.all([
    getCourses(),
    getLevels(),
    getSections(),
  ]);
  return <TeacherForm courses={courses} levels={levels} sections={sections} />;
}
