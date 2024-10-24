'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

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

  const { data: anleitungen = initialData } = useSWR(
    `/api/anleitungen?query=${query}&page=${currentPage}`,
    fetcher,
    { fallbackData: initialData }
  );

  const handleClick = (id: string, title: string) => {
    router.push(`/Anleitung/${id}`);
  };

  return (
    <div className="flex flex-col place-items-center drop-shadow">
      <div className={`${styles.container}`}>
        <h1 className="text-center text-xl font-bold min-w-full mb-12">Anleitungen</h1>
        <table className={`min-w-full text-center table-auto`}>
          <thead className="border-b">
            <tr>
              <th>Titel</th>
              <th>Dauer</th>
              <th className='hidden lg:table-cell'>Datum</th>
              <th className="hidden md:table-cell">Bild</th>
            </tr>
          </thead>
          <tbody>
            {anleitungen.map((anleitung: Anleitung) => (
              <tr
                key={anleitung.id}
                className={`${styles.row} cursor-pointer hover:bg-gray-100`}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}