'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ErsteInfosaufnehmen() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

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

    const res = await fetch('/api/anleitungen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration, date, image: imageBase64, user }),
    });

    if (res.ok) {
      const data = await res.json();
      const anleitungId = data.id;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/Anleitungerstellen/schritterstellen/${anleitungId}`);
      }, 500);
    } else {
      const { error } = await res.json();
      alert(`Fehler: ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flow-root display-flex md:overflow-y-auto p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Anleitung erstellen</h2>
        <div className="float-left w-[50%] h-[45%]">
          <div className="border-2 border-black rounded-lg mb-4 p-4">

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
              className="w-full p-2 border rounded-md"
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
              className="w-full p-2 border rounded-md"
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
              className="w-full p-2 border rounded-md"
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


          </div>
        </div>

        <div className="float-right w-[45%] h-[90%] p-4">
          <div className="border-2 border-black rounded-lg p-4 mb-4 h-full">
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

            {image && (
              <div className="mt-4 w-full max-w-[100%]">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Bildvorschau"
                  className="w-full h-auto max-h-[40vh] object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-4 flex flex-col items-center justify-center w-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Anleitung erstellen und Weiter zu den Schritten
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg">
            Anleitung erfolgreich erstellt
          </div>
        </div>
      )}
    </>
  );
}