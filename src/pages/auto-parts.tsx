import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight, Images, PackageCheck, Ship, X } from 'lucide-react';
import { useMeta } from '@/lib/use-meta';

const AUTO_PART_IMAGES = [
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229350/WhatsApp_Image_2026-09-12_at_5.40.38_PM_3_ktufxe.jpg',
    alt: 'Japanese auto parts prepared for export',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229350/WhatsApp_Image_2026-09-12_at_5.40.38_PM_5_ddfwee.jpg',
    alt: 'Auto parts inventory from Japan',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229350/WhatsApp_Image_2026-09-12_at_5.40.38_PM_6_qeqbs3.jpg',
    alt: 'Carefully handled Japanese vehicle components',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229350/WhatsApp_Image_2026-09-12_at_5.40.38_PM_2_sctfzx.jpg',
    alt: 'Vehicle components ready for a customer order',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229350/WhatsApp_Image_2026-09-12_at_5.40.38_PM_1_ijryqx.jpg',
    alt: 'Japanese auto parts at the Wazir Trading yard',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229351/WhatsApp_Image_2026-09-12_at_5.40.38_PM_4_winefm.jpg',
    alt: 'Export-ready auto parts selection',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229351/WhatsApp_Image_2026-09-12_at_5.40.38_PM_7_qzj4v1.jpg',
    alt: 'Vehicle parts handled for overseas buyers',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229353/WhatsApp_Image_2026-09-12_at_5.40.38_PM_kolqta.jpg',
    alt: 'Japanese dismantling and parts stock',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229353/WhatsApp_Image_2026-09-12_at_5.40.38_PM_8_avvqql.jpg',
    alt: 'Parts collection prepared for export',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229354/WhatsApp_Image_2026-09-12_at_5.40.39_PM_1_kabfxt.jpg',
    alt: 'Japanese auto parts export stock',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229576/WhatsApp_Image_2026-09-12_at_6.21.23_PM_ngza54.jpg',
    alt: 'Container loading preparation in Japan',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229576/WhatsApp_Image_2026-09-12_at_6.21.21_PM_swac0a.jpg',
    alt: 'Export order preparation at the yard',
  },
  {
    src: 'https://res.cloudinary.com/txb1wiw1/image/upload/v1789229576/WhatsApp_Image_2026-09-12_at_6.21.22_PM_cdtr4l.jpg',
    alt: 'Auto parts prepared for container shipment',
  },
];

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
const WA_MESSAGE =
  'Hello, I am interested in Japanese auto parts from Wazir Trading LLC.';
const WHATSAPP_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const ORDER_STEPS = [
  {
    number: '01',
    title: 'Share your requirements',
    description: 'Send the vehicle details, parts you need, and your destination country.',
  },
  {
    number: '02',
    title: 'Confirm availability',
    description: 'Our team checks the current stock and prepares a clear quotation for your order.',
  },
  {
    number: '03',
    title: 'Prepare for export',
    description: 'Approved parts are organized and prepared carefully for overseas shipment.',
  },
  {
    number: '04',
    title: 'Ship to your port',
    description: 'We coordinate the export process and keep you updated through loading and dispatch.',
  },
];

