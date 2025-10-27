import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <div className="pt-4">
                <Skeleton className="h-10 w-full" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-1/4" />
      </div>
    </div>
  );
}
