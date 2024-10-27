'use client';

import { useParams, useSearchParams } from 'next/navigation';

import SchrittundMaterialerstellen from '@/app/ui/anleitungenerstellen/schritterstellen';
import Statusbar from '@/app/ui/anleitungenerstellen/statusbar';

export default function SchritteErstellenPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  let anleitungId = params?.id;
  const anleitungTitel = searchParams?.get('title');

  if (Array.isArray(anleitungId)) {
    anleitungId = anleitungId[0];
  }

  if (!anleitungId) {
    return <p>Es gibt keine Anleitung mit dieser ID</p>;
  }

  return (
    <main>
      <Statusbar />
      <h1 className="text-lg font-bold mb-4 text-center">
        Schritte für Anleitung {anleitungTitel ? `${anleitungTitel}` : anleitungId}
      </h1>
      <SchrittundMaterialerstellen anleitungId={anleitungId} />
    </main>
  );
}