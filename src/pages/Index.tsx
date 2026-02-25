import { useState, useEffect, useCallback } from "react";
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
import heroBg from "@/assets/hero-bg.jpg";
import roomImg from "@/assets/room.jpg";
import room2Img from "@/assets/room2.jpg";
import room3Img from "@/assets/room3.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import { MapPin, Phone, Star, Wifi, Car, Coffee, TreePine, Bike, Bed, Users, CookingPot, WashingMachine, Refrigerator, Bus, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: roomImg, alt: "Vícelůžkový pokoj" },
  { src: room2Img, alt: "Jednolůžkový pokoj" },
  { src: room3Img, alt: "Vybavení pokoje" },
  { src: kitchenImg, alt: "Kuchyňka" },
];

const PhotoCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-elevated max-w-3xl mx-auto">
      <div className="relative h-[28rem]">
        {photos.map((photo, i) => (
          <img
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 text-background rounded-full p-2 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 text-background rounded-full p-2 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-background/50"}`} />
        ))}
      </div>
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-background/80 text-sm font-body">{photos[current].alt}</p>
    </div>
  );
};

const reviews = [
  {
    name: "Сиргій Івагов",
    text: "Magické místo!!! Vstřícná hostitelka, dobré služby.",
    note: "Přeloženo Googlem · originál v ukrajinštině",
    rating: 5,
    time: "před 4 lety",
  },
  {
    name: "Petra Johana Simunkova",
    text: "",
    note: "Místní průvodce · 6 recenzí · 148 fotek",
    rating: 3,
    time: "před 6 měsíci",
  },
  {
    name: "Borislav Sashev",
    text: "Super",
    note: "",
    rating: 5,
    time: "před 11 lety",
  },
];

const amenities = [
  { icon: Wifi, label: "Wi-Fi zdarma" },
  { icon: Car, label: "Parkování před budovou" },
  { icon: CookingPot, label: "Kuchyňka na pokoji" },
  { icon: Refrigerator, label: "Lednice na pokoji" },
  { icon: WashingMachine, label: "Pračka k dispozici" },
  { icon: TreePine, label: "Zahrada s grilem" },
  { icon: Bike, label: "Cyklotrasy & úschovna kol" },
  { icon: Bus, label: "MHD – bus 172 a 104" },
];

const Index = () => {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AlertDialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rezervace je telefonická</AlertDialogTitle>
            <AlertDialogDescription>
              Ubytovnu U Vápenky lze rezervovat pouze telefonicky. Chcete zavolat na číslo{" "}
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">U Vápenky</h2>
            <p className="text-xs text-muted-foreground">Ubytovna Praha</p>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-body text-muted-foreground">
            <a href="#o-nas" className="hover:text-primary transition-colors">O nás</a>
            <a href="#pokoje" className="hover:text-primary transition-colors">Pokoje</a>
            <a href="#recenze" className="hover:text-primary transition-colors">Recenze</a>
            <a href="#kontakt" className="hover:text-primary transition-colors">Kontakt</a>
          </div>
          <button
            onClick={() => setReservationOpen(true)}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Rezervovat
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Ubytovna U Vápenky"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center px-6 animate-fade-up">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Praha – Velká Chuchle
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-accent mb-6 text-balance">
            Ubytovna U Vápenky
          </h1>
          <p className="text-accent/80 text-lg md:text-xl max-w-2xl mx-auto mb-6 font-body font-light">
            Levné krátkodobé i dlouhodobé ubytování rodinného typu v CHKO Barrandovských skal, nedaleko centra Prahy
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-accent/90 font-body text-sm">
            <span className="flex items-center gap-2"><Bed className="w-4 h-4" /> 10 pokojů</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 21 míst</span>
            <span className="font-semibold text-primary text-lg">od 150 Kč / os. / noc</span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            {/* Partial star – 30 % filled */}
            <span className="relative inline-block w-5 h-5">
              <Star className="w-5 h-5 text-primary absolute inset-0" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: "40%" }}>
                <Star className="w-5 h-5 fill-primary text-primary" />
              </span>
            </span>
            <span className="text-accent/70 ml-2 text-sm font-body">4,3 / 5 hodnocení</span>
          </div>
          <button
            onClick={() => setReservationOpen(true)}
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition-opacity shadow-warm"
          >
            Zarezervovat pobyt
          </button>
        </div>
      </section>

      {/* About */}
      <section id="o-nas" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">O nás</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Vaše útočiště v Praze
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
              Nabízíme levné krátkodobé i dlouhodobé ubytování v Praze 5 v ubytovně rodinného typu.
              K dispozici je 10 pokojů (1–3 lůžkových) s celkovou kapacitou 21 míst. Nacházíme se
              na okraji Velké Chuchle v CHKO Barrandovských skal, v těsné blízkosti technické památky
              UNESCO Petzoldova vápenka. Dobrá dostupnost MHD (autobus 172 ze Smíchovského nádraží).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.label}
                className="flex items-center gap-4 p-5 rounded-xl bg-card shadow-warm"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <amenity.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-body font-medium text-foreground">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms / Gallery */}
      <section id="pokoje" className="py-24 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">Pokoje</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Komfortní ubytování
            </h2>
            <p className="text-muted-foreground text-lg font-body">
              1–3 lůžkové pokoje s lednicí a internetem. Kuchyňka se sporákem, mikrovlnkou a rychlovarnou konvicí.
            </p>
            <p className="text-primary font-semibold font-body mt-2 text-lg">od 150 Kč / os. / noc</p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
              Fotky z ubytovny
            </h3>
            <PhotoCarousel />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="recenze" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">Recenze</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Co říkají naši hosté
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="p-8 rounded-2xl bg-card shadow-warm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                {review.text && (
                  <p className="text-foreground font-body mb-4 italic leading-relaxed">
                    "{review.text}"
                  </p>
                )}
                {review.note && (
                  <p className="text-xs text-muted-foreground font-body mb-4">{review.note}</p>
                )}
                <div>
                  <p className="font-display font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground font-body">{review.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="py-24 px-6 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3 font-body">Kontakt</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Kde nás najdete
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">Adresa</h4>
                  <p className="text-muted-foreground font-body">
                    V Dolích 40<br />
                    159 00 Praha – Velká Chuchle
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">Telefon</h4>
                  <a href="tel:257941286" className="text-primary font-body text-lg hover:underline">
                    257 941 286
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated h-64">
              <iframe
                src="https://maps.google.com/maps?q=V+Dol%C3%ADch+40,+Praha+Velk%C3%A1+Chuchle&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-foreground">
        <div className="container mx-auto max-w-5xl text-center">
          <h3 className="font-display text-2xl font-bold text-background mb-2">U Vápenky</h3>
          <p className="text-background/60 font-body text-sm mb-4">
            Jaroslava Hauzrová – Ubytovna Praha-Velká Chuchle
          </p>
          <p className="text-background/40 font-body text-xs">
            © {new Date().getFullYear()} Ubytovna U Vápenky. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
