import HeroSection from "@/components/HeroSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import SimpleBorderSection from "@/components/SimpleBorderSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cyber-bg-darker text-white">
      <main className="w-full flex flex-col">
        {/* Section 1: Hero Centered Logo */}
        <HeroSection />

        {/* Section 2: Vertical to Horizontal Past Tournaments */}
        <HorizontalScrollSection />

        {/* Section 3: Outlined Simple Text Rectangle */}
        <SimpleBorderSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
