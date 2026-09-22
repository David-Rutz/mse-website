import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProblemSection } from './components/ProblemSection';
import { ThreePillars } from './components/ThreePillars';
import { Startpaket } from './components/Startpaket';
import { Programs } from './components/Programs';
import { Membership } from './components/Membership';
import { CorporateOffer } from './components/CorporateOffer';
import { AboutUs } from './components/AboutUs';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { SecretAdmin } from './components/SecretAdmin';
import { ModalType, BookingDetails, ProgramItem } from './types';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [locationCity, setLocationCity] = useState<string>('Zürich');
  const [isSecretAdminOpen, setIsSecretAdminOpen] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      (window.location.hash === '#secret' || window.location.search.includes('secret'))
    );
  });

  // Check URL hash for #secret
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#secret' || window.location.search.includes('secret')) {
        setIsSecretAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle ESC key to close any active modal or secret admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        if (isSecretAdminOpen) {
          setIsSecretAdminOpen(false);
          if (window.location.hash === '#secret') {
            window.location.hash = '';
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSecretAdminOpen]);

  // Body overflow locking
  useEffect(() => {
    if (activeModal || isSecretAdminOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [activeModal, isSecretAdminOpen]);

  const handleOpenModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleBookStartpaket = useCallback(() => {
    setBookingDetails({
      serviceId: 'startpaket',
      serviceTitle: 'MSE Startpaket (30 Min. Gespräch + 30 Min. Massage)',
      price: 'CHF 89',
      duration: '60 Min',
    });
    setActiveModal('booking');
  }, []);

  const handleSelectProgram = useCallback((program: ProgramItem) => {
    setBookingDetails({
      serviceId: program.id,
      serviceTitle: `Programm ${program.name} (${program.duration})`,
      price: program.price,
      duration: program.duration,
    });
    setActiveModal('booking');
  }, []);

  const handleBookMembership = useCallback((membershipName: string, price: string) => {
    setBookingDetails({
      serviceId: membershipName.toLowerCase().replace(/\s+/g, '-'),
      serviceTitle: `Mitgliedschaft ${membershipName}`,
      price: price,
      duration: 'Monatlich',
    });
    setActiveModal('booking');
  }, []);

  const handleSelectPricingBooking = useCallback((details: BookingDetails) => {
    setBookingDetails(details);
    setActiveModal('booking');
  }, []);

  const handleCloseSecretAdmin = useCallback(() => {
    setIsSecretAdminOpen(false);
    if (window.location.hash === '#secret') {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased selection:bg-green selection:text-white flex flex-col font-sans">
      {/* 1. Header (Sticky) */}
      <Header
        onOpenModal={handleOpenModal}
        locationCity={locationCity}
        onChangeLocation={setLocationCity}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          locationCity={locationCity}
          onSelectStartpaket={handleBookStartpaket}
        />

        {/* 3. Trust Bar */}
        <TrustBar locationCity={locationCity} />

        {/* 4. Problem Section ("Kennst du das?") */}
        <ProblemSection />

        {/* 5. Die drei Säulen (Massage, Sport, Ernährung) */}
        <ThreePillars onOpenModal={handleOpenModal} />

        {/* 6. Startpaket (Main Conversion Offer) */}
        <Startpaket onBookStartpaket={handleBookStartpaket} />

        {/* 7. Programme (Schmerzfrei, Reset, Performance) */}
        <Programs onSelectProgram={handleSelectProgram} />

        {/* 8. Für Firmen & Vereine (#firmen) */}
        <CorporateOffer
          onBookCorporate={(name, price) =>
            handleSelectPricingBooking({
              serviceId: 'firmen-massagetag',
              serviceTitle: name,
              price: price,
              duration: 'Halbtag vor Ort',
            })
          }
        />

        {/* 9. Mitgliedschaft (#mitgliedschaft) */}
        <Membership onBookMembership={handleBookMembership} />

        {/* 10. Über MSE */}
        <AboutUs locationCity={locationCity} />

        {/* 11. Final CTA */}
        <FinalCta onSelectStartpaket={handleBookStartpaket} />
      </main>

      {/* 12. Footer */}
      <Footer
        locationCity={locationCity}
        onOpenModal={handleOpenModal}
        onOpenSecretAdmin={() => setIsSecretAdminOpen(true)}
      />

      {/* 13. Interactive Modals / Lightboxes */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        onOpenModal={handleOpenModal}
        onSelectBooking={handleSelectPricingBooking}
        bookingDetails={bookingDetails}
        locationCity={locationCity}
      />

      {/* 14. Secret Admin & Calendar Page */}
      {isSecretAdminOpen && (
        <SecretAdmin
          onClose={handleCloseSecretAdmin}
          locationCity={locationCity}
        />
      )}
    </div>
  );
}
