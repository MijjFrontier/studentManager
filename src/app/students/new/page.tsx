import { StudentForm } from '@/components/student-form';
import { getLevels, getSections, getAllGrades } from '@/lib/select-data';

export default async function NewStudentPage() {
  const [levels, sections, allGrades] = await Promise.all([
    getLevels(),
    getSections(),
    getAllGrades(),
  ]);

  return <StudentForm 
    levels={levels} 
    sections={sections} 
  />;
}
