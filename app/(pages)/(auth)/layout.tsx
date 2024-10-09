import type { Metadata } from "next";

import { inter } from '@/app/ui/fonts';

export default function AuthPage(
    { children }: { children:React.ReactNode})
{
    return(
        <div className="flex justify-center pt-16 mt-10 md:h-screen">
            {children}
        </div>
    )
}