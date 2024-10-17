import { Suspense } from "react";

import { KatalogSkeleton } from "./ui/skeletons";
import Suche from "@/app/ui/suche";
import KatalogServer from "./ui/katalog-server";
import { signOut } from "./auth";


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
      <div className="mt-10 flex items-center justify-between gap-2 md:mt-8 m-10">
          <Suche placeholder="Anleitungen durchsuchen"/>
        </div>
        <div className="w-full items-center justify-between">
          <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
            <KatalogServer query={query} currentPage={currentPage}></KatalogServer>
          </Suspense>
        </div>
        <div className="hidden rounded-md md:block">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
        </div>
      </div>
    </main>
  );
}
