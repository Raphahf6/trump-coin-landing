// app/page.tsx
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";

export default function Home() {
  return (
    <main>
      <Hero />
      <Tokenomics />
      {/* Você pode adicionar as outras seções aqui depois,
          como <Tokenomics />, <Roadmap /> etc. */}
    </main>
  );
}