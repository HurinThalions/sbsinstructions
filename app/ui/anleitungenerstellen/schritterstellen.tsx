'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Für die Navigation

export default function SchrittundMaterialerstellen({ anleitungId }: { anleitungId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [material, setMaterial] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();  // Verwende Router für Navigation

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/anleitungen/${anleitungId}/schritte`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        image,
        material,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      // Erfolgsmeldung anzeigen
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleAddAnotherStep(); // Neues Formular bereitstellen
      }, 500);
    } else {
      const { error } = await res.json();
      alert(`Fehler: ${error}`);
    }
  };

  const handleAddAnotherStep = () => {
    // Leere das Formular, um einen weiteren Schritt hinzuzufügen
    setTitle('');
    setDescription('');
    setImage(null);
    setMaterial('');
  };

  const handleComplete = () => {
    // Leite zur Endseite weiter, wenn die Anleitung fertiggestellt wird
    router.push('/Endseite');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
        <div className="w-full flow-root display-flex md:overflow-y-auto md:p-4">
          <div className="float-left w-[50%] h-[45%] p-4">
            <div className="border-2 border-black rounded-lg p-4 mb-4">
              <label className="block mb-2 font-semibold">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="border-2 border-black rounded-lg p-4 mb-4">
              <label className="block mb-2 font-semibold">Beschreibung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="border-2 border-black rounded-lg p-4 mb-4">
              <label className="block mb-2 font-semibold">Material (optional)</label>
              <textarea
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="float-right w-[45%] h-[90%] p-4">
            <div className="border-2 border-black rounded-lg p-4 mb-4 h-full">
              <label className="block mb-2 font-semibold">Bild (optional)</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
              {image && (
                <div className="mt-4 w-full max-w-[100%]">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-auto max-h-[40vh] object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 flex flex-col items-center justify-center w-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <button
            type="submit"
            className="w-full max-w-[40%] lg:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Schritt speichern und Weiteren hinzufügen
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className="w-full max-w-[40%] lg:max-w-xs bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Anleitung fertigstellen
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg">
          Schritt erfolgreich hinzugefügt
        </div>
      )}
    </>
  );
}