import type { Metadata } from "next";

import { inter } from '@/src/app/ui/fonts';

export default function AuthPage(
    { children }: { children:React.ReactNode})
{
    return(
        <div className={`${inter.className} justify-center lg:pt-20 lg:mt-14 sm:mt-5 md:h-screen`}>
            {children}
        </div>
    )
}
