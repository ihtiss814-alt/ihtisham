import { useState } from 'react';
import { MessageCircle, MoveRight } from 'lucide-react';

/* ─── Brand tokens ── */
const RED  = '#C8102E';
const DARK = '#1a1a1a';

const WA_LINK = 'https://wa.me/818089227375';

/* ─── Route definitions ─────────────────────────────────────── */
interface RouteConfig {
  id: string;
  label: string;          // button label, e.g. "EUROPE(RO-RO)"
  departurePorts: string[];
  arrivalPorts: string[];
  sampleRows: string[][];
}

const ROUTES: RouteConfig[] = [
  {
    id: 'europe-roro',
    label: 'EUROPE(RO-RO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:  ['Larnaca','Dublin','Southampton','Bremerhaven','Hanko','Limassol','Rotterdam','Valletta','Drammen','Le Havre','Antwerp','Amsterdam','Derince','Zeebrugge','Bristol','Newcastle'],
    sampleRows: [
      ['K-LINE','Bangkok Highway','150','Dec 16','-','-','-','-','-','-','-','-','-','-','Jan 30','-','O','-','-','-','-','-','-','-','O','O','-'],
      ['HOEGH','Hoegh Jeddah','60','-','-','Dec 23','-','-','-','-','Dec 21','-','Feb 9','Feb 8','-','-','-','-','Feb 3','-','Feb 4','-','Jan 30','-','-'],
      ['ARMACUP','Tugela','PE324','Dec 24','-','Dec 25','-','-','-','-','-','-','Feb 13','Feb 4','Feb 6','-','-','-','Feb 9','-','-','-','Jan 30','-','Jan 27'],
      ['HOEGH','Hoegh Trooper','203','Dec 28','-','-','Jan 2','-','-','Dec 30','-','Jan 24','Feb 22','O','-','O','-','-','Jan 27','-','Feb 17','-','Jan 17','-','Feb 12','-','Jan 15'],
      ['ARMACUP','Talisman','PW312','Dec 29','-','Dec 27','Dec 26','-','-','Dec 30','-','-','-','O','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['MOL','Prestige Ace','0192A','Jan 2','-','-','-','-','-','-','-','-','-','O','O','-','-','-','-','O','-','-','-','-','-','O','-'],
    ],
  },
  {
    id: 'asia-africa-roro',
    label: 'ASIA, AFRICA(RO-RO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:  ['Jebel Ali','Karachi','Port Louis','Durban','Dar','Mombasa','Maputo','Hambantota'],
    sampleRows: [
      ['NYK(AUTOHUB)','Auriga Leader','112','Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-','-','-','-','Jan 18','Dec 10'],
      ['NYK(YCS)','Auriga Leader','112','Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-','-','-','Dec 18','Dec 10'],
      ['NYK','Auriga Leader','112','Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-','Jan 12','Jan 10','-'],
      ['THE KEIHIN CO.,LTD.','Dream Diamond','34','Dec 19','-','-','Dec 19','Dec 20','-','Dec 22','-','-','-','Jan 10','Jan 12','-'],
      ['MOL(SUN PHOENIX)','Euphony Ace','0147A','Dec 19','-','-','-','Dec 22','-','-','Dec 18','-','-','Jan 10','Jan 12','-'],
      ['NYK','Hestia Leader','112','-','-','Dec 23','-','-','-','-','-','-','-','Jan 22','Jan 20','-'],
    ],
  },
  {
    id: 'black-sea-container',
    label: 'BLACK SEA(CONTAINER)',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:  ['Novorossiysk','Poti','Batumi'],
    sampleRows: [
      ['MSC','MSC Durban IV','HI350A','Dec 12','-','-','-','-','-','-','O','-'],
      ['MSC','MSC Kymea II','HX350A','-','-','-','-','-','-','-','O','-'],
      ['MSC','MSC Durban IV','HI350A','-','Dec 14','-','-','-','-','-','O','-'],
      ['MSC','MSC Odessa V','HI351A','Dec 19','-','-','-','-','-','-','O','-'],
      ['MSC','MSC Giannina II','HI351A','-','-','-','Dec 19','-','-','-','O','-'],
      ['MAERSK','Josephine Maersk','351S','Dec 19','-','-','-','-','-','-','O','-'],
      ['SINKOR','Estima','2314W','Dec 19','-','-','-','-','-','O','-','-'],
      ['MSC','MSC Lilou III','HG350A','-','-','-','Dec 20','-','-','-','O','-'],
    ],
  },
  {
    id: 'russia-fesco',
    label: 'RUSSIA(FESCO)',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Toyama','Maizuru','Hakata','Fukui','Otaru','Kisa Razu','Karatsu','Shinmoji','Imari','Naoetsu','Tomakomai','Hitachi Naka'],
    arrivalPorts:  ['Vladivostok'],
    sampleRows: [
      ['JAL','Olkhon','1','-','-','-','-','-','Jan 11 Cut:Dec 21','-','Jan 10 Cut:Dec 26','-','-','-','-','-','-','-','-','-'],
      ['MIRAI LINE','Sunstar','01-24','-','-','-','-','-','-','-','Jan 12','-','-','-','-','-','-','-','-','-'],
      ['MW-LINE','Swift','1','-','-','-','-','-','-','-','-','-','-','-','-','Jan 16','-','-','-','-'],
      ['JAL','Amur','1','-','-','-','-','-','-','-','-','-','-','-','Jan 17 Cut:Jan 09','Jan 12 Cut:Dec 26','-','-','-','-'],
      ['JAL','Angara','2','-','-','-','-','-','Jan 18 Cut:Jan 15','-','Jan 19 Cut:Jan 11','-','-','-','-','-','-','-','-','-'],
      ['DIV-AUTOLINE','Pacific Leader','1','-','-','-','-','-','-','-','-','-','-','-','-','-','-','Jan 18','-','-'],
      ['UNKNOWN','Kinteki Maru','-','-','-','-','-','-','-','-','-','-','Jan 19','-','-','-','-','-','-','-'],
    ],
  },
  {
    id: 'caribbean',
    label: 'CARIBBEAN',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:  ['Kingston','Nassau','Port Of Spain','George Town Guy','Paramaribo','Castries','Roseau','St Georges','St Johns','Aruba','Freeport TX','Tacoma','Savannah','Los Angeles','Jacksonville','Bridgetown','Basseterre','Kingstown'],
    sampleRows: [
      ['Yuwa Shipping Co.,Ltd.','Asian Emperor','ASM227','Dec 12','-','Dec 11','Dec 10','-','-','-','-','-','Jan 18','Jan 21','Jan 11','-','-','Jan 14','-','-','-','-','-','-','-','-','Jan 13','-','-'],
      ['HOEGH','Hoegh Tokyo','110','-','-','Dec 12','-','-','-','-','-','-','Jan 6','O','O','O','O','O','O','O','O','-','-','-','Jan 10','-','O','O','O'],
      ['Nissan Motor Car Carrier Co.,Ltd.','Sanderling Ace','113A','Dec 22','-','-','Dec 20','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','Jan 4','-','Jan 11','-','-','-','-'],
      ['K-LINE','Swan Ace','0126A','Dec 25','-','-','-','-','-','-','-','-','Jan 23','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['HOEGH','Hoegh Seoul','131','-','-','Dec 27','Dec 29','-','-','-','-','-','Jan 17','O','O','O','O','O','O','O','O','-','-','Feb 3','-','-','Feb 8','O','O','O'],
      ['MOL','Tranquil Ace','0109A','-','-','Dec 28','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
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
    label: 'EAST ASIA(RO-RO)',
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
    label: 'EAST ASIA(CONTAINER)',
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
    label: 'AFRICA(CONTAINER)',
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

/* ─── Table ─────────────────────────────────────────────────── */
function ShippingTable({ route }: { route: RouteConfig }) {
  const fixedCols = ['Company', 'Ship Name', 'Voyage'];
  const depCols   = route.departurePorts;
  const arrCols   = route.arrivalPorts;

  // Column pixel widths for sticky positioning
  const colWidths = [120, 140, 72]; // Company, Ship Name, Voyage

  return (
    <div className="overflow-x-auto" style={{ maxHeight: '520px', overflowY: 'auto' }}>
      <table
        className="border-collapse text-xs"
        style={{ minWidth: `${(fixedCols.length + depCols.length + 1 + arrCols.length) * 80}px` }}
      >
        <thead style={{ position: 'sticky', top: 0, zIndex: 30 }}>
          {/* Group header */}
          <tr>
            <th
              colSpan={fixedCols.length + depCols.length}
              className="text-center text-[11px] tracking-[0.18em] uppercase font-bold text-white px-4 py-2.5 border-r border-white/30"
              style={{ background: DARK }}
            >
              DEPARTURE PORT
            </th>
            {/* Arrow cell */}
            <th
              className="text-center px-2 py-2.5 border-r border-white/20"
              style={{ background: DARK, minWidth: 36 }}
            >
              <span className="text-white/60 text-sm">→</span>
            </th>
            <th
              colSpan={arrCols.length}
              className="text-center text-[11px] tracking-[0.18em] uppercase font-bold text-white px-4 py-2.5"
              style={{ background: DARK }}
            >
              ARRIVAL PORT
            </th>
          </tr>

          {/* Column names */}
          <tr style={{ background: '#2d2d2d' }}>
            {fixedCols.map((col, ci) => (
              <th
                key={ci}
                className="text-center text-[10px] tracking-wide font-semibold text-white whitespace-nowrap px-2.5 py-2 border-b border-white/10 border-r border-r-white/10 sticky z-20"
                style={{
                  left: colWidths.slice(0, ci).reduce((a, b) => a + b, 0),
                  minWidth: colWidths[ci],
                  background: '#2d2d2d',
                }}
              >
                {col}
              </th>
            ))}
            {depCols.map((col, ci) => (
              <th
                key={`dep-${ci}`}
                className="text-center text-[10px] tracking-wide font-semibold text-white whitespace-nowrap px-2.5 py-2 border-b border-white/10 border-r border-r-white/10"
                style={{ minWidth: 72, background: '#2d2d2d' }}
              >
                {col}
              </th>
            ))}
            {/* Arrow col header */}
            <th className="px-2 py-2 border-b border-white/10 border-r border-r-white/30" style={{ background: '#2d2d2d', minWidth: 36 }} />
            {arrCols.map((col, ci) => (
              <th
                key={`arr-${ci}`}
                className="text-center text-[10px] tracking-wide font-semibold text-white whitespace-nowrap px-2.5 py-2 border-b border-white/10 border-r border-r-white/10"
                style={{ minWidth: 72, background: '#2d2d2d' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {route.sampleRows.map((row, ri) => {
            const bg = ri % 2 === 0 ? '#ffffff' : '#f5f5f5';
            const allDataCols = [...fixedCols, ...depCols, '__arrow__', ...arrCols];

            return (
              <tr key={ri}>
                {allDataCols.map((_, ci) => {
                  const isFixed = ci < fixedCols.length;
                  const isArrow = ci === fixedCols.length + depCols.length;

                  if (isArrow) {
                    return (
                      <td
                        key={`arrow-${ri}`}
                        className="text-center px-1 border-b border-gray-200 border-r border-r-gray-300"
                        style={{ background: bg, minWidth: 36 }}
                      >
                        <span className="text-gray-400 text-xs">→</span>
                      </td>
                    );
                  }

                  // Map column index back to row data index (skip arrow)
                  const dataIdx = ci < fixedCols.length + depCols.length ? ci : ci - 1;
                  const val = row[dataIdx] ?? '-';
                  const isDash = val === '-';
                  const isO = val === 'O';

                  return (
                    <td
                      key={ci}
                      className={`text-center whitespace-nowrap px-2.5 py-[7px] border-b border-gray-200 border-r border-r-gray-100 text-[11px] ${
                        isFixed
                          ? 'sticky z-10 font-medium text-gray-800'
                          : isDash
                          ? 'text-gray-300'
                          : isO
                          ? 'text-gray-400'
                          : 'text-gray-700'
                      } ${ci === 0 ? 'font-semibold text-[10px]' : ''}`}
                      style={
                        isFixed
                          ? {
                              left: colWidths.slice(0, ci).reduce((a, b) => a + b, 0),
                              background: bg,
                              minWidth: colWidths[ci],
                            }
                          : { background: bg }
                      }
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ShippingInformationPage() {
  const [activeRoute, setActiveRoute] = useState('europe-roro');
  const current = ROUTES.find(r => r.id === activeRoute) ?? ROUTES[0];

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '127px' }}>

      {/* ── Page Title Strip ─────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ background: RED }} />
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Shipping Information
            </h1>
            <span className="text-xs text-gray-400 font-medium ml-1">
              — Japan to Worldwide
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">

        {/* ── Route Selector ──────────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {ROUTES.map((route) => {
              const active = route.id === activeRoute;
              return (
                <button
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className="px-3.5 py-2 text-[11px] font-bold tracking-wide border rounded-[2px] transition-all duration-150 cursor-pointer whitespace-nowrap"
                  style={
                    active
                      ? { background: RED, color: '#fff', borderColor: RED }
                      : {
                          background: '#fff',
                          color: RED,
                          borderColor: RED,
                          boxShadow: 'none',
                        }
                  }
                >
                  Shipping Info {route.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────── */}
        <div className="border border-gray-200 rounded-[3px] overflow-hidden shadow-sm mb-5">
          <ShippingTable route={current} />
        </div>

        {/* ── Note bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-amber-50 border border-amber-200 rounded-[3px] px-5 py-3.5 mb-8">
          <p className="text-sm text-amber-800 flex-1 leading-relaxed">
            <span className="font-bold">Note:</span>{' '}
            Shipping schedules are updated regularly. For the latest schedule and bookings please contact us directly on WhatsApp.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-[3px] text-white text-[11px] tracking-wide font-bold transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={14} />
            WhatsApp Us
          </a>
        </div>

        {/* ── Contact Section ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-[3px] overflow-hidden">
          {/* Header */}
          <div
            className="md:col-span-3 px-6 py-4 flex items-center gap-3 border-b border-gray-100"
            style={{ background: '#fafafa' }}
          >
            <div className="w-1 h-5 rounded-full" style={{ background: RED }} />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-bold" style={{ color: RED }}>
                Get in Touch
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                For shipping inquiries, quotations and bookings please contact us:
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
            <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-1.5">WhatsApp</p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-gray-800 hover:text-green-600 transition-colors text-sm"
            >
              <MessageCircle size={15} className="text-green-500 shrink-0" />
              +81 80-8922-7375
            </a>
          </div>

          {/* Email */}
          <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
            <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-1.5">Email</p>
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="font-bold text-gray-800 hover:text-blue-600 transition-colors text-sm break-all"
            >
              wazirtrading-pc@outlook.jp
            </a>
          </div>

          {/* Hours */}
          <div className="px-6 py-5">
            <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-1.5">Business Hours</p>
            <p className="font-bold text-gray-800 text-sm">Mon – Sat</p>
            <p className="text-gray-500 text-xs mt-0.5">9:00 AM – 6:00 PM  ·  Japan Standard Time</p>
          </div>
        </div>

      </div>
    </div>
  );
}
