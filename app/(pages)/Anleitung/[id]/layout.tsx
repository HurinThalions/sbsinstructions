import { inter } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar';

export default function AnleitungLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <div className="w-full flex">
            <Navbar />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </body>
      </html>
    )
}