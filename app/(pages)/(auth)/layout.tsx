import type { Metadata } from "next";

import { inter } from '@/app/ui/fonts';

export default function AuthPage(
    { children }: { children:React.ReactNode})
{
    return(
        <div className="justify-center lg:pt-16 lg:mt-10 sm:mt-5 md:h-screen">
            {children}
        </div>
    )
}