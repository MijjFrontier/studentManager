'use client';

import type { Student, Level, Grade, Section } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
import { getGradesByLevel } from '@/lib/select-data';

export function StudentForm({ 
  student,
  levels,
  sections,
}: { 
  student?: Student | null,
  levels: Level[],
  sections: Section[],
}) {
  const initialState: State = { message: null, errors: {} };
  const action = student
    ? updateStudent.bind(null, student.id)
    : createStudent;
  const [state, dispatch] = useFormState(action, initialState);

  const defaultLevel = student?.level || state.data?.level || '';
  const [selectedLevel, setSelectedLevel] = useState(defaultLevel);
  const [availableGrades, setAvailableGrades] = useState<Grade[]>([]);

  useEffect(() => {
    if (defaultLevel) {
      setAvailableGrades(getGradesByLevel(defaultLevel));
    }
  }, [defaultLevel]);

  const handleLevelChange = (levelName: string) => {
    setSelectedLevel(levelName);
    setAvailableGrades(getGradesByLevel(levelName));
  };
  
  const formKey = student?.id || 'new';

  return (
    <form action={dispatch} key={formKey}>
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
                defaultValue={state.data?.name ?? student?.name}
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
                defaultValue={state.data?.email ?? student?.email}
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
              defaultValue={state.data?.phone ?? student?.phone}
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
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level">Nivel</Label>
              <Select name="level" defaultValue={state.data?.level ?? student?.level} onValueChange={handleLevelChange}>
                <SelectTrigger id="level" aria-describedby="level-error">
                  <SelectValue placeholder="Selecciona un nivel" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.id} value={level.name}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="level-error" aria-live="polite" aria-atomic="true">
                {state.errors?.level &&
                  state.errors.level.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grado</Label>
              <Select name="grade" defaultValue={state.data?.grade ?? student?.grade} disabled={!selectedLevel && !student?.level}>
                <SelectTrigger id="grade" aria-describedby="grade-error">
                  <SelectValue placeholder={!selectedLevel && !student?.level ? "Primero selecciona un nivel" : "Selecciona un grado"} />
                </SelectTrigger>
                <SelectContent>
                  {(availableGrades.length > 0 ? availableGrades : getGradesByLevel(student?.level || '')).map(grade => (
                    <SelectItem key={grade.id} value={grade.name}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="grade-error" aria-live="polite" aria-atomic="true">
                {state.errors?.grade &&
                  state.errors.grade.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Sección</Label>
              <Select name="section" defaultValue={state.data?.section ?? student?.section}>
                <SelectTrigger id="section" aria-describedby="section-error">
                  <SelectValue placeholder="Selecciona una sección" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(section => (
                    <SelectItem key={section.id} value={section.name}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="section-error" aria-live="polite" aria-atomic="true">
                {state.errors?.section &&
                  state.errors.section.map((error: string) => (
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
              defaultValue={state.data?.address ?? student?.address}
              rows={3}
              aria-describedby="address-error"
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
