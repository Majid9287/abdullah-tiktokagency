import HeroSection from "@/components/HeroSection"
import BenefitsSection from "@/components/BenefitsSection"
import MentorsSection from "@/components/MentorsSection"
import TrainersSection from "@/components/TrainersSection"
import CountriesSection from "@/components/CountriesSection"
import EventsMemoriesSection from "@/components/EventsMemoriesSection"
import Image from "next/image"
import React from "react"

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

function TopBar() {
  const [scrolled, setScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/60 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className={`transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <Image src="/logo.png" alt="Logo" width={45} height={45} className="rounded-full shadow-sm" />
          </div>
          <span className={`font-bold text-xl transition-all duration-500 ${
            scrolled ? 'text-indigo-700' : 'text-white drop-shadow-md'
          }`}>YourBrand</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`font-medium transition-all duration-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-400 hover:after:w-full after:transition-all ${
                scrolled ? 'text-gray-800 hover:text-indigo-700' : 'text-white/90 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <button className={`text-white px-6 py-2.5 rounded-full transition-all duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
          scrolled ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-500/80 hover:bg-indigo-600/90 backdrop-blur-sm'
        }`}>
          Get Started
        </button>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-500 ${scrolled ? 'text-gray-800' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function JoinUs() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-10">
            Be part of our growing network of professionals and enthusiasts. 
            Connect, learn, and grow with us.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "👥",
                title: "Network",
                description: "Connect with like-minded individuals and industry experts"
              },
              {
                icon: "🚀",
                title: "Grow",
                description: "Access exclusive resources and opportunities for development"
              },
              {
                icon: "💡",
                title: "Innovate",
                description: "Collaborate on projects and bring your ideas to life"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all transform hover:-translate-y-1 hover:shadow-xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full sm:w-auto"
            />
            <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

