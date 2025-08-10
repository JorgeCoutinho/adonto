
import { Footer } from "./_components/footer";
import { GridClinica } from "./_components/gridClinica";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div>
        <Hero />
        <GridClinica />
        <Footer />
      </div>
    </main>
  );
}
