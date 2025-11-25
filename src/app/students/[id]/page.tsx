'use server';

import { getStudentById, getNotesByStudentId } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Users,
  GraduationCap,
  Home,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { deleteStudent } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Student } from '@/lib/types';
import NotesList from '@/components/notes-list';
import Image from 'next/image';

function DeleteButton({ id }: { id: string }) {
  const deleteStudentWithId = deleteStudent.bind(null, id);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteStudentWithId}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente a
              este estudiante y eliminará sus datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button type="submit">Continuar</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function StudentProfile({ student }: { student: Student }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/20 shrink-0">
               <Image
                  src={student.avatarUrl || `https://picsum.photos/seed/${student.id}/200`}
                  alt={`Avatar de ${student.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint="person portrait"
                />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-bold font-headline">
                {student.name}
              </CardTitle>
              <p className="text-muted-foreground">
                <Badge variant="secondary">{student.studentId}</Badge>
              </p>
            </div>
          </div>
           <div className="flex items-center gap-2 self-start sm:self-center">
             <Button asChild>
              <Link href={`/students/${student.id}/notes/new`} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Añadir Nota
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 border-t">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Información Académica
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Users className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Nivel</p>
                    <p className="text-muted-foreground">
                      {student.level}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Grado</p>
                    <p className="text-muted-foreground">{student.grade}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Home className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Sección</p>
                    <p className="text-muted-foreground">
                      {student.section}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Correo Electrónico</p>
                    <a
                      href={`mailto:${student.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {student.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-muted-foreground">{student.phone}</p>
                  </div>
                </div>
                {student.address && (
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground">{student.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-6 border-t">
          <DeleteButton id={student.id} />
          <Button asChild>
            <Link href={`/students/${student.id}/edit`} className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <NotesList studentId={student.id} />
    </div>
  );
}

export default async function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudentById(params.id);

  if (!student) {
    notFound();
  }

  return <StudentProfile student={student} />;
}
