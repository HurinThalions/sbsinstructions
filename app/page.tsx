import { Suspense } from 'react';
import { KatalogSkeleton } from './ui/skeletons';
import Suche from '@/app/ui/suche';
import KatalogServer from './ui/katalog-server';

export default async function StartPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <div className="w-full items-center justify-between">
        <div className="mt-10 flex items-center justify-between gap-2 md:mt-8 m-10">
          <Suche placeholder='Anleitungen durchsuchen' />
        </div>
        <div className="w-full items-center justify-between p-2">
          <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
            <KatalogServer query={query} currentPage={currentPage} />
          </Suspense>
          {/* Erklärung Anleitung */}

        </div>
      </div>
    </main>
  );
}