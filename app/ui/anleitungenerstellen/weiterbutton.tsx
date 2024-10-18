'use client';

import { useRouter } from 'next/navigation';

export default function WeiterButton({ anleitungId }: { anleitungId: string }) {
  const router = useRouter();

  if (!anleitungId) {
    return null;
  }

  const handleClick = () => {
    router.push(`/Anleitungerstellen/schritterstellen/${anleitungId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-[40%] sm:max-w-[70%] md:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
    >
      Weiter zu den Schritten
    </button>
  );
}