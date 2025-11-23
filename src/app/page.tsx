'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Shield, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Teacher, Student } from '@/lib/types';
import { getAllUsers } from '@/lib/data';

type User = (Teacher | Student) & { type: 'teacher' | 'student' };

export default function LoginPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
  }, []);

  const handleAdminLogin = () => {
    router.push('/dashboard');
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
        alert("Por favor, selecciona un usuario.");
        return;
    }
    const [type, id] = selectedUser.split('-');
    
    if (type === 'student') {
      router.push(`/students/${id}`);
    } else if (type === 'teacher') {
      // TODO: Implement teacher dashboard
      alert('La vista de profesor aún no está implementada.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/80">
      <div className="w-full max-w-md mx-auto text-center">
        <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-primary">
                Gestor Escolar
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
                Optimiza la gestión de tu institución educativa.
            </p>
        </header>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
            <CardDescription>
              Ingresa para gestionar la información.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleAdminLogin}
            >
              <Shield className="mr-2 h-4 w-4" />
              Ingresar como Administrador
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-xs text-muted-foreground uppercase">
                O inicia sesión
              </span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleUserLogin} className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="user">Usuario (Profesor o Estudiante)</Label>
                <Select onValueChange={setSelectedUser} value={selectedUser}>
                  <SelectTrigger id="user">
                    <SelectValue placeholder="Selecciona tu usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={`${user.type}-${user.id}`} value={`${user.type}-${user.id}`}>
                        {user.name} ({user.type === 'teacher' ? 'Profesor' : 'Estudiante'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="pin">PIN o Contraseña</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="****"
                  defaultValue="1234" 
                />
                 <p className="text-xs text-muted-foreground pt-1">
                    Para esta demo, cualquier contraseña es válida.
                </p>
              </div>
               <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Ingresar
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
