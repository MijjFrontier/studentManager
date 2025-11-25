import { getStudentById } from '@/lib/data';
import { StudentForm } from '@/components/student-form';
import { notFound } from 'next/navigation';
import { getLevels, getSections } from '@/lib/select-data';
import Image from 'next/image';

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

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-8">
        <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-primary/20">
          <Image
            src={student.avatarUrl || `https://picsum.photos/seed/${student.id}/200`}
            alt={`Avatar de ${student.name}`}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="person portrait"
          />
        </div>
        <div>
           <h1 className="text-4xl font-bold font-headline">{student.name}</h1>
           <p className="text-xl text-muted-foreground">{student.studentId}</p>
        </div>
      </div>
      <StudentForm 
        student={student} 
        levels={levels} 
        sections={sections} 
      />
    </div>
  );
}
