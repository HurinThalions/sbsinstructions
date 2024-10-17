'use client';

import Statusbar from "@/app/ui/anleitungenerstellen/statusbar";
import ErsteInfosaufnehmen from "@/app/ui/anleitungenerstellen/ersteinfos";
import WeiterButton from "@/app/ui/anleitungenerstellen/weiterbutton";
import { useState } from "react";

export default function AnleitungerstellenPage() {
    const [anleitungId, setAnleitungId] = useState<string | null>(null);

    const handleAnleitungErstellt = (id: string) => {
        setAnleitungId(id); // Sobald die Anleitung erstellt ist, setze die ID
    };

    return (
        <main>
            <Statusbar />
            <ErsteInfosaufnehmen onAnleitungErstellt={handleAnleitungErstellt} />
            {anleitungId && <WeiterButton anleitungId={anleitungId} />}  {/* Zeige den Button nur an, wenn eine ID existiert */}
        </main>
    );
}