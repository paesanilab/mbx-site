import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "@/app/about/page";
import Download from "@/app/download/page";
import FAQPage from "@/app/faq/page";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import Publications from "@/app/publications/page";
import TutorialsLayout from "@/app/tutorials/layout";
import MainTutorial from "@/app/tutorials/page";
import SubTutorial from "@/app/tutorials/[path]/page";
import UpdatesLayout from "@/app/updates/layout";
import UpdatesIndex from "@/app/updates/page";
import UpdatePage from "@/app/updates/[version]/page";

function NotFound() {
    return (
        <div className="bg-[#030625] text-white min-h-screen rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                <h1 className="text-3xl font-bold">Page not found</h1>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/publications" element={<Publications />} />
                    <Route
                        path="/tutorials"
                        element={
                            <TutorialsLayout>
                                <MainTutorial />
                            </TutorialsLayout>
                        }
                    />
                    <Route
                        path="/tutorials/:path"
                        element={
                            <TutorialsLayout>
                                <SubTutorial />
                            </TutorialsLayout>
                        }
                    />
                    <Route
                        path="/updates"
                        element={
                            <UpdatesLayout>
                                <UpdatesIndex />
                            </UpdatesLayout>
                        }
                    />
                    <Route
                        path="/updates/:version"
                        element={
                            <UpdatesLayout>
                                <UpdatePage />
                            </UpdatesLayout>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </RootLayout>
        </BrowserRouter>
    </StrictMode>,
);
