import Link from 'next/link';
import { GraduationCap, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-headline">
              Java Student Manager
            </span>
          </Link>
          <Button asChild className="gap-2">
            <Link href="/students/new">
              <UserPlus />
              <span className="hidden sm:inline">Add Student</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
