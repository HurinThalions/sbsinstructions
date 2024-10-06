import Image from "next/image";
import clsx from "clsx";
import { Suspense } from "react";

import { KatalogSkeleton } from "./ui/skeletons";
import Katalog from "./ui/katalog";
import Suche from "@/app/ui/suche";

export default async function Start({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currenPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suche placeholder="Anleitungen durchsuchen"/>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<KatalogSkeleton />}>
          <Katalog />
        </Suspense>
      </div>
    </main>
  );
}
