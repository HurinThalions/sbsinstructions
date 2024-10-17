import { Suspense } from "react";

import { KatalogSkeleton } from "./ui/skeletons";
import Suche from "@/app/ui/suche";
import KatalogServer from "./ui/katalog-server";


export default async function Start({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main >
      <div className="w-full items-center justify-between">
<<<<<<< HEAD
        <div className="mt-10 flex items-center justify-between gap-2 md:mt-8 m-10">
          <Suche placeholder="Anleitungen durchsuchen"/>
        </div>
        <div className="w-full items-center justify-between">
          <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
            <KatalogServer query={query} currentPage={currentPage}></KatalogServer>
          </Suspense>
        </div>
=======
      <div className="mt-10 flex items-center justify-between gap-2 md:mt-8 m-10">
        <Suche placeholder="Anleitungen durchsuchen"/>
      </div>
      <div className="w-full items-center justify-between">
        <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
          <KatalogServer query={query} currentPage={currentPage}></KatalogServer>
        </Suspense>
      </div>
>>>>>>> parent of 60159c7 (anpassung middleware)
      </div>
    </main>
  );
}
