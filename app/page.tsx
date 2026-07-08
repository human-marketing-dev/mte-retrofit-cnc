import { Footer, PorQueMTE, Proceso } from "@/components/landing/Closing";
import { ContactoCTA } from "@/components/landing/ContactoCTA";
import { FloatingWhatsApp, Header, Hero } from "@/components/landing/Header";
import { Beneficios, Maquinas, Problema, QueEs } from "@/components/landing/Sections";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problema />
        <QueEs />
        <Beneficios />
        <Maquinas />
        <Proceso />
        <PorQueMTE />
        <ContactoCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
