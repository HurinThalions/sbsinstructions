import Image from "next/image";
import { UserIcon, PlusIcon } from "@heroicons/react/16/solid";

import styles from '@/app/ui/css/topbar.module.css';
import Link from "next/link";

export default function Navbar() {

  return (
    <div className={styles.body}>
        {/* Link zur Startseite */}
        <div className={styles.header}>
                <a className={styles.logocontainer} href="/">
                    <Image
                        src={'/Logo.svg'}
                        width={190}
                        height={95}
                        alt="Logo"
                        className="hidden md:block"
                    />
                    <Image
                        src={'/Logo.svg'}
                        width={95}
                        height={47}
                        alt="Logo"
                        className="block md:hidden"
                    />
                </a>
            {/* Link zu Anleitung erstellen */}
        <Link href='/Anleitungerstellen' className={`${styles.boxumAErstellen} group`}>
            <div className="flex items-center justify-center w-full h-full">
            <PlusIcon
              className={`${styles.aErstellen} hidden md:block`}
              width={55}
              height={55}
            />
            <PlusIcon
              className={`${styles.aErstellen} block md:hidden`}
              width={35}
              height={35}
            />
          </div>
        {/* Anzeige bei Hover */}
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Anleitung erstellen
            </p>
        </Link>

        {/* Link zu Einloggen */}
        <Link href='/signin' className={`${styles.boxumProfil} group`}>
          <div className="flex items-center justify-center w-full h-full">
            <UserIcon
              className={`${styles.profil} hidden md:block`}
              width={55}
              height={55}
            />
            <UserIcon
              className={`${styles.profil} block md:hidden`}
              width={35}
              height={35}
            />
          </div>
            {/* Anzeige bei Hover */}
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Anmeldung & Registrierung
            </p>
        </Link>
        </div>
    </div>
  );
};


