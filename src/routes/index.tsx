import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { MoreThanWeb } from "@/components/MoreThanWeb";
import { HowWeWork } from "@/components/HowWeWork";
import { FeatureExplorer } from "@/components/FeatureExplorer";
import { Portfolio } from "@/components/Portfolio";
import { AIAgentSection } from "@/components/AIAgentSection";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stepping Up — Diseño Web y Acompañamiento Digital en Costa Rica" },
      {
        name: "description",
        content:
          "Diseñamos y construimos páginas web para pequeños y medianos negocios, y te acompañamos para que realmente las aprovechés. San José y Cartago.",
      },
      { property: "og:title", content: "Stepping Up — Diseño Web y Acompañamiento Digital en Costa Rica" },
      { property: "og:url", content: "https://steppingup.lovable.app/" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Páginas web rápidas, agente de IA integrado, Google Negocio y acompañamiento real después del lanzamiento.",
      },
      { name: "twitter:title", content: "Stepping Up — Diseño Web y Acompañamiento Digital en Costa Rica" },
      {
        name: "twitter:description",
        content:
          "Páginas web rápidas, agente de IA integrado, Google Negocio y acompañamiento real después del lanzamiento.",
      },
    ],
    links: [{ rel: "canonical", href: "https://steppingup.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Stepping Up",
          description:
            "Agencia digital que diseña páginas web y acompaña a pequeños y medianos negocios en Costa Rica.",
          url: "https://steppingup.lovable.app/",
          areaServed: [
            { "@type": "City", name: "San José" },
            { "@type": "City", name: "Cartago" },
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "CR",
            addressRegion: "San José",
          },
          email: "steppingup.business@gmail.com",
        }),
      },
    ],
  }),

  component: Page,
});

function Page() {
  return (
    <div className="md:pl-52 min-h-screen bg-background text-foreground">
      <Sidebar />
      <main>
        <Hero />
        <MoreThanWeb />
        <HowWeWork />
        <FeatureExplorer />
        <Portfolio />
        <AIAgentSection />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
