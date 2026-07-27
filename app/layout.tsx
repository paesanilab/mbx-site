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
            <footer className="mx-[20px] mb-[20px] rounded-[24px] bg-[#111840] px-6 py-5 text-center text-sm text-white md:mx-[70px] md:mb-[40px]">
                MBX development is supported by the U.S. National Science Foundation through{" "}
                <a
                    href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=2311260"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#9eb8ff] underline underline-offset-2 hover:text-white"
                >
                    Award No. 2311260
                </a>
                , “Frameworks: Data-Driven Software Infrastructure for Next-Generation Molecular
                Simulations.”
            </footer>
        </div>
    );
}
