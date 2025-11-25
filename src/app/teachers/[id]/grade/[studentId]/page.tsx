
'use server';

import { getStudentById, getTeacherById } from '@/lib/data';
import { getCourses } from '@/lib/select-data';
import { notFound } from 'next/navigation';
import { NoteForm } from '@/components/note-form';

export default async function GradeStudentPage({
  params,
}: {
  params: { id: string, studentId: string };
}) {
  const { id: teacherId, studentId } = params;

  const [student, teacher, allCourses] = await Promise.all([
    getStudentById(studentId),
    getTeacherById(teacherId),
    getCourses(),
  ]);

  if (!student || !teacher) {
    notFound();
  }

  // Filter courses to only those the teacher teaches.
  const teacherCourses = allCourses.filter(course => teacher.courses.includes(course.name));

  return <NoteForm student={student} courses={teacherCourses} teacher={teacher} />;
}
