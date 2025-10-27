'use client';

import type { Student } from '@/lib/types';
import { useActionState, useRef } from 'react';
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

export function StudentForm({ student }: { student?: Student | null }) {
  const initialState: State = { message: null, errors: {} };
  const action = student
    ? updateStudent.bind(null, student.id)
    : createStudent;
  const [state, dispatch] = useActionState(action, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={dispatch}>
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
                key={`name-${student?.id}`}
                required
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
                key={`email-${student?.id}`}
                required
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
              key={`phone-${student?.id}`}
              required
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
            <Input
              id="studyProgram"
              name="studyProgram"
              placeholder="p. ej. Desarrollo de Sistemas Front-end y Back-end"
              defaultValue={student?.studyProgram}
              aria-describedby="studyProgram-error"
              key={`studyProgram-${student?.id}`}
              required
            />
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
              <Input
                id="campus"
                name="campus"
                placeholder="p. ej. Sede Virtual 100%"
                defaultValue={student?.campus}
                aria-describedby="campus-error"
                key={`campus-${student?.id}`}
                required
              />
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
              <Input
                id="academicPeriod"
                name="academicPeriod"
                placeholder="p. ej. Quinto Periodo Académico"
                defaultValue={student?.academicPeriod}
                aria-describedby="academicPeriod-error"
                key={`academicPeriod-${student?.id}`}
                required
              />
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
            <Label htmlFor="address">Dirección</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="p. ej. Av. Arequipa 1499, Lince"
              defaultValue={student?.address}
              aria-describedby="address-error"
              key={`address-${student?.id}`}
              required
              rows={3}
            />
             <div id="address-error" aria-live="polite" aria-atomic="true">
              {state.errors?.address &&
                state.errors.address.map((error: string) => (
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
