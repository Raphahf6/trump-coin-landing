// app/page.tsx
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import Whitepaper from "@/components/Whitepaper";
import Community from "@/components/Community";

export default function Home() {
  return (
    <main>

      <Hero />
      <Tokenomics />
      <HowToBuy />
      <Whitepaper />
      <Community />

    </main>
  );
}