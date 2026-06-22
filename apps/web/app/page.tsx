import AnnouncementBar from "./components/AnnouncementBar"
import Navbar from "./components/Navbar"
import Hero3DSection from "./components/Hero3DSection"
import ServiceCards from "./components/ServiceCards"
import FlightsSection from "./components/FlightsSection"
import HolidayPackagesSection from "./components/HolidayPackagesSection"
import DomesticPackages from "./components/DomesticPackages"
import UmrahSection from "./components/UmrahSection"
import VisaSection from "./components/VisaSection"
import HotelSection from "./components/HotelSection"
import BusSection from "./components/BusSection"
import WhyChooseUs from "./components/WhyChooseUs"
import AppDownload from "./components/AppDownload"
import Testimonials from "./components/Testimonials"
import BlogPreview from "./components/BlogPreview"
import Footer from "./components/Footer"
import FloatingButtons from "./components/FloatingButtons"

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero3DSection />
        <ServiceCards />
        <FlightsSection />
        <HolidayPackagesSection />
        <DomesticPackages />
        <UmrahSection />
        <VisaSection />
        <HotelSection />
        <BusSection />
        <WhyChooseUs />
        <AppDownload />
        <Testimonials />
        <BlogPreview />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
