
import { getTeachers } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteTeacher } from '@/lib/actions';
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

function DeleteAction({ id }: { id: string }) {
  const deleteTeacherWithId = deleteTeacher.bind(null, id);
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
        <form action={deleteTeacherWithId}>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente a este profesor.
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


export default async function TeacherTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const teachers = await getTeachers({ query, page: currentPage });

  if (teachers.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="text-lg font-semibold">No se encontraron profesores.</p>
        <p>Intenta ajustar tu búsqueda o agregar un nuevo profesor.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>ID de Profesor</TableHead>
            <TableHead className="hidden md:table-cell">Correo Electrónico</TableHead>
            <TableHead className="w-[50px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell className="font-medium">
                {teacher.name}
              </TableCell>
              <TableCell>
                 <Badge variant="secondary">{teacher.teacherId}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {teacher.email}
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
                        <Link href={`/teachers/${teacher.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DeleteAction id={teacher.id} />
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
