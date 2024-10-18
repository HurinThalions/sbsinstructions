import { inter } from '@/app/ui/fonts';

export default function AnleitungLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (  
        <div className={`${inter.className} antialiased flow-root display-flex md:overflow-y-auto p-4`}>
            {children}
        </div>

    )
}
