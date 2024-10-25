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
        <div className="w-full items-center justify-between p-2 group">
          <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
            <KatalogServer query={query} currentPage={currentPage} />
          </Suspense>
          {/* Erklärung Anleitung */}
          <p className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Auf die Anleitung klicken, um die Anleitung zu öffnen
            </p>
        </div>
      </div>
    </main>
  );
}