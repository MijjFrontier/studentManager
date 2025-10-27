'use client';

import type { Student } from '@/lib/types';
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

export function StudentForm({ student }: { student?: Student | null }) {
  const initialState: State = { message: null, errors: {} };
  const action = student
    ? updateStudent.bind(null, student.id)
    : createStudent;
  const [state, dispatch] = useFormState(action, initialState);

  return (
    <form action={dispatch}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{student ? 'Edit Student' : 'Register New Student'}</CardTitle>
          <CardDescription>
            {student ? 'Update the details for this student.' : 'Fill in the details for the new student.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Jane Doe"
              defaultValue={student?.name}
              aria-describedby="name-error"
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
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. jane.doe@example.com"
              defaultValue={student?.email}
              aria-describedby="email-error"
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
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="e.g. (555) 555-5555"
              defaultValue={student?.phone}
              aria-describedby="phone-error"
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
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="e.g. 123 Main St, Anytown, USA"
              defaultValue={student?.address}
              aria-describedby="address-error"
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
            <Link href={student ? `/students/${student.id}` : '/'}>Cancel</Link>
          </Button>
          <SubmitButton text={student ? 'Update Student' : 'Create Student'} />
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
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
