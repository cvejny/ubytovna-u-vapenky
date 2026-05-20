import { useState, useEffect, useCallback, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import gardenImg from "@/assets/garden.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import roomImg from "@/assets/room.jpg";
import room2Img from "@/assets/room2.jpg";
import room3Img from "@/assets/room3.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import {
  MapPin, Phone, Wifi, Car, TreePine, Bike, Bed, Users,
  CookingPot, WashingMachine, Refrigerator, Bus,
  ChevronLeft, ChevronRight,
} from "lucide-react";

/* ─── hooks ─────────────────────────────────────────────── */

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useNavScrolled(offset = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [offset]);
  return scrolled;
}

function useParallax(factor = 0.35) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handle = () => setOffset(window.scrollY * factor);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [factor]);
  return offset;
}

/* ─── data ───────────────────────────────────────────────── */

const photos = [
  { src: gardenImg, alt: "Zahrada s grilem" },
  { src: roomImg,   alt: "Vícelůžkový pokoj" },
  { src: room2Img,  alt: "Jednolůžkový pokoj" },
  { src: room3Img,  alt: "Vybavení pokoje" },
  { src: kitchenImg,alt: "Kuchyňka" },
];

const stats = [
  { value: "10",      label: "pokojů" },
  { value: "21",      label: "lůžek" },
  { value: "150 Kč",  label: "od / os. / noc" },
  { value: "Praha 5", label: "Velká Chuchle" },
];

const amenities = [
  { icon: Wifi,          label: "Wi-Fi zdarma" },
  { icon: Car,           label: "Parkování před budovou" },
  { icon: CookingPot,    label: "Kuchyňka na pokoji" },
  { icon: Refrigerator,  label: "Lednice na pokoji" },
  { icon: WashingMachine,label: "Pračka k dispozici" },
  { icon: TreePine,      label: "Zahrada s grilem" },
  { icon: Bike,          label: "Cyklotrasy & úschovna kol" },
  { icon: Bus,           label: "MHD – bus 172 a 104" },
];

const navLinks = [
  { label: "O nás",  href: "#o-nas" },
  { label: "Pokoje", href: "#pokoje" },
  { label: "Kontakt",href: "#kontakt" },
];

/* ─── carousel ───────────────────────────────────────────── */

const PhotoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-elevated max-w-3xl mx-auto select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[30rem]">
        {photos.map((p, i) => (
          <img
            key={p.alt}
            src={p.src}
            alt={p.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-foreground/60 to-transparent pointer-events-none" />
      </div>

      <button
        onClick={prev}
        aria-label="Předchozí"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-2.5 transition-all duration-200 shadow-warm backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Další"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground rounded-full p-2.5 transition-all duration-200 shadow-warm backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* pill dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-7 h-2.5" : "bg-background/50 hover:bg-background/80 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <p className="absolute bottom-4 right-4 text-background/80 text-xs font-body bg-foreground/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">
        {photos[current].alt}
      </p>
    </div>
  );
};

/* ─── page ───────────────────────────────────────────────── */

const Index = () => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const navScrolled   = useNavScrolled();
  const parallaxOffset = useParallax();

  const statsRef   = useScrollReveal();
  const aboutRef   = useScrollReveal();
  const amenRef    = useScrollReveal(0.08);
  const galleryRef = useScrollReveal();
  const contactRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── reservation dialog ─── */}
      <AlertDialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rezervace je telefonická</AlertDialogTitle>
            <AlertDialogDescription>
              Ubytovnu U Vápenky lze rezervovat pouze telefonicky. Chcete zavolat na číslo{" "}
              <span className="font-semibold text-foreground">257 941 286</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zavřít</AlertDialogCancel>
            <AlertDialogAction asChild>
              <a href="tel:257941286">Ano, zavolat</a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── nav ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-warm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div>
            <h2 className={`font-display text-xl font-bold transition-colors duration-300 ${navScrolled ? "text-foreground" : "text-background"}`}>
              U Vápenky
            </h2>
            <p className={`text-xs transition-colors duration-300 ${navScrolled ? "text-muted-foreground" : "text-background/70"}`}>
              Ubytovna Praha
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-body">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`transition-colors duration-300 hover:text-primary ${navScrolled ? "text-muted-foreground" : "text-background/80"}`}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setReservationOpen(true)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
              navScrolled
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-warm"
                : "bg-background/15 backdrop-blur-sm text-background border border-background/30 hover:bg-background/25"
            }`}
          >
            Rezervovat
          </button>
        </div>
      </nav>

      {/* ── hero ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* parallax bg */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.12)`, transformOrigin: "center top" }}
        >
          <img src={heroBg} alt="Ubytovna U Vápenky" className="w-full h-full object-cover" />
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/25 to-foreground/75" />

        {/* content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* location badge */}
          <div
            className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 text-background/90 text-xs tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-8 font-body animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <MapPin className="w-3 h-3 shrink-0" />
            Praha – Velká Chuchle · CHKO Barrandovských skal
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-background mb-6 leading-[1.05] text-balance animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Ubytovna<br />U&nbsp;Vápenky
          </h1>

          <p
            className="text-background/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-body font-light leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Levné krátkodobé i dlouhodobé ubytování rodinného typu, nedaleko centra Prahy
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <button
              onClick={() => setReservationOpen(true)}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-warm"
            >
              Zarezervovat pobyt
            </button>
            <a
              href="tel:257941286"
              className="flex items-center gap-2 bg-background/15 backdrop-blur-sm text-background border border-background/30 px-8 py-4 rounded-xl text-base font-medium hover:bg-background/25 transition-all duration-300 font-body"
            >
              <Phone className="w-4 h-4" />
              257&nbsp;941&nbsp;286
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-70">
          <div className="w-6 h-10 border-2 border-background/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-background/70 rounded-full animate-pulse-dot" />
          </div>
        </div>
      </section>

      {/* ── stats strip ─── */}
      <div ref={statsRef} className="reveal bg-primary py-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="transition-all duration-700"
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-primary-foreground/65 text-sm font-body mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── about ─── */}
      <section id="o-nas" className="py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <div ref={aboutRef} className="reveal text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">O nás</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Vaše útočiště v Praze
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
              Nabízíme levné krátkodobé i dlouhodobé ubytování v Praze&nbsp;5 v ubytovně rodinného typu.
              K dispozici je 10 pokojů (1–3 lůžkových) s celkovou kapacitou 21 míst. Nacházíme se
              na okraji Velké Chuchle v CHKO Barrandovských skal, v těsné blízkosti technické památky
              UNESCO – Petzoldovy vápenky. Dobrá dostupnost MHD (autobus&nbsp;172 ze Smíchovského nádraží).
            </p>
          </div>

          <div ref={amenRef} className="reveal grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((a, i) => (
              <div
                key={a.label}
                className="flex items-center gap-3 p-5 rounded-xl bg-card shadow-warm hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <a.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body font-medium text-foreground text-sm leading-snug">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── gallery ─── */}
      <section id="pokoje" className="py-28 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div ref={galleryRef} className="reveal text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">Pokoje & Prostory</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Komfortní ubytování
            </h2>
            <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto leading-relaxed">
              1–3 lůžkové pokoje s lednicí a internetem. Kuchyňka se sporákem, mikrovlnkou a rychlovarnou konvicí.
            </p>
            <p className="text-primary font-semibold font-body mt-4 text-2xl">od 150 Kč / os. / noc</p>
          </div>
          <PhotoCarousel />
        </div>
      </section>

      {/* ── contact ─── */}
      <section id="kontakt" className="py-28 px-6">
        <div className="container mx-auto max-w-4xl">
          <div ref={contactRef} className="reveal">
            <div className="text-center mb-16">
              <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">Kontakt</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Kde nás najdete
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">Adresa</h4>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      V Dolích 40<br />
                      159 00 Praha – Velká Chuchle
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">Telefon</h4>
                    <a href="tel:257941286" className="text-primary font-body text-lg hover:underline">
                      257 941 286
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setReservationOpen(true)}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-warm"
                >
                  Zarezervovat pobyt
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-elevated h-72 md:h-auto">
                <iframe
                  src="https://maps.google.com/maps?q=V+Dol%C3%ADch+40,+Praha+Velk%C3%A1+Chuchle&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "17rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa – Ubytovna U Vápenky"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── footer ─── */}
      <footer className="py-16 px-6 bg-foreground">
        <div className="container mx-auto max-w-5xl text-center">
          <h3 className="font-display text-3xl font-bold text-background mb-2">U Vápenky</h3>
          <p className="text-background/55 font-body text-sm mb-1">
            Jaroslava Hauzrová – Ubytovna Praha-Velká Chuchle
          </p>
          <p className="text-background/35 font-body text-xs mb-8">V Dolích 40, 159 00 Praha</p>
          <div className="border-t border-background/10 pt-6">
            <p className="text-background/25 font-body text-xs">
              © {new Date().getFullYear()} Ubytovna U Vápenky. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>

      {/* ── mobile floating CTA ─── */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <button
          onClick={() => setReservationOpen(true)}
          className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full shadow-elevated font-medium text-sm hover:opacity-90 hover:scale-105 transition-all duration-200"
        >
          Rezervovat
        </button>
      </div>
    </div>
  );
};

export default Index;
