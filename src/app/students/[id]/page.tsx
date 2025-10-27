import { getStudentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"

function DeleteButton({ id }: { id: string }) {
    const deleteStudentWithId = deleteStudent.bind(null, id);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form action={deleteStudentWithId}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        student and remove their data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
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

  return (
    <div className="w-full max-w-4xl mx-auto">
        <Card>
            <CardHeader className="flex flex-col items-center text-center space-y-4 p-6 sm:p-8">
                <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                    <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait"/>
                    <AvatarFallback className="text-3xl">
                        {student.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-3xl font-bold font-headline">{student.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                        <Badge variant="secondary">{student.studentId}</Badge>
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                        <div>
                            <p className="font-medium">Email</p>
                            <a href={`mailto:${student.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                {student.email}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">{student.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                        <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{student.address}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-6 border-t">
                <DeleteButton id={student.id} />
                <Button asChild>
                    <Link href={`/students/${student.id}/edit`} className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
