import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
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
      { title: "Stepping Up — Agencia digital en Costa Rica" },
      {
        name: "description",
        content:
          "Diseñamos y construimos páginas web para pequeños y medianos negocios, y te acompañamos para que realmente las aprovechés. San José y Cartago.",
      },
      { property: "og:title", content: "Stepping Up — Agencia digital" },
      {
        property: "og:description",
        content:
          "Páginas web rápidas, agente de IA integrado, Google Negocio y acompañamiento real después del lanzamiento.",
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
        <WhyUs />
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
