import { CatalogApi } from '@/lib/api-catalog';
import { Metadata } from 'next';
import PromoCarousel from '@/components/features/promo/promo-carousel'; // Import
import PopularSection from '@/components/features/popular/popular-section'; // Import


import GameCatalog from '@/components/features/catalog/game-catalog';

export const metadata: Metadata = {
  title: 'AnzaStore - Top Up Games Instantly',
  description: 'The best place to buy game credits securely and instantly.',
};

export default async function HomePage() {
  return (
    <div className="pb-20 min-h-screen bg-[#1c1c1c]">

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-6">
        <PromoCarousel />
      </div>

      {/* Popular Now Section */}
      <PopularSection />

      {/* Main Catalog Section */}
      <section className="container mx-auto px-4 mt-12 relative z-20">
        <GameCatalog />
      </section>
    </div>
  );
}
