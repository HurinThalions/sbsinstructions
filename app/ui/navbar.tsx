'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from '@/app/ui/css/topbar.module.css';
 

const Navbar = ({ setPopupMessage }: { setPopupMessage: (message: string) => void }) => {
    const [nav, setNav] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

  const links = [
    {
        name: 'Home',
        id: 1,
        link: "Start",
    },
    {
        name: 'Profil',
        id: 2,
        link: 'signin',
    },
    {
        name: 'Anleitungen erstellen',
        id: 3,
        link: "Anleitung erstellen",
        icon: UserGroupIcon,
    }

  ];

  const handleCreateClick = (e:React.MouseEvent) => {
    e.preventDefault();

    if (session) {
        router.push('/Anleitungerstellen');
    } else {

        setPopupMessage('Bitte einloggen, um eine Anleitung zu erstellen. Sie werden zur Login Seite weitergeleitet.')
        setTimeout(() => {
            router.push('/signin');
        }, 1500);
    }
  }

  return (
    <div className={styles.body}>
        <div className={styles.header}>
                <a className={styles.logocontainer} href="/">
                    <Image
                        src={'./Logo.svg'}
                        width={190}
                        height={95}
                        alt="Logo"
                        className="hidden md:block"
                    />
                    <Image
                        src={'./Logo.svg'}
                        width={95}
                        height={47}
                        alt="Logo"
                        className="block md:hidden"
                    />
                </a>
        <div className={styles.boxumAErstellen}>
            <a className={styles.aErstellen} href="#" onClick={handleCreateClick}>
                <Image
                src={'./Anleitunghinzufuegen.svg'}
                width={60}
                height={60}
                alt="Anleitung erstellen"
                className="hidden md:block"
                />
                <Image
                src={'./Anleitunghinzufuegen.svg'}
                width={30}
                height={30}
                alt="Anleitung erstellen"
                className="block md:hidden"
                />
            </a>
        </div>
        <div className={styles.boxumProfil}>
            <a className={styles.profil} href="/signin">
            <Image
                src={'./Profil_Logo.svg'}
                width={60}
                height={60}
                alt="Profil bearbeiten"
                className="hidden md:block"
            />
            <Image
                src={'./Profil_Logo.svg'}
                width={30}
                height={30}
                alt="Anleitung erstellen"
                className="block md:hidden"
            />
            </a>
        </div>
        </div>
    </div>
  );
};

export default Navbar;