export default function AutoPartsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useMeta({
    title: 'Auto Parts & Dismantling Services | Wazir Trading LLC',
    description:
      'Source quality Japanese auto parts through Wazir Trading LLC. Share your requirements and we will prepare an export quotation for your destination.',
    canonical: 'https://www.wazirtradingllc.com/auto-parts',
  });

  useEffect(() => {
    if (selectedImage === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--header-h)' }}>
      <section className="relative overflow-hidden bg-[#0D1B3E] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,16,46,0.3),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[0.88fr_1.12fr] md:px-8 md:py-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#C8102E]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F2A0AE]">
                Auto parts & dismantling
              </span>
            </div>
            <h1 className="max-w-lg text-4xl font-bold leading-[1.05] md:text-6xl">
              Japanese parts, prepared for the world.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/65 md:text-lg">
              Source quality vehicle components from Japan with a team that
              understands careful handling, export preparation, and international
              shipping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#C8102E] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#A50D25]"
              >
                Request a quote
                <ArrowUpRight size={14} />
              </a>
              <a
                href="#parts-gallery"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                View gallery
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImage(0)}
            className="group relative min-h-[300px] overflow-hidden rounded-[3px] border border-white/15 bg-white/10 text-left shadow-2xl md:min-h-[490px]"
            aria-label="Open featured auto parts image"
          >
            <img
              src={AUTO_PART_IMAGES[0].src}
              alt={AUTO_PART_IMAGES[0].alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                Wazir Trading export stock
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D1B3E] transition-transform group-hover:scale-110">
                <Images size={17} />
              </span>
            </div>
          </button>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-100 px-4 py-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8 md:py-0">
          {[
            ['Export-focused orders', 'Parts prepared for international buyers'],
            ['Careful handling', 'Clear communication from request to loading'],
            ['Shipping support', 'A straightforward route from Japan to your port'],
          ].map(([title, description]) => (
            <div key={title} className="flex items-start gap-4 py-5 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#C8102E]" />
              <div>
                <h2 className="text-sm font-bold text-[#0D1B3E]">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Built around your order
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0D1B3E] md:text-4xl">
              Tell us what you need. We will help you source it.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-gray-600 md:text-base">
            <p>
              Whether you are sourcing replacement components or planning a
              larger export order, send us the vehicle details, part names, and
              destination. Our team will check availability and come back with
              the information needed for a quotation.
            </p>
            <p>
              The gallery below shows the type of stock and export preparation
              handled through Wazir Trading. Click any image to view it in full.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-[#C8102E] pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C8102E] transition-colors hover:text-[#A50D25]"
            >
              Start a parts enquiry
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section id="parts-gallery" className="bg-[#F7F7F5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                From Japan to your destination
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#0D1B3E] md:text-4xl">
                Auto parts gallery
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-500 md:text-right">
              A selection of real Wazir Trading stock and export preparation.
              Availability changes, so contact us with your exact request.
            </p>
          </div>

          <div className="grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4 md:gap-4">
            {AUTO_PART_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`group relative overflow-hidden rounded-[3px] bg-gray-200 text-left ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                aria-label={`Open gallery image ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading={index < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="absolute inset-0 bg-[#0D1B3E]/0 transition-colors group-hover:bg-[#0D1B3E]/20" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 text-[#0D1B3E] opacity-0 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={14} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
            A clear export process
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0D1B3E] md:text-4xl">
            From request to shipment
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[4px] border border-gray-200 bg-gray-200 md:grid-cols-4">
          {ORDER_STEPS.map((step) => (
            <div key={step.number} className="bg-white p-6 md:p-7">
              <span className="text-xs font-bold tracking-[0.2em] text-[#C8102E]">{step.number}</span>
              <h3 className="mt-5 text-base font-bold text-[#0D1B3E]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0D1B3E] px-4 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <PackageCheck size={21} className="text-[#F2A0AE]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F2A0AE]">
                Ready to source
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Have a part in mind?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Send the vehicle details, part description, and destination. We
              will help you take the next step.
            </p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-[2px] bg-[#C8102E] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#A50D25]"
          >
            Get a parts quote
            <Ship size={15} />
          </a>
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#071027]/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded auto parts image"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
            aria-label="Close expanded image"
          >
            <X size={20} />
          </button>
          <img
            src={AUTO_PART_IMAGES[selectedImage].src}
            alt={AUTO_PART_IMAGES[selectedImage].alt}
            className="max-h-full max-w-full rounded-[3px] object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
            {selectedImage + 1} / {AUTO_PART_IMAGES.length}
          </span>
        </div>
      )}
    </div>
  );
}