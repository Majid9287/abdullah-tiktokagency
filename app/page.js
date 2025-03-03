import HeroSection from "@/components/HeroSection"
import BenefitsSection from "@/components/BenefitsSection"
import MentorsSection from "@/components/MentorsSection"
import TrainersSection from "@/components/TrainersSection"
import CountriesSection from "@/components/CountriesSection"
import EventsMemoriesSection from "@/components/EventsMemoriesSection"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <MentorsSection />
      <TrainersSection />
      <CountriesSection />
      <EventsMemoriesSection />
    </div>
  )
}

