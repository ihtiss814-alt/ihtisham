import { useState } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';

/* ─── Brand tokens ── */
const RED  = '#C8102E';
const NAVY = '#0D1B2A';

const WA_LINK = 'https://wa.me/818089227375';

/* ─── Route definitions ─────────────────────────────────────── */
interface RouteConfig {
  id: string;
  label: string;
  departurePorts: string[];
  arrivalPorts: string[];
  sampleRows: string[][];
}

const ROUTES: RouteConfig[] = [
  {
    id: 'europe-roro',
    label: 'EUROPE (RO-RO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:  ['Larnaca','Dublin','Southampton','Bremerhaven','Hanko','Limassol','Rotterdam','Valletta','Drammen','Le Havre','Antwerp','Amsterdam','Derince','Zeebrugge','Bristol','Newcastle'],
    sampleRows: [
      ['NYK Line','Morning Crown','0123E','08/05','08/06','08/09','08/11','08/12','08/14','-','-','08/16','09/02','-','09/06','09/08','-','09/12','09/10','09/15','09/13','09/16','-','09/14','-','-','09/17'],
      ['MOL','Pacific Venus','0124E','08/12','08/13','08/16','08/18','08/19','08/21','-','-','08/23','09/09','-','09/13','09/15','-','09/19','09/17','09/22','09/20','09/23','-','09/21','-','-','09/24'],
      ['K-Line','Apollo Leader','0125E','08/19','08/20','08/23','08/25','08/26','08/28','-','-','08/30','09/16','-','09/20','09/22','-','09/26','09/24','09/29','09/27','09/30','-','09/28','-','-','10/01'],
      ['EUKOR','Morning Claire','0126E','08/26','08/27','08/30','09/01','09/02','09/04','-','-','09/06','09/23','-','09/27','09/29','-','10/03','10/01','10/06','10/04','10/07','-','10/05','-','-','10/08'],
      ['Höegh','Hoegh Trigger','0127E','09/02','09/03','09/06','09/08','09/09','09/11','-','-','09/13','09/30','-','10/04','10/06','-','10/10','10/08','10/13','10/11','10/14','-','10/12','-','-','10/15'],
    ],
  },
  {
    id: 'asia-africa-roro',
    label: 'ASIA, AFRICA (RO-RO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:  ['Jebel Ali','Karachi','Port Louis','Durban','Dar','Mombasa','Maputo','Hambantota'],
    sampleRows: [
      ['NYK Line','Cougar Ace','0123A','08/04','08/05','08/08','08/10','08/11','08/13','08/14','-','-','08/16','09/01','09/05','09/12','09/18','09/22','09/26','09/24','09/08'],
      ['MOL','Thalassa Elpida','0124A','08/11','08/12','08/15','08/17','08/18','08/20','08/21','-','-','08/23','09/08','09/12','09/19','09/25','09/29','10/03','10/01','09/15'],
      ['K-Line','Grand Venus','0125A','08/18','08/19','08/22','08/24','08/25','08/27','08/28','-','-','08/30','09/15','09/19','09/26','10/02','10/06','10/10','10/08','09/22'],
      ['EUKOR','Morning Calypso','0126A','08/25','08/26','08/29','08/31','09/01','09/03','09/04','-','-','09/06','09/22','09/26','10/03','10/09','10/13','10/17','10/15','09/29'],
      ['Höegh','Hoegh Osaka','0127A','09/01','09/02','09/05','09/07','09/08','09/10','09/11','-','-','09/13','09/29','10/03','10/10','10/16','10/20','10/24','10/22','10/06'],
    ],
  },
  {
    id: 'black-sea-container',
    label: 'BLACK SEA (CONTAINER)',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:  ['Novorossiysk','Poti','Batumi'],
    sampleRows: [
      ['Evergreen','Ever Glory','0821','08/06','-','08/10','08/12','08/14','08/16','09/08','09/12','09/15'],
      ['Hapag-Lloyd','Osaka Express','0822','08/13','-','08/17','08/19','08/21','08/23','09/15','09/19','09/22'],
      ['MSC','MSC Osaka','0823','08/20','-','08/24','08/26','08/28','08/30','09/22','09/26','09/29'],
      ['ONE','One Competence','0824','08/27','-','08/31','09/02','09/04','09/06','09/29','10/03','10/06'],
      ['Yang Ming','YM Ubiquity','0825','09/03','-','09/07','09/09','09/11','09/13','10/06','10/10','10/13'],
    ],
  },
  {
    id: 'russia-fesco',
    label: 'RUSSIA (FESCO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Toyama','Maizuru','Hakata','Fukui','Otaru','Kisa Razu','Karatsu','Shinmoji','Imari','Naoetsu','Tomakomai','Hitachi Naka'],
    arrivalPorts:  ['Vladivostok'],
    sampleRows: [
      ['FESCO','Fesco Sakhalin','0823F','08/04','08/05','08/07','08/09','08/10','08/11','08/12','08/13','-','08/14','-','08/15','08/16','08/17','08/18','08/19','08/20','08/25'],
      ['FESCO','Fesco Uliss','0824F','08/11','08/12','08/14','08/16','08/17','08/18','08/19','08/20','-','08/21','-','08/22','08/23','08/24','08/25','08/26','08/27','09/01'],
      ['FESCO','Kapitan Afanasiev','0825F','08/18','08/19','08/21','08/23','08/24','08/25','08/26','08/27','-','08/28','-','08/29','08/30','08/31','09/01','09/02','09/03','09/08'],
      ['FESCO','Fesco Diomid','0826F','08/25','08/26','08/28','08/30','08/31','09/01','09/02','09/03','-','09/04','-','09/05','09/06','09/07','09/08','09/09','09/10','09/15'],
      ['FESCO','Fesco Sakhalin','0827F','09/01','09/02','09/04','09/06','09/07','09/08','09/09','09/10','-','09/11','-','09/12','09/13','09/14','09/15','09/16','09/17','09/22'],
    ],
  },
  {
    id: 'caribbean',
    label: 'CARIBBEAN',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:  ['Kingston','Nassau','Port Of Spain','George Town','Paramaribo','Castries','Roseau','St Georges','St Johns','Aruba','Freeport TX','Tacoma','Savannah','Los Angeles','Jacksonville','Bridgetown','Basseterre','Kingstown'],
    sampleRows: [
      ['NYK Line','Sunny Ace','0123C','08/05','08/06','08/09','08/11','08/12','08/14','-','-','08/17','09/10','09/14','09/18','09/20','09/22','09/24','09/25','09/26','09/27','09/28','09/05','09/08','09/12','09/03','09/14','09/29','09/30','10/01'],
      ['MOL','Atlantic Breeze','0124C','08/12','08/13','08/16','08/18','08/19','08/21','-','-','08/24','09/17','09/21','09/25','09/27','09/29','10/01','10/02','10/03','10/04','10/05','09/12','09/15','09/19','09/10','09/21','10/06','10/07','10/08'],
      ['K-Line','Caribbean Leader','0125C','08/19','08/20','08/23','08/25','08/26','08/28','-','-','08/31','09/24','09/28','10/02','10/04','10/06','10/08','10/09','10/10','10/11','10/12','09/19','09/22','09/26','09/17','09/28','10/13','10/14','10/15'],
      ['EUKOR','Morning Crown','0126C','08/26','08/27','08/30','09/01','09/02','09/04','-','-','09/07','10/01','10/05','10/09','10/11','10/13','10/15','10/16','10/17','10/18','10/19','09/26','09/29','10/03','09/24','10/05','10/20','10/21','10/22'],
      ['Höegh','Hoegh Treasure','0127C','09/02','09/03','09/06','09/08','09/09','09/11','-','-','09/14','10/08','10/12','10/16','10/18','10/20','10/22','10/23','10/24','10/25','10/26','10/03','10/06','10/10','10/01','10/12','10/27','10/28','10/29'],
    ],
  },
  {
    id: 'ns-america',
    label: 'N/S AMERICA',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:  ['Iquique','Asuncion','Vancouver','New Westminster'],
    sampleRows: [
      ['NYK Line','Pacific Eagle','0123N','08/04','08/05','08/08','08/10','08/11','08/13','08/14','-','-','08/17','09/14','09/25','08/28','08/30'],
      ['MOL','Thalassa Elia','0124N','08/11','08/12','08/15','08/17','08/18','08/20','08/21','-','-','08/24','09/21','10/02','09/04','09/06'],
      ['K-Line','Southern Cross Leader','0125N','08/18','08/19','08/22','08/24','08/25','08/27','08/28','-','-','08/31','09/28','10/09','09/11','09/13'],
      ['EUKOR','Morning Claire','0126N','08/25','08/26','08/29','08/31','09/01','09/03','09/04','-','-','09/07','10/05','10/16','09/18','09/20'],
      ['Höegh','Hoegh Seoul','0127N','09/01','09/02','09/05','09/07','09/08','09/10','09/11','-','-','09/14','10/12','10/23','09/25','09/27'],
    ],
  },
  {
    id: 'oceania',
    label: 'OCEANIA',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:  ['Brisbane','Port Kembla','Melbourne','Auckland','Wellington','Lyttelton','Suva','Lautoka','Port Moresby','Nelson','Adelaide','Fremantle','Darwin'],
    sampleRows: [
      ['NYK Line','Tauranga Express','0123O','08/04','08/05','08/08','08/10','08/11','08/13','-','-','08/15','08/24','08/28','09/01','09/05','09/08','09/11','09/18','09/16','08/22','09/13','09/20','09/25','09/10'],
      ['MOL','Kiwi Arrow','0124O','08/11','08/12','08/15','08/17','08/18','08/20','-','-','08/22','08/31','09/04','09/08','09/12','09/15','09/18','09/25','09/23','08/29','09/20','09/27','10/02','09/17'],
      ['K-Line','Aurora Leader','0125O','08/18','08/19','08/22','08/24','08/25','08/27','-','-','08/29','09/07','09/11','09/15','09/19','09/22','09/25','10/02','09/30','09/05','09/27','10/04','10/09','09/24'],
      ['EUKOR','Morning Calm','0126O','08/25','08/26','08/29','08/31','09/01','09/03','-','-','09/05','09/14','09/18','09/22','09/26','09/29','10/02','10/09','10/07','09/12','10/04','10/11','10/16','10/01'],
      ['Höegh','Hoegh Sydney','0127O','09/01','09/02','09/05','09/07','09/08','09/10','-','-','09/12','09/21','09/25','09/29','10/03','10/06','10/09','10/16','10/14','09/19','10/11','10/18','10/23','10/08'],
    ],
  },
  {
    id: 'middle-east',
    label: 'MIDDLE EAST',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Tokyo','Hakata','Hitachi Naka'],
    arrivalPorts:  ['Karachi','Famagusta'],
    sampleRows: [
      ['NYK Line','Arabian Leader','0123M','08/05','-','08/09','08/11','08/06','08/13','08/15','09/01','09/10'],
      ['MOL','Cape Orchid','0124M','08/12','-','08/16','08/18','08/13','08/20','08/22','09/08','09/17'],
      ['K-Line','Grand Coral','0125M','08/19','-','08/23','08/25','08/20','08/27','08/29','09/15','09/24'],
      ['EUKOR','Morning Queen','0126M','08/26','-','08/30','09/01','08/27','09/03','09/05','09/22','10/01'],
      ['Höegh','Hoegh Dubai','0127M','09/02','-','09/06','09/08','09/03','09/10','09/12','09/29','10/08'],
    ],
  },
  {
    id: 'east-asia-roro',
    label: 'EAST ASIA (RO-RO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:  ['Hong Kong','Laem Chabang','Hambantota','Chittagong','Mongla','Subic'],
    sampleRows: [
      ['NYK Line','Andromeda Leader','0123EA','08/04','08/05','08/08','08/10','08/11','08/13','08/14','-','08/16','08/19','08/24','08/28','09/02','09/05','08/22'],
      ['MOL','Orion Leader','0124EA','08/11','08/12','08/15','08/17','08/18','08/20','08/21','-','08/23','08/26','08/31','09/04','09/09','09/12','08/29'],
      ['K-Line','Bali Arrow','0125EA','08/18','08/19','08/22','08/24','08/25','08/27','08/28','-','08/30','09/02','09/07','09/11','09/16','09/19','09/05'],
      ['EUKOR','Morning Hero','0126EA','08/25','08/26','08/29','08/31','09/01','09/03','09/04','-','09/06','09/09','09/14','09/18','09/23','09/26','09/12'],
      ['Höegh','Hoegh Bangkok','0127EA','09/01','09/02','09/05','09/07','09/08','09/10','09/11','-','09/13','09/16','09/21','09/25','09/30','10/03','09/19'],
    ],
  },
  {
    id: 'east-asia-container',
    label: 'EAST ASIA (CONTAINER)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:  ['Huangpu','Yangon','Laem Chabang','Ulaanbaatar','Zamin Uud'],
    sampleRows: [
      ['Evergreen','Ever Lambent','0821E','08/06','08/07','08/10','08/12','08/13','08/15','08/17','08/22','08/28','09/05','09/12','09/15'],
      ['Hapag-Lloyd','Bangkok Express','0822E','08/13','08/14','08/17','08/19','08/20','08/22','08/24','08/29','09/04','09/12','09/19','09/22'],
      ['MSC','MSC Bangkok','0823E','08/20','08/21','08/24','08/26','08/27','08/29','08/31','09/05','09/11','09/19','09/26','09/29'],
      ['ONE','One Commitment','0824E','08/27','08/28','08/31','09/02','09/03','09/05','09/07','09/12','09/18','09/26','10/03','10/06'],
      ['Yang Ming','YM Warranty','0825E','09/03','09/04','09/07','09/09','09/10','09/12','09/14','09/19','09/25','10/03','10/10','10/13'],
    ],
  },
  {
    id: 'africa-container',
    label: 'AFRICA (CONTAINER)',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:  ['Mombasa','Dar Es Salaam','Port Louis','Matadi','Walvis Bay','Nacala','Maputo','Durban','Berbera','Beira'],
    sampleRows: [
      ['Evergreen','Ever Lissome','0821A','08/07','-','08/11','08/13','08/15','08/17','09/05','09/09','09/14','09/20','09/24','09/27','09/30','09/18','09/22','09/28'],
      ['MSC','MSC Africa','0822A','08/14','-','08/18','08/20','08/22','08/24','09/12','09/16','09/21','09/27','10/01','10/04','10/07','09/25','09/29','10/05'],
      ['Hapag-Lloyd','Nairobi Express','0823A','08/21','-','08/25','08/27','08/29','08/31','09/19','09/23','09/28','10/04','10/08','10/11','10/14','10/02','10/06','10/12'],
      ['ONE','One Continuity','0824A','08/28','-','09/01','09/03','09/05','09/07','09/26','09/30','10/05','10/11','10/15','10/18','10/21','10/09','10/13','10/19'],
      ['CMA CGM','CMA CGM Mombasa','0825A','09/04','-','09/08','09/10','09/12','09/14','10/03','10/07','10/12','10/18','10/22','10/25','10/28','10/16','10/20','10/26'],
    ],
  },
];

