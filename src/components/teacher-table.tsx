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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
