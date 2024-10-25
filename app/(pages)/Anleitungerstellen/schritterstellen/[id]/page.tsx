'use client';

import { useParams } from 'next/navigation';

import SchrittundMaterialerstellen from '@/app/ui/anleitungenerstellen/schritterstellen';
import Statusbar from '@/app/ui/anleitungenerstellen/statusbar';

export default function SchritteErstellenPage() {
  const params = useParams();
  let anleitungId = params?.id;

  if (Array.isArray(anleitungId)) {
    anleitungId = anleitungId[0];
  }
  
  if (!anleitungId) {
    return <p>Es gibt keine Anleitung mit dieser id</p>;
  }

  return (
    <main>
      <Statusbar />
      <h1 className="text-center text-2xl font-bold">Schritte für Anleitung {anleitungId}</h1>
      <SchrittundMaterialerstellen anleitungId={anleitungId} />
    </main>
  );
}
