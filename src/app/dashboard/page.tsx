import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, User } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Selecciona una opción para empezar a gestionar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span>Gestionar Estudiantes</span>
            </CardTitle>
            <CardDescription>
              Añade, edita, elimina y visualiza los perfiles de los estudiantes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/students">Ir a Estudiantes</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <span>Gestionar Profesores</span>
            </CardTitle>
            <CardDescription>
              Añade, edita y visualiza los perfiles de los profesores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/teachers">Ir a Profesores</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
