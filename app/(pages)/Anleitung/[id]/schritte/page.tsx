'use client';
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

import Einzelschritte from "@/app/ui/anleitungen/einzelschritte"
import { AnleitungSkeleton } from "@/app/ui/skeletons";

export default function Anleitungsschritte() {

    const searchParams = useSearchParams();

    const schritte = searchParams?.get('schritte');
    const parsedSchritte = schritte ? JSON.parse(schritte) : [];
    return(
        <div>
            <Suspense fallback={<AnleitungSkeleton/>}>
                <Einzelschritte schritte={parsedSchritte} />
            </Suspense>
        </div>

    )
}
