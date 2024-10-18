'use client';

import { useRouter } from 'next/navigation';

export default function WeiterButton({ anleitungId }: { anleitungId: string }) {
  const router = useRouter();

  if (!anleitungId) {
    return null; // Keine ID, kein Button
  }

  const handleClick = () => {
    router.push(`/Anleitungerstellen/schritterstellen/${anleitungId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Weiter zu den Schritten
    </button>
  );
}