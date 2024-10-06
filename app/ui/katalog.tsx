import { fetchAnleitungen } from "../lib/data";
import styles from '@/app/ui/Startseite/katalog.module.css';

import Image from "next/image";

export default async function Katalog() {
    const anleitungen = await fetchAnleitungen();

    return (
        <div className={styles.hintergrund}>
            <h1>Katalog</h1>
            <table className={styles.container}>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Dauer</th>
                        <th>Datum</th>
                        <th>Bild</th>
                    </tr>
                </thead>
                <tbody>
                    {anleitungen.map((anleitung) => (
                        <tr key={anleitung.id}>
                            <td>{anleitung.id}</td>
                            <td>{anleitung.titel}</td>
                            <td>{anleitung.dauer}</td>
                            <td>{anleitung.datum}</td>
                            <td>
                                <Image 
                                    src={`/public/${anleitung.bild}`} 
                                    alt={anleitung.titel} 
                                    width={100}
                                    height={100}
                                    className="hidden md:block"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}