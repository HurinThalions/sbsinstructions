'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SchrittundMaterialerstellen from '@/app/ui/anleitungenerstellen/schritterstellen';

export default function SchritteErstellenPage() {
    const pathname = usePathname();
    const [anleitungId, setAnleitungId] = useState<string | null>(null);

    useEffect(() => {
        if (pathname) {
            // Extrahiere anleitungId aus der URL
            const segments = pathname.split('/');
            const id = segments[segments.length - 2]; // Nimmt an, dass die AnleitungId an dieser Stelle ist
            setAnleitungId(id);
        }
    }, [pathname]);

    if (!anleitungId) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1 className="text-center text-2xl font-bold">Schritte hinzufügen für Anleitung {anleitungId}</h1>
            <SchrittundMaterialerstellen anleitungId={anleitungId} />
        </main>
    );
}