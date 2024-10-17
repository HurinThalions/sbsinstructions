'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ErsteInfosaufnehmen() {
  const { data: session } = useSession(); // Nutzerinformationen abrufen
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null); // Für das Bild

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hier kannst du die Logik zum Absenden der Formulardaten implementieren
    console.log({
      title,
      duration,
      date,
      image,
      user: session?.user?.name, // Name des Nutzers
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flow-root display-flex md:overflow-y-auto md:p-4">
      <div className="float-left border-solid border-2 border-black rounded-lg min-w-[40%] p-2">
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
          Anleitung erstellen
        </button>
      </div>
      <div className="float-right lg:max-w-[40vw] lg:max-h-[45] rounded-lg min-w-[40%]">
        {/* Hier können wir später zusätzliche Inhalte wie Vorschau oder weitere Schritte hinzufügen */}
      </div>
    </form>
  );
}