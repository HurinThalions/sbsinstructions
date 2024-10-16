'use client';
import { useSearchParams } from "next/navigation"

import Einzelschritte from "@/app/ui/anleitungen/einzelschritte"

export default function Anleitungsschritte() {

    const searchParams = useSearchParams();

    const schritte = searchParams?.get('schritte');
    const parsedSchritte = schritte ? JSON.parse(schritte) : [];
    return(
        <div>
            <Einzelschritte schritte={parsedSchritte} />
        </div>

    )
}
