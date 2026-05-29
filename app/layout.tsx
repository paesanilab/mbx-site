import { MobileNavBar, NavBar } from "@/app/navbar";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="font-sans antialiased">
            <div className="hidden md:block">
                <NavBar />
            </div>
            <div className="block md:hidden">
                <MobileNavBar />
            </div>
            {children}
        </div>
    );
}
