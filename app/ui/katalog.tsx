'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';

import styles from '@/app/ui/css/katalog.module.css';
import { Anleitung } from "../lib/definitions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function KatalogClient({
  initialData,
  query,
  currentPage,
}: {
  initialData: Anleitung[];
  query: string;
  currentPage: number;
}) {
  const router = useRouter();
  const [sortField, setSortField] = useState<'title' | 'duration' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: anleitungen = initialData } = useSWR(
    `/api/anleitungen?query=${query}&page=${currentPage}`,
    fetcher,
    { fallbackData: initialData }
  );

  const handleSort = (field: 'title' | 'duration' | 'date') => {
    if (sortField === field) {
      // Toggle the sort order if the same field is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Sort the data based on selected field and order
  const sortedAnleitungen = [...anleitungen].sort((a, b) => {
    if (sortField === 'title' || sortField === 'date') {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    } else if (sortField === 'duration') {
      const valueA = parseInt(a.duration);
      const valueB = parseInt(b.duration);
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const handleClick = (id: string, title: string) => {
    router.push(`/Anleitung/${id}`);
  };

  const getSortIndicator = (field: 'title' | 'duration' | 'date') => {
    if (sortField === field) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <div className="flex flex-col place-items-center drop-shadow">
      <div className={`${styles.container}`}>
        <h1 className="text-center text-xl font-bold min-w-full mb-12">Anleitungen</h1>
        <table className={`min-w-full text-center table-auto`}>
          <thead className="border-b">
            <tr>
              <th onClick={() => handleSort('title')} className="cursor-pointer">
                Titel {getSortIndicator('title')}
              </th>
              <th onClick={() => handleSort('duration')} className="cursor-pointer">
                Dauer {getSortIndicator('duration')}
              </th>
              <th onClick={() => handleSort('date')} className="cursor-pointer hidden lg:table-cell">
                Datum {getSortIndicator('date')}
              </th>
              <th className="hidden md:table-cell">Bild</th>
            </tr>
          </thead>
          <tbody>
            {sortedAnleitungen.map((anleitung: Anleitung) => (
              <tr
                key={anleitung.id}
                className={`${styles.row} cursor-pointer hover:bg-gray-100 group relative`}
                onClick={() => handleClick(anleitung.id, anleitung.title)}
              >
                <td className="px-6 py-4 text-sm border-b">{anleitung.title}</td>
                <td className="px-6 py-4 text-sm border-b">{anleitung.duration}</td>
                <td className="px-6 py-4 text-sm border-b hidden lg:table-cell">{new Date(anleitung.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm border-b hidden md:table-cell">
                  <Image
                    src={`${anleitung.image}`}
                    alt={anleitung.title}
                    width={100}
                    height={100}
                    className="hidden md:block"
                  />
                  <Image
                    src={`${anleitung.image}`}
                    alt={anleitung.title}
                    width={50}
                    height={50}
                    className="block md:hidden"
                  />
                </td>
                {/* Tooltip */}
                <td className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Auf die Anleitung klicken, um die Anleitung zu öffnen
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}