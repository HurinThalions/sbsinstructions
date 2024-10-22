'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ErsteInfosaufnehmen() {
  const { data: session } = useSession();
  const router = useRouter();  // Für die Weiterleitung
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);  // Für die Erfolgsmeldung

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const duration = formData.get('duration') as string;
    const date = formData.get('date') as string;
    const user = session?.user?.name || '';
    const imageFile = formData.get('image') as File;

    let imageBase64 = '';
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(imageFile);
    }

    // Sende die Anleitung an den API-Endpunkt
    const res = await fetch('/api/anleitungen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration, date, image: imageBase64, user }),
    });

    if (res.ok) {
      setShowSuccess(true);  // Erfolgsmeldung anzeigen
      setTimeout(() => {
        setShowSuccess(false);  // Nach 0.5 Sekunden ausblenden
        router.push('/Anleitungerstellen/schritterstellen');  // Weiter zu den Schritten
      }, 500);
    } else {
      const { error } = await res.json();
      alert(`Fehler: ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flow-root display-flex md:overflow-y-auto md:p-4 p-4">
        <div className="float-left border-solid border-2 border-black rounded-lg min-w-[45%] max-h-[80%] p-2">
          <h2 className="text-lg font-bold mb-4">Anleitung erstellen</h2>

          <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="title">
            Titel der Anleitung
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900" htmlFor="duration">
            Dauer (in Minuten)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900" htmlFor="date">
            Datum
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900" htmlFor="image">
            Bild hochladen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900" htmlFor="user">
            Ersteller
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={session?.user?.name || ''}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />

          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg">
            Anleitung erstellen und Weiter zu den Schritten
          </button>
        </div>
        <div className="float-right lg:max-w-[40vw] lg:max-h-[45] rounded-lg min-w-[40%]">
        </div>
      </form>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg">
          Anleitung erfolgreich erstellt
        </div>
      )}
    </>
  );
}