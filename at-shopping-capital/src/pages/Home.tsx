import Navbar from "../components/Navbar";
import ChatBanner from "../components/ChatBanner";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
  <Navbar />
  <main className="flex flex-col gap-10 px-6 pt-10 pb-20 max-w-7xl mx-auto w-full">
    <ChatBanner />
    <section className="space-y-8 mt-8">
      <h3 className="text-2xl font-bold text-blue-900">Recommended for you</h3>
      <ProductGrid />
    </section>
  </main>
</div>

  );
}
