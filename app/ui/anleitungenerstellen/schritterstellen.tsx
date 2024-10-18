'use client';

import { useState } from 'react';

export default function SchrittundMaterialerstellen({ anleitungId }: { anleitungId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [material, setMaterial] = useState('');

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
        material
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Schritt erfolgreich hinzugefügt!');
    } else {
      const { error } = await res.json();
      alert(`Fehler: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Titel</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Beschreibung</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Material (optional)</label>
      <input
        type="text"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
      />

      <label>Bild (optional)</label>
      <input
        type="file"
        onChange={handleImageChange}
      />

      <button type="submit">Schritt speichern</button>
    </form>
  );
}