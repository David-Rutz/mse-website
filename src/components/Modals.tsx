import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Phone, Mail, User, ShieldCheck, MapPin, ExternalLink, Download, ArrowRight, Sparkles } from 'lucide-react';
import { PILLARS_DATA, SINGLE_PRICES, LIGHTBOX_PRICES, DEFAULT_PRACTICE_INFO } from '../data/mseData';
import { ModalType, BookingDetails } from '../types';
import {
  getCalendarSettings,
  addBooking,
  createGoogleCalendarUrl,
  downloadIcsFile,
} from '../data/calendarStore';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onOpenModal: (modal: ModalType) => void;
  onSelectBooking?: (details: BookingDetails) => void;
  bookingDetails: BookingDetails | null;
  locationCity: string;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  onOpenModal,
  onSelectBooking,
  bookingDetails,
  locationCity,
}) => {
  const calendarSettings = getCalendarSettings();

  // Booking Form State
  const [selectedService, setSelectedService] = useState(
    bookingDetails?.serviceTitle || 'MSE Startpaket (CHF 89)'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync selected service when bookingDetails changes
  React.useEffect(() => {
    if (bookingDetails?.serviceTitle) {
      setSelectedService(
        bookingDetails.price
          ? `${bookingDetails.serviceTitle} (${bookingDetails.price})`
          : bookingDetails.serviceTitle
      );
    }
  }, [bookingDetails]);

  if (!activeModal) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist booking into calendar store for the secret admin dashboard
    addBooking({
      fullName,
      email,
      phone,
      serviceTitle: selectedService,
      price: bookingDetails?.price,
      date: preferredDate,
      timeSlot: preferredTime,
      message,
      status: 'neu',
      locationCity,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleGoToPrices = () => {
    onOpenModal('preise');
  };

  const handleSelectAndBook = (name: string, price?: string) => {
    if (onSelectBooking) {
      onSelectBooking({
        serviceId: name,
        serviceTitle: name,
        price,
      });
    }
    setSelectedService(price ? `${name} (${price})` : name);
    onOpenModal('booking');
  };


  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      {/* 1. MODAL: MASSAGE */}
      {activeModal === 'massage' && (
        <div
          id="modal-massage"
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer z-10"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-8 md:p-12">
            <div className="inline-block bg-green/10 text-green font-bold px-4 py-1 rounded-full mb-6 text-sm">
              {PILLARS_DATA.massage.tag}
            </div>
            <h3 className="text-3xl font-black text-navy mb-2">
              {PILLARS_DATA.massage.modalTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              {PILLARS_DATA.massage.lead}
            </p>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Was wir anbieten:
            </h4>
            <ul className="space-y-3.5 mb-8 text-gray-700">
              {PILLARS_DATA.massage.services.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green/15 text-green flex items-center justify-center mr-3 mt-1 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>
                    <b className="text-navy">{item.name}:</b> {item.description}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Deine Ziele & Benefits:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-8 font-medium">
              {PILLARS_DATA.massage.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-lightgray p-4 rounded-xl flex items-center gap-2">
                  <span className="text-green font-bold">✓</span> {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGoToPrices}
                className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-light transition-colors cursor-pointer text-center"
              >
                Zu den Preisen
              </button>
              <button
                type="button"
                onClick={() => handleSelectAndBook('Sportmassage 60 Min', 'CHF 125')}
                className="w-full bg-green text-white font-bold py-4 rounded-xl hover:bg-green-dark transition-colors cursor-pointer text-center"
              >
                Massage buchen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL: SPORT */}
      {activeModal === 'sport' && (
        <div
          id="modal-sport"
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer z-10"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-8 md:p-12">
            <div className="inline-block bg-green/10 text-green font-bold px-4 py-1 rounded-full mb-6 text-sm">
              {PILLARS_DATA.sport.tag}
            </div>
            <h3 className="text-3xl font-black text-navy mb-2">
              {PILLARS_DATA.sport.modalTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              {PILLARS_DATA.sport.lead}
            </p>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Was wir anbieten:
            </h4>
            <ul className="space-y-3.5 mb-8 text-gray-700">
              {PILLARS_DATA.sport.services.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green/15 text-green flex items-center justify-center mr-3 mt-1 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>
                    <b className="text-navy">{item.name}:</b> {item.description}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Deine Ziele & Benefits:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-8 font-medium">
              {PILLARS_DATA.sport.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-lightgray p-4 rounded-xl flex items-center gap-2">
                  <span className="text-green font-bold">✓</span> {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSelectAndBook('1:1 Personal Training', 'CHF 120')}
                className="w-full bg-green text-white font-bold py-4 rounded-xl hover:bg-green-dark transition-colors cursor-pointer text-center"
              >
                Training im Kalender anfragen
              </button>
              <button
                type="button"
                onClick={handleGoToPrices}
                className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-light transition-colors cursor-pointer text-center"
              >
                Zu den Preisen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL: ERNÄHRUNG */}
      {activeModal === 'ernaehrung' && (
        <div
          id="modal-ernaehrung"
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer z-10"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-8 md:p-12">
            <div className="inline-block bg-green/10 text-green font-bold px-4 py-1 rounded-full mb-6 text-sm">
              {PILLARS_DATA.ernaehrung.tag}
            </div>
            <h3 className="text-3xl font-black text-navy mb-2">
              {PILLARS_DATA.ernaehrung.modalTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              {PILLARS_DATA.ernaehrung.lead}
            </p>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Was wir anbieten:
            </h4>
            <ul className="space-y-3.5 mb-8 text-gray-700">
              {PILLARS_DATA.ernaehrung.services.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green/15 text-green flex items-center justify-center mr-3 mt-1 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>
                    <b className="text-navy">{item.name}:</b> {item.description}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-navy text-xl mb-4 border-b border-gray-100 pb-2">
              Deine Ziele & Benefits:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-8 font-medium">
              {PILLARS_DATA.ernaehrung.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-lightgray p-4 rounded-xl flex items-center gap-2">
                  <span className="text-green font-bold">✓</span> {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSelectAndBook('Ernährungsberatung Erstgespräch', 'CHF 150')}
                className="w-full bg-green text-white font-bold py-4 rounded-xl hover:bg-green-dark transition-colors cursor-pointer text-center"
              >
                Ernährungs-Check im Kalender buchen
              </button>
              <button
                type="button"
                onClick={handleGoToPrices}
                className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-light transition-colors cursor-pointer text-center"
              >
                Zu den Preisen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: PREISE (Lightbox - Einfach Was und Preis) */}
      {activeModal === 'preise' && (
        <div
          id="modal-preise"
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green">
                Übersicht
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy mt-0.5">
                Preise &amp; Tarife
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Alle Preise in CHF</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10 cursor-pointer"
              aria-label="Schliessen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clean List: Einfach Was und Preis */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
            {LIGHTBOX_PRICES.map((categoryGroup) => (
              <div key={categoryGroup.category}>
                <h4 className="text-xs font-black uppercase tracking-wider text-green pb-2 border-b border-gray-100 mb-2">
                  {categoryGroup.category}
                </h4>
                <div className="divide-y divide-gray-100">
                  {categoryGroup.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 px-2 flex items-center justify-between gap-4 hover:bg-lightgray/70 rounded-lg transition-colors"
                    >
                      <span className="font-semibold text-navy text-sm sm:text-base">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                          {item.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSelectAndBook(item.name, item.price)}
                          className="text-xs font-bold bg-green/10 text-green hover:bg-green hover:text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          Buchen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 bg-lightgray/80 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span className="text-xs text-gray-500 text-center sm:text-left">
              Krankenkassen-Anerkennung je nach Zusatzversicherung möglich.
            </span>
            <button
              type="button"
              onClick={() => {
                handleClose();
                onOpenModal('booking');
              }}
              className="w-full sm:w-auto bg-green text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-navy transition-colors cursor-pointer text-center"
            >
              Termin anfragen
            </button>
          </div>
        </div>
      )}

      {/* 5. MODAL: BOOKING / TERMIN RESERVIEREN */}
      {activeModal === 'booking' && (
        <div
          id="modal-booking"
          className="bg-white w-full max-w-xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10 cursor-pointer"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green/20 text-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-navy mb-2">
                  Termin im Kalender vorgemerkt!
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto text-sm">
                  Vielen Dank, <b>{fullName || 'lieber Kunde'}</b>! Dein Termin für <b>{selectedService}</b> wurde im MSE-Kalendersystem registriert.
                </p>

                <div className="bg-lightgray p-5 rounded-2xl text-left text-xs sm:text-sm text-gray-700 space-y-2 mb-6 border border-gray-200/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green" />
                    <span><b>Datum &amp; Zeit:</b> {preferredDate} um {preferredTime} Uhr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green" />
                    <span><b>Praxisstandort:</b> {locationCity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green" />
                    <span><b>E-Mail:</b> {email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green" />
                    <span><b>Telefon:</b> {phone}</span>
                  </div>
                </div>

                {/* Instant Calendar Export Actions */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Jetzt in deinen Kalender eintragen:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={createGoogleCalendarUrl({
                        title: selectedService,
                        date: preferredDate,
                        timeSlot: preferredTime,
                        locationCity,
                        notes: message,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy hover:bg-navy-light text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-green" />
                      <span>Google Kalender</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        downloadIcsFile({
                          title: selectedService,
                          date: preferredDate,
                          timeSlot: preferredTime,
                          locationCity,
                          customerName: fullName,
                        })
                      }
                      className="bg-gray-100 hover:bg-gray-200 text-navy text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-green" />
                      <span>Apple / Outlook (.ics)</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-green text-white px-8 py-3 rounded-xl font-bold hover:bg-navy transition-colors cursor-pointer text-sm"
                >
                  Fertig
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-green/10 text-green font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Online-Terminkalender</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-navy mt-1">
                    Termin im Kalender buchen
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Wähle dein Angebot und deinen Wunschtermin in {locationCity}.
                  </p>
                </div>

                {/* Direct Google Calendar Notice if linked */}
                {calendarSettings.calendarUrl && (
                  <div className="mb-6 p-4 rounded-2xl bg-navy/5 border border-navy/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-navy flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-green" />
                        Direkt im Online-Kalender buchen:
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Sieh sofort alle freien Live-Termine in unserem Kalender.
                      </p>
                    </div>
                    <a
                      href={calendarSettings.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy hover:bg-green text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Im Kalender buchen</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Gewünschtes Angebot:
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm font-semibold text-navy"
                    >
                      <option value="MSE Startpaket (CHF 89)">MSE Startpaket – 30 Min. Gespräch + 30 Min. Massage (CHF 89)</option>
                      <option value="Sportmassage 60 Min (CHF 125)">Sportmassage 60 Min (CHF 125)</option>
                      <option value="Sportmassage Intensiv 90 Min (CHF 175)">Sportmassage Intensiv 90 Min (CHF 175)</option>
                      <option value="Klassische Massage 60 Min (CHF 120)">Klassische Massage 60 Min (CHF 120)</option>
                      <option value="Triggerpunkt / Faszien 45 Min (CHF 100)">Triggerpunkt / Faszien 45 Min (CHF 100)</option>
                      <option value="10er-Abo Massage 11x60 Min (CHF 1'125)">10er-Abo Massage (11x 60 Min) (CHF 1&apos;125)</option>
                      <option value="1:1 Personal Training 60 Min (CHF 120)">1:1 Personal Training 60 Min (CHF 120)</option>
                      <option value="10er-Block Personal Training (CHF 1'100)">10er-Block Personal Training (CHF 1&apos;100)</option>
                      <option value="Bewegungsanalyse 75 Min (CHF 160)">Bewegungs-/Haltungsanalyse 75 Min (CHF 160)</option>
                      <option value="Ernährungsberatung Erstgespräch (CHF 150)">Ernährungsberatung Erstgespräch 75 Min (CHF 150)</option>
                      <option value="Ernährung Folgekonsultation (CHF 90)">Ernährung Folgekonsultation 45 Min (CHF 90)</option>
                      <option value="Programm SCHMERZFREI 6 Wochen (CHF 690)">Programm SCHMERZFREI – 6 Wochen (CHF 690)</option>
                      <option value="Programm RESET 8 Wochen (CHF 1'290)">Programm RESET – 8 Wochen (CHF 1&apos;290)</option>
                      <option value="Programm PERFORMANCE 12 Wochen (CHF 1'890)">Programm PERFORMANCE – 12 Wochen (CHF 1&apos;890)</option>
                      <option value="Mitgliedschaft MSE Regular (CHF 195/mtl.)">Mitgliedschaft MSE Regular (CHF 195/mtl.)</option>
                      <option value="Mitgliedschaft MSE All-in-One (CHF 390/mtl.)">Mitgliedschaft MSE All-in-One (CHF 390/mtl.)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Wunschdatum im Kalender:
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Uhrzeit / Slot:
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm font-medium"
                      >
                        <option value="07:30">07:30 Uhr (Früher Slot)</option>
                        <option value="09:00">09:00 Uhr (Morgen)</option>
                        <option value="10:30">10:30 Uhr (Vormittag)</option>
                        <option value="12:00">12:00 Uhr (Mittag)</option>
                        <option value="13:30">13:30 Uhr (Nachmittag)</option>
                        <option value="15:00">15:00 Uhr (Nachmittag)</option>
                        <option value="16:30">16:30 Uhr (Nachmittag)</option>
                        <option value="18:00">18:00 Uhr (Abend-Slot)</option>
                        <option value="19:00">19:00 Uhr (Später Slot)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Vor- &amp; Nachname:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. Martina Meier"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        E-Mail:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="deine@email.ch"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Telefon:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+41 79 123 45 67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Bemerkungen / Aktuelle Beschwerden (optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="z.B. Nackenschmerzen seit 3 Wochen, Vorbereitung Halbmarathon, etc."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-navy focus:outline-none text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green text-white py-4 rounded-xl font-bold text-base hover:bg-navy transition-all shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Termin im Kalender reservieren</span>
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    Deine Daten werden vertraulich behandelt und direkt im Kalender reserviert.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. MODAL: KONTAKT / IMPRESSUM / DATENSCHUTZ */}
      {(activeModal === 'kontakt' || activeModal === 'impressum' || activeModal === 'datenschutz') && (
        <div
          className="bg-white w-full max-w-xl rounded-3xl shadow-2xl relative my-8 cursor-default overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-navy bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10 cursor-pointer"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-10 max-h-[80vh] overflow-y-auto">
            {activeModal === 'kontakt' && (
              <div>
                <h3 className="text-2xl font-black text-navy mb-4">Kontakt & Praxis</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Wir freuen uns, dich persönlich kennenzulernen. Gerne beantworten wir deine Fragen zu unseren Behandlungen, Trainings und Ernährungskonzepten.
                </p>

                <div className="space-y-4 text-sm text-gray-700 bg-lightgray p-6 rounded-2xl mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green shrink-0" />
                    <div>
                      <b>Praxisadresse:</b> {DEFAULT_PRACTICE_INFO.street}, 8000 {locationCity}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green shrink-0" />
                    <div>
                      <b>Telefon:</b> <a href={`tel:${DEFAULT_PRACTICE_INFO.phone}`} className="text-navy hover:underline">{DEFAULT_PRACTICE_INFO.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green shrink-0" />
                    <div>
                      <b>E-Mail:</b> <a href={`mailto:${DEFAULT_PRACTICE_INFO.email}`} className="text-navy hover:underline">{DEFAULT_PRACTICE_INFO.email}</a>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal('booking')}
                  className="w-full bg-green text-white py-3 rounded-xl font-bold hover:bg-navy transition-colors cursor-pointer"
                >
                  Direkt Termin vereinbaren
                </button>
              </div>
            )}

            {activeModal === 'impressum' && (
              <div>
                <h3 className="text-2xl font-black text-navy mb-4">Impressum</h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p><b>MSE – Massage, Sport &amp; Ernährung</b></p>
                  <p>{DEFAULT_PRACTICE_INFO.street}<br />{locationCity}<br />Schweiz</p>
                  <p><b>Vertretungsberechtigte Person:</b><br />Andrea Szabo (Inhaberin &amp; Gründerin)</p>
                  <p><b>Berufsbezeichnung:</b><br />{DEFAULT_PRACTICE_INFO.qualifications}</p>
                  <p><b>Kontakt:</b><br />E-Mail: {DEFAULT_PRACTICE_INFO.email}<br />Telefon: {DEFAULT_PRACTICE_INFO.phone}</p>
                  <p className="text-xs text-gray-400 pt-4 border-t">
                    Haftungsausschluss: Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'datenschutz' && (
              <div>
                <h3 className="text-2xl font-black text-navy mb-4">Datenschutzerklärung</h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten.
                  </p>
                  <p>
                    Wir halten diese Bestimmungen ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weitergegeben.
                  </p>
                  <p>
                    In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
                  </p>
                  <p className="text-xs text-gray-400 pt-4 border-t">
                    Stand: 2026. MSE – Massage, Sport & Ernährung.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
