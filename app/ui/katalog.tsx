'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import styles from '@/app/ui/css/katalog.module.css';

export default function KatalogClient({ anleitungen }: { anleitungen: any[] }) {

    const router = useRouter();

    const handleClick = (id: string, titel: string) => {
        router.push(`/Anleitung/${id}`)
    };

    return (
        <div className="flex flex-col place-items-center drop-shadow">
            <div className={` ${styles.container}`}>
                <h1 className="text-center text-xl font-bold min-w-full mb-12">Anleitungen</h1>
                <table className={`min-w-full text-center table-auto`}>
                    <thead className="border-b">
                        <tr>
                            <th>Titel</th>
                            <th>Dauer</th>
                            <th className='hidden md:block'>Datum</th>
                            <th>Bild</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anleitungen.map((anleitung) => (
                            <tr
                                key={anleitung.id}
                                className={`${styles.row} cursor-pointer hover:bg-gray-100`}
                                onClick={() => handleClick(anleitung.id, anleitung.title)}
                            >
                                <td className="px-6 py-4 text-sm border-b">{anleitung.title}</td>
                                <td className="px-6 py-4 text-sm border-b">{anleitung.duration}</td>
                                <td className="px-6 py-4 text-sm border-b hidden md:table-cell">{new Date(anleitung.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm border-b">
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