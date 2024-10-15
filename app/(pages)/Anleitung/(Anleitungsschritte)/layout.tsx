import { inter } from '@/app/ui/fonts';

export default function AnleitungsschritteLayout(
    { children }: { children:React.ReactNode})
{
    return(
        <div className={`${inter.className} justify-center lg:pt-20 lg:mt-14 sm:mt-5 md:h-screen`}>
            {children}
        </div>
    )
}
