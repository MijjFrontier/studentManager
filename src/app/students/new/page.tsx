
import { StudentForm } from '@/components/student-form';
import { getLevels, getSections } from '@/lib/select-data';

export default async function NewStudentPage() {
  const [levels, sections] = await Promise.all([
    getLevels(),
    getSections(),
  ]);

  return <StudentForm 
    levels={levels} 
    sections={sections} 
  />;
}
