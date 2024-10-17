'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Popup() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const message = searchParams?.get('message');
    if (message === 'login_required') {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2050);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Hinweis</h2>
        <p>Bitte erst einloggen, bevor eine Anleitung erstellt werden kann.</p>
      </div>
    </div>
  );
}