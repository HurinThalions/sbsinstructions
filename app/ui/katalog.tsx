import { fetchAnleitungen } from "../lib/data";
import styles from '@/app/ui/Startseite/katalog.module.css';

import Image from "next/image";

export default async function Katalog() {
    const anleitungen = await fetchAnleitungen();

    return (
        <div className="flex flex-col m-20">
            <div className="overflow-hidden">
                <h1 className="">Anleitungen</h1>
                <table className="min-w-full text-center">
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
                            <tr key={anleitung.id} className="px-6 py-4 text-sm">
                                <td className="whitespace-nowrap px-6 py-4 text-sm " >{anleitung.titel}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">{anleitung.dauer}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">{anleitung.datum}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
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
