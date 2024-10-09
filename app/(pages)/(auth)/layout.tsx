import type { Metadata } from "next";

import { inter } from '@/app/ui/fonts';

export default function AuthPage(
    { children }: { children:React.ReactNode})
{
    return(
        <div className="justify-center sm:pt-16 sm:mt-10 md:mt-5 md:h-screen">
            {children}
        </div>
    )
}