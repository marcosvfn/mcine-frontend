import { ReactNode } from "react";
import Navbar from "./(routes)/home/components/navbar";
import Footer from "@/components/base/footer";
import FooterCinema from "@/components/base/footerCinema";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col bg-black min-h-screen max-w-screen overflow-auto">
      <Navbar />
      <div className="w-full">{children}</div>
      <FooterCinema />
    </main>
  );
}
