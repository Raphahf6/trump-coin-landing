// app/page.tsx
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import Whitepaper from "@/components/Whitepaper";

export default function Home() {
  return (
    <main>
      <Hero />
      <Tokenomics />
      <HowToBuy />
      <Whitepaper/>
      {/* Você pode adicionar as outras seções aqui depois,
          como <Tokenomics />, <Roadmap /> etc. */}
    </main>
  );
}