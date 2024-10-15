'use client';

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

import styles from '@/app/ui/css/katalog.module.css';
import formatTitleForUrl from '@/app/lib/formattitel';

export default function KatalogClient({ anleitungen }: { anleitungen: any[] }) {

    const router = useRouter();
    const [clickedItem, setClickedItem] = useState<string | null>(null);

    const handleClick = (id: string, titel: string) => {
        const formatierterTitel = formatTitleForUrl(titel)
        router.push(`/Anleitung/${id}`)
    };

    return (
        <div className="flex flex-col place-items-center">
            <div className={` ${styles.container}`}>
                <h1 className="text-center text-xl font-bold min-w-full mb-12">Anleitungen</h1>
                <table className={`min-w-full text-center `}>
                    <thead className="border-b">
                        <tr>
                            <th>Titel</th>
                            <th>Dauer</th>
                            <th>Datum</th>
                            <th>Bild</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anleitungen.map((anleitung) => (
                            <tr
                                key={anleitung.id}
                                className={`${styles.row} cursor-pointer hover:bg-gray-100`}
                                onClick={() => handleClick(anleitung.id, anleitung.titel)}
                            >
                                <td className="px-6 py-4 text-sm border-b">{anleitung.titel}</td>
                                <td className="px-6 py-4 text-sm border-b">{anleitung.dauer}</td>
                                <td className="px-6 py-4 text-sm border-b">{anleitung.datum}</td>
                                <td className="px-6 py-4 text-sm border-b">
                                    <Image 
                                        src={`${anleitung.bild}`} 
                                        alt={anleitung.titel} 
                                        width={100}
                                        height={100}
                                        className="hidden md:block"
                                    />
                                    <Image
                                        src={`${anleitung.bild}`} 
                                        alt={anleitung.titel} 
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