/* ─── Shipping Table ─────────────────────────────────────────── */
function ShippingTable({ route }: { route: RouteConfig }) {
  const depCols  = ['Company', 'Ship Name', 'Voyage', ...route.departurePorts];
  const arrCols  = route.arrivalPorts;
  const allCols  = [...depCols, ...arrCols];

  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200 shadow-sm">
      <table className="text-xs border-collapse" style={{ minWidth: `${allCols.length * 88}px` }}>
        <thead>
          {/* Section header row */}
          <tr>
            <th
              colSpan={depCols.length}
              className="px-3 py-2 text-center text-[10px] tracking-widest uppercase font-bold text-white border-r border-white/20"
              style={{ background: NAVY }}
            >
              ✈ DEPARTURE — Japan
            </th>
            <th
              colSpan={arrCols.length}
              className="px-3 py-2 text-center text-[10px] tracking-widest uppercase font-bold text-white"
              style={{ background: RED }}
            >
              → ARRIVAL — Destination
            </th>
          </tr>
          {/* Column names */}
          <tr style={{ background: '#1e2d3d' }}>
            {allCols.map((col, ci) => {
              const isSticky = ci < 3;
              const isLast   = ci === depCols.length - 1;
              return (
                <th
                  key={ci}
                  className={`px-2.5 py-2.5 text-center text-[10px] tracking-wide font-semibold text-white whitespace-nowrap border-b border-white/10 ${
                    isSticky ? 'sticky z-10' : ''
                  } ${isLast ? 'border-r-2 border-r-white/20' : ''}`}
                  style={isSticky ? { left: ci === 0 ? 0 : ci === 1 ? 100 : 200, background: '#1e2d3d' } : {}}
                >
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {route.sampleRows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              {allCols.map((_, ci) => {
                const val      = row[ci] ?? '-';
                const isSticky = ci < 3;
                const isLast   = ci === depCols.length - 1;
                const bg       = ri % 2 === 0 ? '#ffffff' : '#f9fafb';
                return (
                  <td
                    key={ci}
                    className={`px-2.5 py-2 text-center whitespace-nowrap border-b border-gray-100 ${
                      isSticky ? 'sticky z-10 font-medium text-gray-800' : 'text-gray-700'
                    } ${ci === 0 ? 'font-semibold' : ''} ${val === '-' ? 'text-gray-300' : ''} ${
                      isLast ? 'border-r-2 border-r-gray-200' : ''
                    }`}
                    style={isSticky ? { left: ci === 0 ? 0 : ci === 1 ? 100 : 200, background: bg } : {}}
                  >
                    {val === 'O' ? <span className="text-gray-400 font-medium">O</span> : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ShippingInformationPage() {
  const [activeRoute, setActiveRoute] = useState('asia-africa-roro');
  const current = ROUTES.find(r => r.id === activeRoute) ?? ROUTES[1];

  const waLink = WA_LINK;

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: '127px' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{ background: NAVY }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center">
          <p className="text-[10px] tracking-[0.32em] uppercase font-bold mb-4" style={{ color: RED }}>
            Wazir Trading LLC
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shipping Information
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Global shipping schedules from Japan to worldwide destinations
          </p>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* ── Route tabs ──────────────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-[10px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: RED }}>
            Select Route
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {ROUTES.map((route) => {
              const active = route.id === activeRoute;
              return (
                <button
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className="px-3 py-2.5 rounded-[3px] text-[10.5px] font-bold tracking-wide text-center leading-tight transition-all duration-150 cursor-pointer"
                  style={active
                    ? { background: RED, color: '#fff', border: `1.5px solid ${RED}`, boxShadow: `0 4px 12px ${RED}40` }
                    : { background: '#fff', color: RED, border: `1.5px solid ${RED}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
                  }
                >
                  {route.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table card ──────────────────────────────────────────── */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden mb-6">
          {/* Table header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3
                className="font-bold text-lg text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {current.label}
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {current.departurePorts.length} departure ports → {current.arrivalPorts.length} arrival ports
              </p>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full" style={{ background: `${RED}12`, color: RED }}>
              Sample Schedule
            </span>
          </div>

          <div className="p-4 md:p-5">
            <ShippingTable route={current} />
          </div>
        </div>

        {/* ── Note + WhatsApp ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 bg-amber-50 border border-amber-200 rounded-sm px-5 py-4">
          <p className="text-sm text-amber-800 flex-1">
            <span className="font-semibold">Note:</span> Shipping schedules are updated regularly. For the most current schedule please contact us on WhatsApp.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-[3px] text-white text-[11px] tracking-wide font-bold transition-colors duration-150 hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={14} />
            WhatsApp Us
          </a>
        </div>

        {/* ── Contact notice box ───────────────────────────────────── */}
        <div className="rounded-sm overflow-hidden shadow-md" style={{ background: NAVY }}>
          <div className="px-6 pt-5 pb-2 border-b border-white/10">
            <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: RED }}>
              Get in Touch
            </p>
            <h3
              className="text-white font-bold text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shipping Inquiries & Quotations
            </h3>
            <p className="text-white/50 text-sm mt-1">
              For shipping inquiries and quotations please contact us:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* WhatsApp */}
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-white/40">WhatsApp</span>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-base hover:text-green-400 transition-colors"
              >
                +81 80-8922-7375
              </a>
            </div>

            {/* Email */}
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-white/40">Email</span>
              <a
                href="mailto:wazirtrading-pc@outlook.jp"
                className="text-white font-bold text-base hover:text-blue-400 transition-colors break-all"
              >
                wazirtrading-pc@outlook.jp
              </a>
            </div>

            {/* Hours */}
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-white/40">Business Hours</span>
              <p className="text-white font-bold text-base">Mon – Sat</p>
              <p className="text-white/60 text-sm">9 AM – 6 PM Japan Standard Time</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
