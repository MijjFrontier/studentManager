import { getStudentById } from '@/lib/data';
import { StudentForm } from '@/components/student-form';
import { notFound } from 'next/navigation';
import { getCampuses, getStudyPrograms, getAcademicPeriods } from '@/lib/select-data';

export default async function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [student, campuses, studyPrograms, academicPeriods] = await Promise.all([
    getStudentById(id),
    getCampuses(),
    getStudyPrograms(),
    getAcademicPeriods()
  ]);

  if (!student) {
    notFound();
  }

  return <StudentForm 
    student={student} 
    campuses={campuses} 
    studyPrograms={studyPrograms} 
    academicPeriods={academicPeriods} 
  />;
}
