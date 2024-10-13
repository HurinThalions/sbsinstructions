import { fetchgefilterteAnleitungen } from "../lib/data";
import styles from '@/app/ui/css/katalog.module.css';

import Image from "next/image";
import Link from "next/link";

export default async function Katalog({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;

}) {
    const anleitungen = await fetchgefilterteAnleitungen(query, currentPage);

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
                            <tr key={anleitung.id} className="">
                                <td className=" px-6 py-4 text-sm border-b" >{anleitung.titel}</td>
                                <td className=" px-6 py-4 text-sm border-b">{anleitung.dauer}</td>
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
