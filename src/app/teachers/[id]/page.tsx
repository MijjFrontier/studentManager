'use server';

import { getTeacherById, getStudents } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Home,
  Book,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Teacher, Student } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


async function TeacherDashboard({ teacher }: { teacher: Teacher }) {
  const studentsInClass = await getStudents({ 
    level: teacher.level, 
    grade: teacher.grade,
    section: teacher.section,
   });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Bienvenido, Profesor {teacher.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          Este es el panel de control de tu aula.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Nivel:</span>
                <Badge variant="secondary">{teacher.level}</Badge>
            </div>
            <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <span>Grado:</span>
                <Badge variant="secondary">{teacher.grade}</Badge>
            </div>
             <div className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span>Sección:</span>
                <Badge variant="secondary">{teacher.section}</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Materias que enseñas: {teacher.courses.join(', ')}
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Alumnos en tu Aula</CardTitle>
            <CardDescription>
                Esta es la lista de estudiantes asignados a tu clase. Puedes añadirles notas en las materias que enseñas.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {studentsInClass.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                    <p className="font-semibold">No hay alumnos en esta aula.</p>
                    <p>El administrador necesita asignar estudiantes a esta sección.</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Estudiante</TableHead>
                            <TableHead>ID de Estudiante</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentsInClass.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium flex items-center gap-3">
                                   <Avatar>
                                    <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {student.name}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{student.studentId}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild size="sm">
                                        <Link href={`/teachers/${teacher.id}/grade/${student.id}`}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Añadir Nota
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>

    </div>
  );
}

export default async function TeacherProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = await getTeacherById(params.id);

  if (!teacher) {
    notFound();
  }

  return <TeacherDashboard teacher={teacher} />;
}
