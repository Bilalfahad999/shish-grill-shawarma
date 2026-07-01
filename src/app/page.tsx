import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedDishes } from "@/components/FeaturedDishes";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { OurStory } from "@/components/OurStory";
import { Catering } from "@/components/Catering";
import { Reviews } from "@/components/Reviews";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeaturedDishes />
        <WhyChooseUs />
        <OurStory />
        <Catering />
        <Reviews />
        <InstagramGrid />
        <Location />
      </main>
      <Footer />
    </>
  );
}
