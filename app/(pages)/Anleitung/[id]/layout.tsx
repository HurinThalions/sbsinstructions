import { inter } from '@/app/ui/fonts';

export default function AnleitungLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (  
        <div className="flow-root display-flex p-6 md:overflow-y-auto md:p-12">
            {children}
        </div>

    )
}
