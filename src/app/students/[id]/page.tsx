'use client';

import { getStudentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Mail, Phone, MapPin, Trash2, Book, Building, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { deleteStudent, type State } from '@/lib/actions';
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
} from "@/components/ui/alert-dialog";
import type { Student } from '@/lib/types';
import { useEffect, useState, useActionState } from 'react';

function DeleteButton({ id }: { id: string }) {
    const [state, action] = useActionState(deleteStudent.bind(null, id), { message: null });

    useEffect(() => {
        if (state?.message) {
            // Handle error, maybe show a toast
            console.error(state.message);
        }
    }, [state]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form action={action}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutely seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente a este
                        estudiante y eliminará sus datos de nuestros servidores.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction type="submit">Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [student, setStudent] = useState<Student | null>(null);
  
  useEffect(() => {
    getStudentById(params.id).then(data => {
      if (!data) {
        notFound();
      } else {
        setStudent(data);
      }
    });
  }, [params.id]);


  if (!student) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card>
                <CardHeader className="flex flex-col items-center text-center space-y-4 p-6 sm:p-8">
                    <div>
                        <div className="animate-pulse h-8 w-48 bg-muted rounded-md"></div>
                         <div className="animate-pulse h-6 w-24 bg-muted rounded-md mt-2"></div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="animate-pulse h-5 w-5 bg-muted rounded"></div>
                            <div>
                                 <div className="animate-pulse h-5 w-32 bg-muted rounded-md"></div>
                                 <div className="animate-pulse h-5 w-48 bg-muted rounded-md mt-1"></div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="animate-pulse h-5 w-5 bg-muted rounded"></div>
                            <div>
                                <div className="animate-pulse h-5 w-24 bg-muted rounded-md"></div>
                                <div className="animate-pulse h-5 w-36 bg-muted rounded-md mt-1"></div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="animate-pulse h-5 w-5 bg-muted rounded"></div>
                            <div>
                                 <div className="animate-pulse h-5 w-24 bg-muted rounded-md"></div>
                                 <div className="animate-pulse h-5 w-56 bg-muted rounded-md mt-1"></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-6 border-t">
                     <div className="animate-pulse h-10 w-24 bg-muted rounded-md"></div>
                     <div className="animate-pulse h-10 w-24 bg-muted rounded-md"></div>
                </CardFooter>
            </Card>
        </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
        <Card>
            <CardHeader className="flex flex-col items-center text-center space-y-4 p-6 sm:p-8">
                <div>
                    <CardTitle className="text-3xl font-bold font-headline">{student.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                        <Badge variant="secondary">{student.studentId}</Badge>
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 border-t">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información Académica</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Book className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium">Programa de estudios</p>
                                    <p className="text-muted-foreground">{student.studyProgram}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Building className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium">Campus</p>
                                    <p className="text-muted-foreground">{student.campus}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium">Periodo académico</p>
                                    <p className="text-muted-foreground">{student.academicPeriod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Mail className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium">Correo Electrónico</p>
                                    <a href={`mailto:${student.email}`} className="text-muted-foreground hover:text-primary transition-colors">
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
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium">Dirección</p>
                                    <p className="text-muted-foreground">{student.address}</p>
                                </div>
                            </div>
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
    </div>
  );
}
