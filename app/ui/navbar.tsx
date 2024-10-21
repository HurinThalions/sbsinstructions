import Image from "next/image";
import { UserIcon, PlusIcon } from "@heroicons/react/16/solid";

import styles from '@/app/ui/css/topbar.module.css';
import Link from "next/link";

export default function Navbar() {

  return (
    <div className={styles.body}>
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
        <div className={styles.boxumAErstellen}>
            <Link href='/Anleitungerstellen'>
                <PlusIcon className={styles.aErstellen}/>
            </Link>
        </div>
        <div className={styles.boxumProfil}>
            <Link href={'/signin'}>
                <UserIcon className={styles.profil} />
            </Link>
        </div>
        </div>
    </div>
  );
};


