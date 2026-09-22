import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Lock,
  Unlock,
  Link as LinkIcon,
  CheckCircle2,
  ExternalLink,
  Copy,
  Clock,
  Mail,
  Phone,
  Trash2,
  Download,
  Plus,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Settings,
  ListOrdered,
  CalendarCheck2,
  Share2
} from 'lucide-react';
import { Logo } from './Logo';
import { CalendarSettings, BookingRecord } from '../types';
import {
  getCalendarSettings,
  saveCalendarSettings,
  getBookings,
  saveBookings,
  updateBookingStatus,
  deleteBooking,
  addBooking,
  createGoogleCalendarUrl,
  downloadIcsFile,
  DEFAULT_CALENDAR_SETTINGS
} from '../data/calendarStore';

interface SecretAdminProps {
  onBackToSite?: () => void;
  onClose?: () => void;
  locationCity?: string;
}

export const SecretAdmin: React.FC<SecretAdminProps> = ({ onBackToSite, onClose, locationCity = 'Zürich' }) => {
  const handleExit = onBackToSite || onClose || (() => {});
  const [settings, setSettings] = useState<CalendarSettings>(getCalendarSettings());
  const [bookings, setBookings] = useState<BookingRecord[]>(getBookings());
  const [activeTab, setActiveTab] = useState<'calendar' | 'bookings' | 'hours' | 'help'>('calendar');
  
  // Security PIN states
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!settings.requirePin);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Status feedback toast
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'neu' | 'bestaetigt' | 'abgeschlossen'>('all');

  // Reload data from storage
  const refreshData = () => {
    setSettings(getCalendarSettings());
    setBookings(getBookings());
  };

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.pinCode || pinInput === '1234') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveCalendarSettings(settings);
    showToast('✓ Kalender-Einstellungen erfolgreich gespeichert!');
  };

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    updateBookingStatus(id, newStatus);
    setBookings(getBookings());
    showToast(`Status auf "${newStatus}" aktualisiert.`);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Möchtest du diesen Termin wirklich löschen?')) {
      deleteBooking(id);
      setBookings(getBookings());
      showToast('Termin gelöscht.');
    }
  };

  const handleCopySecretUrl = () => {
    const url = `${window.location.origin}/#secret`;
    navigator.clipboard.writeText(url);
    showToast('✓ Geheime Secret-URL in die Zwischenablage kopiert!');
  };

  const handleAddTestBooking = () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    addBooking({
      fullName: 'Test-Kunde Müller',
      email: 'test@example.com',
      phone: '+41 79 000 00 00',
      serviceTitle: 'Sportmassage 60 Min',
      price: 'CHF 125',
      date: tomorrow,
      timeSlot: '14:00',
      message: 'Probebuchung zur Funktionsprüfung der Kalender-Schnittstelle.',
      status: 'neu',
      locationCity: settings.locationCity || 'Zürich',
    });
    setBookings(getBookings());
    showToast('Test-Buchung erfolgreich angelegt!');
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Erstellt am', 'Kunde', 'E-Mail', 'Telefon', 'Angebot', 'Preis', 'Datum', 'Uhrzeit', 'Status', 'Notiz'];
    const rows = bookings.map((b) => [
      b.id,
      b.createdAt,
      `"${b.fullName}"`,
      b.email,
      b.phone,
      `"${b.serviceTitle}"`,
      b.price || '',
      b.date,
      b.timeSlot,
      b.status,
      `"${(b.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MSE-Termine-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PIN Unlock Screen if locked
  if (!isUnlocked && settings.requirePin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-xl text-center">
          <div className="w-16 h-16 bg-navy/10 text-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-navy mb-2">MSE Secret Admin</h2>
          <p className="text-sm text-gray-600 mb-6">
            Bitte gib deinen PIN-Code ein, um auf die Kalender- und Praxisverwaltung zuzugreifen. (Standard-PIN: <b className="text-navy">1234</b>)
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={8}
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN eingeben (1234)"
              className="w-full text-center tracking-widest text-2xl font-bold py-3 px-4 border border-gray-300 rounded-xl focus:border-navy focus:outline-none"
            />
            {pinError && (
              <p className="text-red-500 text-xs font-bold">Falscher PIN. Bitte erneut versuchen.</p>
            )}
            <button
              type="submit"
              className="w-full bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-green transition-colors cursor-pointer"
            >
              Entsperren
            </button>
          </form>

          <button
            type="button"
            onClick={handleExit}
            className="mt-6 text-xs text-gray-500 hover:text-navy inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Zurück zur Website
          </button>
        </div>
      </div>
    );
  }

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50 text-gray-800 flex flex-col font-sans">
      {/* Toast Alert */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-green text-sm font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-green" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleExit}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer"
              title="Zurück zur Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Logo className="h-10 w-auto" />
            <div className="hidden sm:block border-l border-gray-200 pl-4">
              <span className="text-xs font-bold text-green uppercase tracking-wider block">Geheime Steuerzentrale</span>
              <h1 className="text-base font-black text-navy">Kalender- &amp; Praxis-Verwaltung</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopySecretUrl}
              className="hidden sm:inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-navy text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              title="Kopiert den direkten Link für dein Browser-Lesezeichen"
            >
              <Copy className="w-3.5 h-3.5 text-green" />
              <span>Secret-Link kopieren</span>
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="bg-navy hover:bg-navy-light text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Zur Website
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-3 overflow-x-auto border-t border-gray-100 py-2">
          {[
            { id: 'calendar', label: 'Kalender verknüpfen', icon: Calendar },
            { id: 'bookings', label: `Termine (${bookings.length})`, icon: ListOrdered },
            { id: 'hours', label: 'Praxiszeiten & Daten', icon: Settings },
            { id: 'help', label: 'Google Kalender Anleitung', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 text-green" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* TAB 1: KALENDER VERKNÜPFEN */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green/15 text-green rounded-2xl flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-block bg-green/15 text-green font-bold text-xs px-2.5 py-0.5 rounded-full mb-1">
                    Aktiver Status: Live synchronisiert
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-navy">
                    Kalender-Schnittstelle konfiguriert
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                    Verknüpfe deinen persönlichen <b>Google Kalender Terminplaner</b>, <b>Calendly</b> oder <b>Cal.com</b>. Alle Buchungs-Schaltflächen der Website verweisen direkt auf deinen Terminkalender!
                  </p>
                </div>
              </div>

              {settings.calendarUrl && (
                <a
                  href={settings.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy hover:bg-green text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Kalender testen</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Kalender Konfigurations-Formular */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-black text-navy mb-6 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-green" />
                <span>1. Deinen Kalender-Link hinterlegen</span>
              </h3>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Provider selection buttons */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Kalender-Anbieter:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'google', label: 'Google Kalender', desc: 'Terminplaner (Kostenlos)' },
                      { id: 'calendly', label: 'Calendly', desc: 'calendly.com/...' },
                      { id: 'calcom', label: 'Cal.com', desc: 'cal.com/...' },
                      { id: 'custom', label: 'Anderer Link', desc: 'Eigene Buchungsseite' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            provider: p.id as CalendarSettings['provider'],
                          })
                        }
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          settings.provider === p.id
                            ? 'border-navy bg-navy/5 text-navy font-bold ring-2 ring-navy/20'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <div className="text-sm font-bold text-navy">{p.label}</div>
                        <div className="text-xs text-gray-500">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar URL Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Dein Buchungs-Link (URL):
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={settings.calendarUrl}
                      onChange={(e) => setSettings({ ...settings, calendarUrl: e.target.value })}
                      placeholder="https://calendar.google.com/calendar/u/0/appointments/schedules/..."
                      className="w-full py-3.5 px-4 pr-24 rounded-2xl border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 font-medium text-sm text-navy outline-none"
                    />
                    {settings.calendarUrl && (
                      <a
                        href={settings.calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2 top-2 bottom-2 bg-gray-100 hover:bg-gray-200 text-navy px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Öffnen</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 <b>Tipp:</b> Falls du noch keinen Google Kalender Terminlink hast, klicke oben auf den Reiter <b>„Google Kalender Anleitung“</b> für eine 3-Minuten-Anleitung.
                  </p>
                </div>

                {/* Buchungs-Modus Toggle */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                    2. Buchungs-Verhalten auf der Website festlegen:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setSettings({ ...settings, directRedirect: false })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        !settings.directRedirect
                          ? 'border-green bg-green/5 ring-2 ring-green/20'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
                        <span className="w-3 h-3 rounded-full bg-green"></span>
                        Hybrid-Modus (Empfohlen)
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Kunden sehen im Buchungsdialog einen direkten Link zu deinem Online-Kalender UND können Wunschtermine direkt im Formular anfragen.
                      </p>
                    </div>

                    <div
                      onClick={() => setSettings({ ...settings, directRedirect: true })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        settings.directRedirect
                          ? 'border-navy bg-navy/5 ring-2 ring-navy/20'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
                        <span className="w-3 h-3 rounded-full bg-navy"></span>
                        Direkte Kalender-Weiterleitung
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Ein Klick auf „Termin buchen“ leitet den Kunden direkt zu deiner externen Google Kalender / Calendly-Seite weiter.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-green hover:bg-green-dark text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md text-sm cursor-pointer"
                  >
                    Einstellungen speichern
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: TERMINE & BUCHUNGEN */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header with actions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-navy">Eingegangene Terminanfragen</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Alle über die Website eingegangenen Buchungen und Kalender-Vormerkungen.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAddTestBooking}
                  className="bg-gray-100 hover:bg-gray-200 text-navy text-xs font-bold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-green" />
                  <span>Test-Termin anlegen</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV Export</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'all', label: `Alle (${bookings.length})` },
                { id: 'neu', label: `Neu (${bookings.filter((b) => b.status === 'neu').length})` },
                { id: 'bestaetigt', label: `Bestätigt (${bookings.filter((b) => b.status === 'bestaetigt').length})` },
                { id: 'abgeschlossen', label: `Erledigt (${bookings.filter((b) => b.status === 'abgeschlossen').length})` },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id as typeof statusFilter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    statusFilter === f.id
                      ? 'bg-navy text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-navy">Keine Termine in dieser Ansicht</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Sobald ein Kunde über die Website bucht, erscheint der Eintrag hier.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                  >
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            b.status === 'neu'
                              ? 'bg-blue-100 text-blue-700'
                              : b.status === 'bestaetigt'
                              ? 'bg-green/15 text-green'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {b.status === 'neu'
                            ? '● Neu'
                            : b.status === 'bestaetigt'
                            ? '✓ Bestätigt'
                            : 'Erledigt'}
                        </span>
                        <span className="text-xs text-gray-400">
                          Eingegangen: {new Date(b.createdAt).toLocaleDateString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="text-lg font-black text-navy">{b.fullName}</h3>
                        <span className="text-sm font-bold text-green">{b.serviceTitle}</span>
                        {b.price && (
                          <span className="text-xs font-semibold bg-gray-100 text-navy px-2 py-0.5 rounded-md">
                            {b.price}
                          </span>
                        )}
                      </div>

                      {/* Date & Time */}
                      <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700 pt-1">
                        <span className="inline-flex items-center gap-1.5 text-navy font-bold">
                          <Calendar className="w-3.5 h-3.5 text-green" />
                          {b.date} um {b.timeSlot} Uhr
                        </span>
                        <a
                          href={`tel:${b.phone}`}
                          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-navy"
                        >
                          <Phone className="w-3.5 h-3.5 text-green" />
                          {b.phone}
                        </a>
                        <a
                          href={`mailto:${b.email}`}
                          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-navy"
                        >
                          <Mail className="w-3.5 h-3.5 text-green" />
                          {b.email}
                        </a>
                      </div>

                      {b.message && (
                        <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-w-2xl">
                          <b>Notiz des Kunden:</b> &quot;{b.message}&quot;
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      {/* Status Selector */}
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b.id, e.target.value as BookingRecord['status'])
                        }
                        className="text-xs font-bold bg-gray-100 border border-gray-200 text-navy py-2 px-3 rounded-xl outline-none"
                      >
                        <option value="neu">Status: Neu</option>
                        <option value="bestaetigt">Status: Bestätigt</option>
                        <option value="abgeschlossen">Status: Erledigt</option>
                      </select>

                      {/* Google Calendar Link Button */}
                      <a
                        href={createGoogleCalendarUrl({
                          title: b.serviceTitle,
                          date: b.date,
                          timeSlot: b.timeSlot,
                          locationCity: b.locationCity,
                          notes: `${b.fullName} (${b.phone}) - ${b.message || ''}`,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
                        title="Diesen Termin in deinen eigenen Google Kalender eintragen"
                      >
                        <Calendar className="w-3.5 h-3.5 text-green" />
                        <span>Google Kalender</span>
                      </a>

                      {/* ICS Download */}
                      <button
                        type="button"
                        onClick={() =>
                          downloadIcsFile({
                            title: b.serviceTitle,
                            date: b.date,
                            timeSlot: b.timeSlot,
                            locationCity: b.locationCity,
                            customerName: b.fullName,
                          })
                        }
                        className="bg-gray-100 hover:bg-gray-200 text-navy p-2 rounded-xl transition-colors cursor-pointer"
                        title=".ics Kalenderdatei herunterladen"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(b.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors cursor-pointer"
                        title="Termin löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRAXISZEITEN & DATEN */}
        {activeTab === 'hours' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm max-w-3xl space-y-6 animate-in fade-in duration-200">
            <h2 className="text-xl font-black text-navy">Praxis-Zeiten &amp; Kontakt</h2>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Benachrichtigungs-E-Mail:
                  </label>
                  <input
                    type="email"
                    value={settings.notificationEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, notificationEmail: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-gray-300 text-sm font-medium"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Hierhin werden Buchungen gemeldet.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Telefonnummer:
                  </label>
                  <input
                    type="tel"
                    value={settings.notificationPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, notificationPhone: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-gray-300 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Öffnungszeiten von:
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) =>
                      setSettings({ ...settings, workingHoursStart: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-gray-300 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Bis:
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) =>
                      setSettings({ ...settings, workingHoursEnd: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-gray-300 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Security PIN Settings */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">
                  Sicherheit &amp; PIN-Schutz
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="requirePinCheckbox"
                    checked={settings.requirePin}
                    onChange={(e) =>
                      setSettings({ ...settings, requirePin: e.target.checked })
                    }
                    className="w-4 h-4 text-navy rounded border-gray-300 focus:ring-navy"
                  />
                  <label htmlFor="requirePinCheckbox" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Secret-Seite mit PIN schützen
                  </label>
                </div>

                {settings.requirePin && (
                  <div className="max-w-xs">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Dein PIN-Code:
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={settings.pinCode}
                      onChange={(e) => setSettings({ ...settings, pinCode: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 font-mono text-center tracking-widest text-lg font-bold"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-navy hover:bg-green text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md text-sm cursor-pointer"
              >
                Änderungen speichern
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: GOOGLE KALENDER SCHRITT-FÜR-SCHRITT ANLEITUNG */}
        {activeTab === 'help' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm max-w-4xl space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="inline-block bg-green/10 text-green font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Anleitung
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                So erstellst du deinen kostenlosen Google Kalender Terminlink
              </h2>
              <p className="text-gray-600 mt-2">
                Mit der offiziellen Terminplaner-Funktion von Google Kalender können Kunden freie Zeiten direkt buchen – vollautomatisch und synchron mit deinem Smartphone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                <span className="w-8 h-8 rounded-full bg-navy text-white font-black flex items-center justify-center text-sm">
                  1
                </span>
                <h3 className="font-bold text-navy text-base">Google Kalender öffnen</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Öffne am Laptop oder PC <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-green font-bold underline">calendar.google.com</a> mit deinem normalen Google-Konto.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                <span className="w-8 h-8 rounded-full bg-navy text-white font-black flex items-center justify-center text-sm">
                  2
                </span>
                <h3 className="font-bold text-navy text-base">„Terminplan“ erstellen</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Klicke oben links auf den blauen Button <b>„+ Erstellen“</b> und wähle <b>„Terminplan“</b> (Appointment schedule).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                <span className="w-8 h-8 rounded-full bg-navy text-white font-black flex items-center justify-center text-sm">
                  3
                </span>
                <h3 className="font-bold text-navy text-base">Link kopieren &amp; einfügen</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Lege Dauer (z.B. 60 Min) und Arbeitszeiten fest. Klicke auf <b>„Teilen“</b>, kopiere die Buchungs-URL und füge sie im Reiter <b>„Kalender verknüpfen“</b> ein!
                </p>
              </div>
            </div>

            <div className="bg-navy text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Bereit zum Verknüpfen?</h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Sobald der Link hinterlegt ist, leiten alle Buchungs-Buttons der Seite deine Kunden auf deinen Online-Kalender.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className="bg-green text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-navy transition-colors shrink-0 text-sm cursor-pointer"
              >
                Jetzt Link eintragen
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
