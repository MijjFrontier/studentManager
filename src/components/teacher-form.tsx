
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createTeacher, type TeacherState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { Teacher, Course } from '@/lib/types';
import { Checkbox } from './ui/checkbox';


export function TeacherForm({ 
  teacher,
  courses,
}: { 
  teacher?: Teacher | null,
  courses: Course[],
}) {
  const initialState: TeacherState = { message: null, errors: {} };
  const action = createTeacher; // For now, only create
  const [state, dispatch] = useActionState(action, initialState);

  const formKey = teacher?.id || 'new';

  return (
    <form action={dispatch} key={formKey}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{teacher ? 'Editar Profesor' : 'Registrar Nuevo Profesor'}</CardTitle>
          <CardDescription>
            {teacher ? 'Actualiza los detalles de este profesor.' : 'Completa los detalles para el nuevo profesor.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="p. ej. Juan Pérez"
                defaultValue={state.data?.name ?? teacher?.name}
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
                placeholder="p. ej. juan.perez@colegio.edu"
                defaultValue={state.data?.email ?? teacher?.email}
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

          {!teacher && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  aria-describedby="password-error"
                />
                <div id="password-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.password &&
                    state.errors.password.map((error: string) => (
                      <p className="mt-2 text-sm text-destructive" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Vuelve a escribir la contraseña"
                  aria-describedby="confirmPassword-error"
                />
                <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.confirmPassword &&
                    state.errors.confirmPassword.map((error: string) => (
                      <p className="mt-2 text-sm text-destructive" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="p. ej. 987654321"
              defaultValue={state.data?.phone ?? teacher?.phone}
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

          <div className="space-y-4">
            <Label>Materias que enseña</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border p-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center gap-2">
                  <Checkbox 
                    id={`course-${course.id}`} 
                    name="courses" 
                    value={course.name}
                    defaultChecked={(state.data?.courses ?? teacher?.courses ?? []).includes(course.name)}
                  />
                  <Label htmlFor={`course-${course.id}`} className="font-normal">
                    {course.name}
                  </Label>
                </div>
              ))}
            </div>
            <div id="courses-error" aria-live="polite" aria-atomic="true">
              {state.errors?.courses &&
                state.errors.courses.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          
          {state.message && !state.errors && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href={teacher ? `/teachers` : '/teachers'}>Cancelar</Link>
          </Button>
          <SubmitButton text={teacher ? 'Actualizar Profesor' : 'Crear Profesor'} />
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
