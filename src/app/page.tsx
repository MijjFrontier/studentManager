
'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { AdminLoginForm } from '@/components/admin-login-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

type User = (Teacher | Student) & { type: 'teacher' | 'student' };

export default function LoginPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Por favor, selecciona un usuario.');
      return;
    }
    const [type, id] = selectedUser.split('-');
    
    const user = users.find(u => u.id === id && u.type === type);
    
    if (!user) {
        alert('Usuario no encontrado.');
        return;
    }

    // TODO: Add actual password validation here later.
    // For now, we simulate login.

    if (type === 'student') {
      router.push(`/students/${id}`);
    } else if (type === 'teacher') {
      router.push(`/teachers/${id}`);
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
            <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Ingresar como Administrador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Acceso de Administrador</DialogTitle>
                  <DialogDescription>
                    Ingresa la contraseña de administrador para continuar.
                  </DialogDescription>
                </DialogHeader>
                <AdminLoginForm
                  onSuccess={() => {
                    setIsAdminDialogOpen(false);
                    router.push('/dashboard');
                  }}
                />
              </DialogContent>
            </Dialog>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-xs text-muted-foreground uppercase">
                O inicia sesión como usuario
              </span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleUserLogin} className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="user">Usuario (Profesor o Estudiante)</Label>
                 <Select onValueChange={setSelectedUser} value={selectedUser} disabled={loading || users.length === 0}>
                  <SelectTrigger id="user">
                    <SelectValue placeholder={loading ? "Cargando usuarios..." : "Selecciona tu usuario"} />
                  </SelectTrigger>
                  <SelectContent>
                    {users.length > 0 ? (
                        users.map(user => (
                            <SelectItem key={`${user.type}-${user.id}`} value={`${user.type}-${user.id}`}>
                                {user.name} ({user.type === 'teacher' ? 'Profesor' : 'Estudiante'})
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="no-users" disabled>No hay usuarios registrados</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={!selectedUser}>
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
