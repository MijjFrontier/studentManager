'use client';

import type { Student, Campus, StudyProgram, AcademicPeriod } from '@/lib/types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createStudent, updateStudent, type State } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export function StudentForm({ 
  student,
  campuses,
  studyPrograms,
  academicPeriods
}: { 
  student?: Student | null,
  campuses: Campus[],
  studyPrograms: StudyProgram[],
  academicPeriods: AcademicPeriod[]
}) {
  const initialState: State = { message: null, errors: {} };
  const action = student
    ? updateStudent.bind(null, student.id)
    : createStudent;
  const [state, dispatch] = useActionState(action, initialState);

  return (
    <form action={dispatch} key={student?.id || 'new'}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{student ? 'Editar Estudiante' : 'Registrar Nuevo Estudiante'}</CardTitle>
          <CardDescription>
            {student ? 'Actualiza los detalles de este estudiante.' : 'Completa los detalles para el nuevo estudiante.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="p. ej. Pepe Ramirez"
                defaultValue={student?.name}
                aria-describedby="name-error"
              />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="p. ej. pepe@gmail.com"
                defaultValue={student?.email}
                aria-describedby="email-error"
              />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="p. ej. 987654321"
              defaultValue={student?.phone}
              aria-describedby="phone-error"
            />
             <div id="phone-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phone &&
                state.errors.phone.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="studyProgram">Programa de estudios</Label>
             <Select name="studyProgram" defaultValue={student?.studyProgram}>
              <SelectTrigger id="studyProgram" aria-describedby="studyProgram-error">
                <SelectValue placeholder="Selecciona un programa" />
              </SelectTrigger>
              <SelectContent>
                {studyPrograms.map(program => (
                  <SelectItem key={program.id} value={program.name}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             <div id="studyProgram-error" aria-live="polite" aria-atomic="true">
              {state.errors?.studyProgram &&
                state.errors.studyProgram.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="campus">Campus</Label>
              <Select name="campus" defaultValue={student?.campus}>
                <SelectTrigger id="campus" aria-describedby="campus-error">
                  <SelectValue placeholder="Selecciona un campus" />
                </SelectTrigger>
                <SelectContent>
                  {campuses.map(campus => (
                    <SelectItem key={campus.id} value={campus.name}>
                      {campus.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="campus-error" aria-live="polite" aria-atomic="true">
                {state.errors?.campus &&
                  state.errors.campus.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicPeriod">Periodo académico</Label>
              <Select name="academicPeriod" defaultValue={student?.academicPeriod}>
                <SelectTrigger id="academicPeriod" aria-describedby="academicPeriod-error">
                  <SelectValue placeholder="Selecciona un periodo" />
                </SelectTrigger>
                <SelectContent>
                  {academicPeriods.map(period => (
                    <SelectItem key={period.id} value={period.name}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="academicPeriod-error" aria-live="polite" aria-atomic="true">
                {state.errors?.academicPeriod &&
                  state.errors.academicPeriod.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección (Opcional)</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="p. ej. Av. Arequipa 1499, Lince"
              defaultValue={student?.address}
              rows={3}
            />
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
            <Link href={student ? `/students/${student.id}` : '/'}>Cancelar</Link>
          </Button>
          <SubmitButton text={student ? 'Actualizar Estudiante' : 'Crear Estudiante'} />
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
