'use client'

import React, { useState } from "react";
import Image from "next/image";
import styles from '@/app/ui/topbar.module.css'
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Start",
    },
    {
        id: 2,
        link: "Anleitung durchgehen"
    },
    {
        id: 3,
        link: "Anleitung erstellen"
    }

  ];

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
            <a className={styles.aErstellen} href="/Anleitungerstellen">
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
            <a className={styles.profil} href="/Login">
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
