import { getTotalTeacherPages } from '@/lib/data';
import TeacherTable from '@/components/teacher-table';
import { Search } from '@/components/search';
import { Pagination } from '@/components/pagination';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-1/4" />
      </div>
    </div>
  );
}

export default async function TeachersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTotalTeacherPages(query);

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Lista de Profesores</CardTitle>
           <Button asChild className="gap-2">
            <Link href="/teachers/new">
              <UserPlus />
              <span className="hidden sm:inline">Añadir Profesor</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
           <div className="pb-4">
            <Search placeholder="Buscar profesores por nombre o email..." />
          </div>
          <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
            <TeacherTable query={query} currentPage={currentPage} />
          </Suspense>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
