import Image from "next/image";
import clsx from "clsx";
import { Suspense } from "react";

import { KatalogSkeleton } from "./ui/skeletons";
import Katalog from "./ui/katalog";

export default function Start() {
  return (
    <main>
      <div className="mb-4 text-xl md:text-2xl">Suchleiste</div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<KatalogSkeleton />}>
          <Katalog />
        </Suspense>
      </div>
    </main>
  );
}
