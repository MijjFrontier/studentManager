import { StudentForm } from '@/components/student-form';
import { getCampuses, getStudyPrograms, getAcademicPeriods } from '@/lib/select-data';

export default async function NewStudentPage() {
  const [campuses, studyPrograms, academicPeriods] = await Promise.all([
    getCampuses(),
    getStudyPrograms(),
    getAcademicPeriods()
  ]);

  return <StudentForm 
    campuses={campuses} 
    studyPrograms={studyPrograms} 
    academicPeriods={academicPeriods} 
  />;
}
