
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
import { useToast } from '@/hooks/use-toast';

type User = (Teacher | Student) & { type: 'teacher' | 'student' };

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Campos incompletos',
        description: 'Por favor, introduce tu correo y contraseña.',
      });
      return;
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description: 'El correo electrónico o la contraseña son incorrectos.',
      });
      return;
    }
    
    // TODO: Add actual password validation here later.
    // For now, we just check if the user exists and a password was entered.

    if (user.type === 'student') {
      router.push(`/students/${user.id}`);
    } else if (user.type === 'teacher') {
      router.push(`/teachers/${user.id}`);
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
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !email || !password}>
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
