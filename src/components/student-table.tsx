import { getStudents } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteStudent } from '@/lib/actions';
import { Badge } from './ui/badge';
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
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function DeleteAction({ id }: { id: string }) {
  const deleteStudentWithId = deleteStudent.bind(null, id);
  return (
    <AlertDialog>
       <AlertDialogTrigger asChild>
        <button
          type="button"
          className="w-full text-left relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteStudentWithId}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente a este estudiante.
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

export default async function StudentTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await getStudents({ query, page: currentPage });

  if (students.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="text-lg font-semibold">No se encontraron estudiantes.</p>
        <p>Intenta ajustar tu búsqueda o agregar un nuevo estudiante.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>ID de Estudiante</TableHead>
            <TableHead className="hidden md:table-cell">Correo Electrónico</TableHead>
            <TableHead className="w-[50px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <Link href={`/students/${student.id}`} className="hover:underline flex items-center gap-3">
                   <Avatar>
                    <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {student.name}
                </Link>
              </TableCell>
              <TableCell>
                 <Badge variant="secondary">{student.studentId}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {student.email}
              </TableCell>
              <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Más acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/students/${student.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DeleteAction id={student.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
