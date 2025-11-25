'use client';

import type { Student, Course, Teacher } from '@/lib/types';
import { useActionState, useTransition } from 'react';
import { createNote, type NoteState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormStatus } from 'react-dom';

export function NoteForm({
    student,
    courses,
    teacher,
}: {
    student: Student;
    courses: Course[];
    teacher?: Teacher | null; // teacher is optional
}) {
    const initialState: NoteState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(createNote, initialState);

    const availableCourses = teacher ? courses.filter(c => teacher.courses.includes(c.name)) : courses;

    return (
        <form action={dispatch}>
            <input type="hidden" name="studentId" value={student.id} />
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Registrar Nota para {student.name}</CardTitle>
                    <CardDescription>
                        Selecciona la materia e introduce la calificación.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="course">Materia</Label>
                        <Select name="course" defaultValue="">
                            <SelectTrigger id="course" aria-describedby="course-error">
                                <SelectValue placeholder="Selecciona una materia" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableCourses.map(course => (
                                    <SelectItem key={course.id} value={course.name}>
                                        {course.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div id="course-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.course &&
                                state.errors.course.map((error: string) => (
                                    <p className="mt-2 text-sm text-destructive" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="score">Nota (0-20)</Label>
                        <Input
                            id="score"
                            name="score"
                            type="number"
                            placeholder="p. ej. 15"
                            min="0"
                            max="20"
                            aria-describedby="score-error"
                        />
                        <div id="score-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.score &&
                                state.errors.score.map((error: string) => (
                                    <p className="mt-2 text-sm text-destructive" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                     {state.message && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href={`/students/${student.id}`}>Cancelar</Link>
                    </Button>
                    <SubmitButton text="Guardar Nota" />
                </CardFooter>
            </Card>
        </form>
    );
}

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Procesando...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
