import { Suspense } from "react";

import { AnleitungSkeleton } from "@/app/ui/skeletons";
import Overview from "@/app/ui/anleitungen/overview";

export default function AnleitungPage({
  params,
}: {
  params: { id: string };
}) {

  return (
    <main>
        <Suspense fallback={<AnleitungSkeleton/>}>
            <Overview params={params}/>
        </Suspense>

    </main>
  );
}
