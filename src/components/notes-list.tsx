import { getNotesByStudentId } from '@/lib/data';
import type { Note } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

function getScoreBadgeVariant(score: number): 'destructive' | 'secondary' | 'default' {
    if (score < 11) return 'destructive';
    if (score < 14) return 'secondary';
    return 'default';
}

export default async function NotesList({ studentId }: { studentId: string }) {
    const notes = await getNotesByStudentId(studentId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Calificaciones</CardTitle>
                <CardDescription>
                    Un historial de las notas registradas para este estudiante.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {notes.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        <p className="font-semibold">No hay notas registradas.</p>
                        <p>Añade una nueva nota para empezar.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Materia</TableHead>
                                <TableHead className="text-center">Nota</TableHead>
                                <TableHead className="text-right">Fecha</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notes.map((note) => (
                                <TableRow key={note.id}>
                                    <TableCell className="font-medium">{note.course}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={getScoreBadgeVariant(note.score)}>
                                            {note.score}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">
                                        {format(new Date(note.date), "d 'de' MMMM, yyyy", { locale: es })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
