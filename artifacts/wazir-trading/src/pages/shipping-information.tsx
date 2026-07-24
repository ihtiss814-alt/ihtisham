import { useState, useRef } from 'react';
import { MessageCircle, Mail, ChevronRight, ArrowRight, Ship, Info } from 'lucide-react';

/* ─── Brand ──────────────────────────────────────────────────────── */
const NAVY = '#0D1B3E';
const RED  = '#C8102E';
const WA_LINK = 'https://wa.me/818089227375';

/* ─── Route definitions ──────────────────────────────────────────── */
interface RouteConfig {
  id: string;
  short: string;    // short label for tabs
  label: string;    // full label for card header
  type: 'RO-RO' | 'Container' | 'Mixed';
  departurePorts: string[];
  arrivalPorts: string[];
  rows: string[][];
}

const ROUTES: RouteConfig[] = [
  {
    id: 'europe-roro',
    short: 'Europe',
    label: 'EUROPE (RO-RO)',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:   ['Larnaca','Dublin','Southampton','Bremerhaven','Hanko','Limassol','Rotterdam','Valletta','Drammen','Le Havre','Antwerp','Amsterdam','Derince','Zeebrugge','Bristol','Newcastle'],
    rows: [
      ['K-LINE',          'Bangkok Highway',   '150',   'Dec 16','-','-','-','-','-','-','-',        '-',    '-',    'Jan 30','-','O','-','-','-','-','-','-','-','O','O','-'],
      ['HOEGH',           'Hoegh Jeddah',      '60',    '-','-','Dec 23','-','-','-','-','Dec 21',   '-',    'Feb 9','Feb 8','-','-','-','-','Feb 3','-','Feb 4','-','Jan 30','-','-'],
      ['ARMACUP',         'Tugela',            'PE324', 'Dec 24','-','Dec 25','-','-','-','-','-',   '-',    'Feb 13','Feb 4','Feb 6','-','-','-','Feb 9','-','-','-','Jan 30','-','Jan 27'],
      ['HOEGH',           'Hoegh Trooper',     '203',   'Dec 28','-','-','Jan 2','-','-','Dec 30','-','Jan 24','Feb 22','O','-','O','-','-','Jan 27','-','Feb 17','-','Jan 17','-','Feb 12','-','Jan 15'],
      ['ARMACUP',         'Talisman',          'PW312', 'Dec 29','-','Dec 27','Dec 26','-','-','Dec 30','-', '-',    '-','O','-','-','-','-','-','-','-','-','-','-','-'],
      ['MOL',             'Prestige Ace',      '0I92A', 'Jan 2','-','-','-','-','-','-','-',         '-',    '-','O','O','-','-','-','-','O','-','-','-','-','-','O','-'],
      ['ARMACUP',         'Morning Laura',     'PE401', 'Jan 17','-','-','-','-','-','-','-',        '-',    'Mar 5','Mar 2','-','-','-','-','-','-','-','-','Feb 23','-','-'],
      ['ARMACUP',         'Tamerlane',         'PF402', '-','-','-','Jan 24','-','-','-','-',        '-',    '-','O','-','-','-','-','-','-','-','-','-','-','-'],
      ['HOEGH',           'Hoegh Tracer',      '47',    'Jan 25','-','-','Jan 29','-','-','Jan 25','-','Mar 24','Apr 4','Apr 4','-','-','O','-','Mar 14','-','Mar 30','-','Mar 30','-','Mar 25','-','Mar 28'],
      ['MOL',             'Sanderling Ace',    '0I14A', 'Jan 29','-','-','-','-','-','-','-',        '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['ARMACUP',         'Parsifal',          'PW401', 'Jan 30','-','-','Jan 26','-','-','-','-',   '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['Yuwa Shipping',   'Morning Concert',   '407',   'Jan 30','-','-','-','-','-','-','-',        '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['Yuwa Shipping',   'Morning Composer',  '407',   '-','-','Feb 3','Feb 4','-','Feb 6','-','-', '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['ARMACUP',         'Morning Linda',     'PE402', 'Feb 6','-','Feb 8','-','-','-','-','-',     '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['ARMACUP',         'Porgy',             'PT402', '-','-','Feb 8','-','-','-','-','-',         '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['ARMACUP',         'Tuuca',             'PE403', 'Feb 11','-','-','-','-','-','-','-',        '-',    '-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['HOEGH',           'Hoegh Trigger',     '49',    '-','-','Feb 12','-','Feb 15','-','-','-',   '-',    'Apr 13','-','-','O','-','-','-','Apr 8','-','O','-','Apr 3','-','Apr 6'],
      ['HOEGH',           'Hoegh Asia',        '171',   'Feb 18','-','Feb 20','-','Feb 17','-','-','-','Apr 20','-','-','O','-','-','-','Apr 10','-','Apr 28','-','Apr 23','-','-','Apr 21'],
      ['ARMACUP',         'TBA Armacup',       '-',     '-','O','-','-','-','-','-','-',             '-',    '-','-','-','-','-','-','-','-','-','-','O','-','-','-'],
    ],
  },
  {
    id: 'asia-africa-roro',
    short: 'Asia & Africa',
    label: 'ASIA & AFRICA (RO-RO)',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:   ['Jebel Ali','Karachi','Port Louis','Durban','Dar','Mombasa','Maputo','Hambantota'],
    rows: [
      ['NYK(AUTOHUB)',               'Auriga Leader',     '112',   'Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-',         '-',    '-',    '-',    'Jan 18','Dec 10'],
      ['NYK(YCS)',                   'Auriga Leader',     '112',   'Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-',         '-',    '-',    '-',    'Dec 18','Dec 10'],
      ['NYK',                        'Auriga Leader',     '112',   'Dec 12','-','Dec 16','Dec 15','Dec 14','-','-','-','-','-',         'Jan 12','Jan 10','-', '-',    '-'],
      ['THE KEIHIN CO.,LTD.',        'Dream Diamond',     '34',    'Dec 19','-','-','Dec 19','Dec 20','-','Dec 22','-','-','-',         'Jan 10','Jan 12','-', '-',    '-'],
      ['MOL(SUN PHOENIX)',           'Euphony Ace',       '0147A', 'Dec 19','-','-','-','Dec 22','-','-','Dec 18','-','-',             'Jan 10','Jan 12','-', '-',    '-'],
      ['NYK',                        'Hestia Leader',     '112',   '-','-','Dec 23','-','-','-','-','-','-','-',                       'Jan 22','Jan 20','-', '-',    '-'],
      ['THE KEIHIN CO.,LTD.',        'Morning Celine',    '132',   'Dec 25','-','-','-','-','-','-','-','-','-',                       'Jan 26','Jan 27','-', '-',    '-'],
      ['HOEGH',                      'Hoegh Brasilia',    '114',   'Dec 26','-','Dec 29','-','Dec 30','-','Dec 27','-','-','-',         'Jan 23','Jan 31','Feb 3','Jan 26','-','-'],
      ['MOL',                        'Liberty Ace',       '0149A', 'Dec 27','-','Dec 29','Dec 30','-','-','Dec 28','-','-','-',         'Jan 18','Jan 27','Jan 29','Jan 22','-','-'],
      ['MOL(AUTOHUB)',               'Liberty Ace',       '0149A', 'Dec 27','-','Dec 29','Dec 30','-','-','Dec 28','-','-','-',         'Jan 21','Jan 27','Jan 29','Jan 22','-','-'],
      ['THE KEIHIN CO.,LTD.',        'Morning Celesta',   '143',   '-','-','Dec 28','Dec 29','-','Dec 31','-','-','Dec 26','-',         '-',    '-',    'Jan 27','Jan 26','-','-'],
      ['SEVEN SEALS CO.,LTD',        'Shanghai Highway',  '170',   'Jan 2','-','Jan 3','Jan 5','Jan 4','-','-','-','-','-',             '-',    '-',    'Jan 31','Feb 3', '-','-'],
      ['ARMACUP',                    'Bergamot Ace',      '0I34A', 'Jan 12','-','-','Jan 11','-','Jan 13','Jan 15','-','-','-',         'Jan 31','Feb 11','Feb 16','Feb 18','Feb 6','-'],
      ['NYK',                        'Garnet Leader',     '119',   'Jan 15','-','Jan 20','Jan 19','Jan 18','-','-','-','-','-',         'Feb 22','Feb 14','Feb 11','-',    '-','-'],
      ['THE KEIHIN CO.,LTD.',        'Arabian Sea',       '-',     'Jan 19','-','Jan 18','Jan 17','Jan 15','-','-','-','-','-',         'Feb 11','Feb 9', '-',    '-',    '-','-'],
      ['MOL(INTEROCEAN)',            'Onyx Ace',          '0I02A', 'Jan 20','-','-','Jan 22','-','Jan 24','-','Jan 21','-','-',         'Feb 10','Feb 12','-',   '-',    '-','-'],
      ['HOEGH',                      'Hoegh Trident',     '208',   'Jan 21','-','-','-','-','Jan 23','-','-','-','Jan 20',             'Feb 23','Feb 17','Feb 15','Feb 21','-','-'],
      ['MOL',                        'Swallow Ace',       '0137A', 'Jan 23','-','Jan 25','Jan 29','-','-','Jan 26','Feb 1','-','-',     'Feb 15','-',    '-',    '-',    '-','-'],
      ['MOL',                        'Glorious Ace',      '0090A', 'Jan 27','-','Jan 30','Jan 31','-','-','Jan 26','Feb 1','-','-',     'Feb 20','Feb 28','Mar 1','Feb 23','-','-'],
      ['SEVEN SEALS CO.,LTD',        'Baltimore Highway', '148',   'Jan 29','-','Jan 30','Feb 2','Feb 1','-','-','-','-','-',           'Mar 10','Mar 13','-',   '-',    '-','-'],
      ['THE KEIHIN CO.,LTD.',        'Morning Concert',   '163',   'Jan 30','-','-','-','-','-','-','-','-','-',                       'Mar 2', 'Feb 29','-',   '-',    '-','-'],
      ['THE KEIHIN CO.,LTD.',        'Tombarra',          '37',    '-','-','Feb 2','Feb 3','-','Feb 5','-','-','-','-',                 'Mar 2', 'Feb 29','-',   '-',    '-','-'],
      ['MOL',                        'Neptune Ace',       '0106A', 'Feb 9','-','Feb 8','Feb 12','-','Feb 10','Feb 14','-','-','-',      'Feb 29','Mar 8', 'Mar 14','Mar 16','Mar 10','-'],
      ['NYK',                        'Leo Leader',        '108',   'Feb 12','-','Feb 17','Feb 15','Feb 14','-','-','-','-','-',         'Mar 21','Mar 13','Mar 10','-',   '-','-'],
      ['THE KEIHIN CO.,LTD.',        'Arabian Sea',       'SUB',   'Feb 18','-','Feb 19','Feb 20','-','Feb 22','-','-','-','-',         'Mar 18','Mar 16','-',   '-',    '-','-'],
      ['HOEGH',                      'Hoegh Brasilia',    '115',   'Feb 28','-','-','Mar 1','-','-','-','Feb 27','-','-',               'Apr 4', 'Mar 28','Mar 25','Apr 2','-','-'],
    ],
  },
  {
    id: 'black-sea-container',
    short: 'Black Sea',
    label: 'BLACK SEA (Container)',
    type: 'Container',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:   ['Novorossiysk','Poti','Batumi'],
    rows: [
      ['MSC',    'MSC Durban IV',    'HI350A', 'Dec 12','-','-','-','-','-',  '-','O','-'],
      ['MSC',    'MSC Kymea II',     'HX350A', '-','-','-','-','-','-',        '-','O','-'],
      ['MSC',    'MSC Durban IV',    'HI350A', '-','Dec 14','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Odessa V',     'HI351A', 'Dec 19','-','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Giannina II',  'HI351A', '-','-','-','Dec 19','-','-',   '-','O','-'],
      ['MAERSK', 'Josephine Maersk', '351S',   'Dec 19','-','-','-','-','-',   '-','O','-'],
      ['SINKOR', 'Estima',           '2314W',  'Dec 19','-','-','-','-','-',   'O','-','-'],
      ['MSC',    'MSC Lilou III',    'HG350A', '-','-','-','Dec 20','-','-',   '-','O','-'],
      ['MSC',    'MSC Odessa V',     'HI351A', '-','Dec 21','-','-','-','-',   '-','O','-'],
      ['SINKOR', 'Pegasus Pacer',    '2367W',  '-','-','-','Dec 25','-','-',   'O','-','-'],
      ['MSC',    'MSC Kymea II',     'HX352A', 'Dec 26','-','-','-','-','Dec 26','-','O','-'],
      ['MSC',    'MSC Nagoya V',     'HI352A', '-','-','-','-','-','Dec 26',   '-','O','-'],
      ['MSC',    'MSC Carpathia III','HG351A', '-','-','-','Dec 28','-','-',   '-','O','-'],
      ['MSC',    'MSC Nagoya V',     'HI352A', '-','Dec 28','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Monterey',     'HI401A', 'Jan 2','Jan 2 Cut:Dec 27','-','-','-','-','-','O','-'],
      ['MSC',    'MSC Giannina II',  'HX401A', '-','-','-','Jan 2','-','-',    '-','O','-'],
      ['ETOILE', 'Etoile',           'HG352A', '-','-','-','Jan 3','-','-',    '-','O','-'],
      ['MSC',    'MSC Yang R',       'HI402A', 'Jan 11','-','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Basel V',      'HI403A', 'Jan 16','-','-','-','-','-',   '-','O','-'],
      ['JAN RITSCHER','Jan Ritscher','HG402A', '-','-','-','Jan 17','-','-',   '-','O','-'],
      ['MSC',    'MSC Basel V',      'HI403A', '-','-','-','Jan 18','-','-',   '-','O','-'],
      ['MSC',    'MSC Durban IV',    'HI404A', 'Jan 23','-','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Vigour III',   'HG403A', '-','-','-','-','-','Jan 26',   '-','O','-'],
      ['MSC',    'MSC Odessa V',     'HI405A', 'Jan 30','-','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Lilou III',    'HG404A', '-','-','-','-','-','Jan 31',   '-','O','-'],
      ['MSC',    'MSC Odessa V',     'HI405A', '-','Feb 1','-','-','-','-',    '-','O','-'],
      ['MSC',    'MSC Lilou III',    'HG404A', '-','-','-','-','-','Feb 2',    '-','O','-'],
      ['MSC',    'MSC Nagoya V',     'HI406A', 'Feb 6','-','-','-','-','-',   '-','O','-'],
      ['MSC',    'MSC Carpathia III','HG405A', '-','-','-','-','-','Feb 7',   '-','O','-'],
      ['MSC',    'MSC Nagoya V',     'HI406A', '-','Feb 8','-','-','-','-',    '-','O','-'],
      ['MSC',    'MSC Carpathia III','HG405A', '-','-','-','-','-','Feb 9',   '-','O','-'],
      ['MSC',    'MSC Monterey',     'HI407A', 'Feb 13','-','-','-','-','-',  '-','O','-'],
      ['MSC',    'MSC Valentina',    'HG408A', '-','-','-','-','-','Feb 15',  '-','O','-'],
    ],
  },
  {
    id: 'russia-fesco',
    short: 'Russia',
    label: 'RUSSIA (FESCO)',
    type: 'Mixed',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Toyama','Maizuru','Hakata','Fukui','Otaru','Kisa Razu','Karatsu','Shinmoji','Imari','Naoetsu','Tomakomai','Hitachi Naka'],
    arrivalPorts:   ['Vladivostok'],
    rows: [
      ['JAL',          'Olkhon',         '1',      '-','-','-','-','-','Jan 11 Cut:Dec 21','-','Jan 10 Cut:Dec 26','-','-','-','-','-','-','-','-',  '-'],
      ['MIRAI LINE',   'Sunstar',        '01-24',  '-','-','-','-','-','-','-','Jan 12','-','-','-','-','-','-','-','-','-',                          '-'],
      ['MW-LINE',      'Swift',          '1',      '-','-','-','-','-','-','-','-','-','-','-','-','Jan 16','-','-','-','-',                           '-'],
      ['JAL',          'Amur',           '1',      '-','-','-','-','-','-','-','-','-','-','-','Jan 17 Cut:Jan 09','Jan 12 Cut:Dec 26','-','-','-','-','-'],
      ['JAL',          'Angara',         '2',      '-','-','-','-','-','Jan 18 Cut:Jan 15','-','Jan 19 Cut:Jan 11','-','-','-','-','-','-','-','-','-', '-'],
      ['DIV-AUTOLINE', 'Pacific Leader', '1',      '-','-','-','-','-','-','-','-','-','-','-','-','-','-','Jan 18','-','-',                           '-'],
      ['UNKNOWN',      'Kinteki Maru',   '-',      '-','-','-','-','-','-','-','-','-','Jan 19','-','-','-','-','-','-','-',                           '-'],
      ['JAL',          'Olkhon',         '2',      '-','-','-','-','-','Jan 24 Cut:Jan 18','-','-','-','Jan 28 Cut:Jan 10','-','-','-','-','-','-','-', '-'],
      ['MW-LINE',      'Confident',      '2',      '-','-','-','-','-','-','-','-','-','-','-','Jan 25','-','-','-','-','-',                           '-'],
      ['UNKNOWN',      'Kaiwo Maru',     '172',    '-','-','-','-','-','-','-','-','-','Jan 26','-','-','-','-','-','-','-',                           '-'],
      ['MW-LINE',      'Swift',          '2',      '-','-','-','-','-','-','-','Jan 26','-','-','-','-','-','-','-','-','-',                           '-'],
      ['MW-LINE',      'Sun Star',       '01-2323','-','-','-','-','-','-','-','Jan 26','-','-','-','-','-','-','-','-','-',                           '-'],
      ['JAL',          'Amur',           '2',      '-','-','-','-','-','-','-','-','-','Jan 29 Cut:Jan 23','Jan 25 Cut:Jan 11','-','-','-','-','-','-', '-'],
      ['JAL',          'Angara',         '3',      '-','-','-','-','-','Jan 29 Cut:Jan 23','-','Jan 31 Cut:Jan 25','-','-','-','-','-','-','-','-','-', '-'],
      ['MIRAI LINE',   'Sunstar',        '02-24',  '-','-','-','-','-','-','-','Jan 31','-','-','-','-','-','-','-','-','-',                           '-'],
      ['MW-LINE',      'Confident',      '3',      '-','-','-','-','-','-','-','-','-','-','-','Jan 31','-','-','-','-','-',                           '-'],
      ['JAL',          'Amur',           '3',      '-','-','-','-','-','-','-','-','-','Feb 05 Cut:Jan 24','-','-','-','-','-','-','-',                 '-'],
      ['JAL',          'Ural',           '6',      '-','-','-','-','-','-','-','-','-','Feb 19 Cut:Feb 07','-','-','-','-','-','-','-',                 'O'],
    ],
  },
  {
    id: 'caribbean',
    short: 'Caribbean',
    label: 'CARIBBEAN',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:   ['Kingston','Nassau','Port Of Spain','George Town Guy','Paramaribo','Castries','Roseau','St Georges','St Johns','Aruba','Freeport TX','Tacoma','Savannah','Los Angeles','Jacksonville','Bridgetown','Basseterre','Kingstown'],
    rows: [
      ['Yuwa Shipping',          'Asian Emperor',       'ASM227', 'Dec 12','-','Dec 11','Dec 10','-','-','-','-','-', 'Jan 18','Jan 21','Jan 11','-','-','Jan 14','-','-','-','-','-','-','-','-','Jan 13','-','-'],
      ['HOEGH',                  'Hoegh Tokyo',         '110',    '-','-','Dec 12','-','-','-','-','-','-',           'Jan 6','O','O','O','O','O','O','O','O','-','-','-','Jan 10','-','O','O','O'],
      ['Nissan Motor Carrier',   'Sanderling Ace',      '113A',   'Dec 22','-','-','Dec 20','-','-','-','-','-',     '-','-','-','-','-','-','-','-','-','-','Jan 4','-','Jan 11','-','-','-','-'],
      ['K-LINE',                 'Swan Ace',            '0126A',  'Dec 25','-','-','-','-','-','-','-','-',          'Jan 23','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['Nissan Motor Carrier',   'Swan Ace',            '128A',   'Dec 26','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','Jan 25','-','-','-','-','-','-'],
      ['HOEGH',                  'Hoegh Seoul',         '131',    '-','-','Dec 27','Dec 29','-','-','-','-','-',     'Jan 17','O','O','O','O','O','O','O','O','-','-','Feb 3','-','-','Feb 8','O','O','O'],
      ['MOL',                    'Tranquil Ace',        '0109A',  '-','-','Dec 28','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['Nissan Motor Carrier',   'Martorell',           '165A',   'Dec 31','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','Feb 10','-','-','-','-','-','-'],
      ['K-LINE',                 'Martorell',           '0165A',  '-','-','-','Dec 31','-','-','-','-','O',          '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['HOEGH',                  'Hoegh ST.Petersburg', '86',     '-','Jan 10','-','Jan 8','-','-','-','-','-',      'Feb 5','-','Feb 13','Mar 11','O','O','O','O','O','-','Feb 10','-','-','Feb 15','-','O','-','-'],
      ['Nissan Motor Carrier',   'Emerald Ace',         '92A',    'Jan 12','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','Feb 1','-','Feb 5','-','-','-','-'],
      ['Yuwa Shipping',          'Morning Catherine',   'MCC151', 'Jan 13','-','Jan 12','Jan 11','Jan 9','-','-','-','-','Feb 26','Feb 27','Jan 14','-','-','Feb 18','-','Feb 16','Feb 21','-','-','-','-','Feb 17','Feb 22'],
      ['HOEGH',                  'Hoegh Traveller',     '43',     '-','-','-','Jan 24','-','-','-','-','-',          'Mar 2','O','O','O','O','O','O','O','O','-','-','Feb 27','-','-','-','O','-','O'],
      ['Nissan Motor Carrier',   'Comet Ace',           '224A',   'Jan 25','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','Feb 10','-','Feb 14','-','-','-','-'],
      ['Nissan Motor Carrier',   'Glorious Ace',        '-',      'Jan 29','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','-','Mar 6','-','-','-','-','-'],
      ['Nissan Motor Carrier',   'TBN(tentative)',      '-',      'Feb 15','-','-','-','-','-','-','-','-',          '-','-','-','-','-','-','-','-','-','-','O','-','O','-','-','-','-'],
      ['Nissan Motor Carrier',   'TBN(TENTATIVE)',      '-',      'Feb 25','-','Feb 20','-','-','-','-','-','-',     '-','-','-','-','-','-','-','-','-','-','O','-','O','-','-','-','-'],
      ['HOEGH',                  'Hoegh London',        '109',    '-','Feb 28','Feb 27','Feb 26','-','-','-','-','-','Mar 26','O','O','O','O','O','O','O','O','-','-','Mar 31','-','-','Apr 5','O','O','O'],
      ['HOEGH',                  'Hoegh Trader',        '172',    '-','-','-','Mar 3','-','-','-','-','-',           'Mar 30','O','O','O','O','O','O','O','O','-','-','Apr 3','-','-','Apr 8','O','O','O'],
      ['Nissan Motor Carrier',   'TBN East',            '-',      '-','-','-','-','O','-','-','-','-',               '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ],
  },
  {
    id: 'ns-america',
    short: 'N/S America',
    label: 'N/S AMERICA',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:   ['Iquique','Asuncion','Vancouver','New Westminster'],
    rows: [
      ['Nissan Motor Carrier',   'Sanderling Ace',    '113A', 'Dec 22','-','-','Dec 20','-','-','-','-','-','-',  '-',    'Jan 5', '-',    '-'],
      ['THE KEIHIN CO.,LTD.',   'Morning Conductor', '-',    'Dec 23','-','Dec 24','Dec 25','-','Dec 27','-','-','-','-', 'O',    '-',    '-'],
      ['NYK',                   'Genius Highway',    '70',   'Dec 25','-','Dec 24','-','-','-','-','-','-','-',   'Jan 24','-',    '-',    '-'],
      ['K-LINE',                'Genius Highway',    '70',   'Dec 25','-','Dec 24','-','-','-','-','-','-','-',   'Jan 24','-',    '-',    '-'],
      ['Nissan Motor Carrier',   'Emerald Ace',       '92A',  'Jan 12','-','-','-','-','-','-','-','-','-',        '-',    'Feb 9', '-',    '-'],
      ['Nissan Motor Carrier',   'Comet Ace',         '224A', 'Jan 25','-','-','-','-','-','-','-','-','-',        '-',    'Feb 9', '-',    '-'],
      ['Nissan Motor Carrier',   'Jupiter Spirit',    '76A',  '-','-','-','Jan 31','-','-','-','-','-','-',        '-',    'Feb 14','-',    '-'],
      ['NYK',                   'Viking Passero',    '39',   'Feb 2','-','-','Jan 30','-','-','-','-','-','-',    'Mar 8', '-',    '-',    '-'],
      ['THE KEIHIN CO.,LTD.',   'Tombarra',          '37',   '-','-','Feb 2','Feb 3','-','Feb 5','-','-','-','-', 'O',    '-',    '-',    '-'],
      ['K-LINE',                'Viking Passero',    '39',   'Feb 2','-','-','-','-','-','-','-','-','-',         'Jan 24','-',    '-',    '-'],
      ['Nissan Motor Carrier',   'TBN(tentative)',    '-',    'Feb 15','-','-','-','-','-','-','-','-','-',        'O',    '-',    '-',    '-'],
      ['Nissan Motor Carrier',   'TBN(TENTATIVE)',    '-',    'Feb 25','-','Feb 20','-','-','-','-','-','-','-',   'O',    '-',    '-',    '-'],
      ['THE KEIHIN CO.,LTD.',   'Morning Camilla',   '-',    'Feb 27','-','Feb 28','Feb 29','-','Mar 2','-','-','-','-','-',    '-',    '-'],
      ['OCEAN NETWORK EXPRESS', 'ACX Diamond',       '-',    'Feb 27','-','Feb 28','Feb 29','-','Mar 2','-','-','-','-','-',    '-',    '-'],
    ],
  },
  {
    id: 'oceania',
    short: 'Oceania',
    label: 'OCEANIA',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Kanda','Kisa Razu','Nakano Seki','Hitachi Naka'],
    arrivalPorts:   ['Brisbane','Port Kembla','Melbourne','Auckland','Wellington','Lyttelton','Suva','Lautoka','Port Moresby','Nelson','Adelaide','Fremantle','Darwin'],
    rows: [
      ['K-LINE',          'Iguazu Highway',       '49',    'Dec 16','-','Dec 12','-','-','-','-','-','-',        '-',    'Jan 30','Jan 22','-','-','-','-','-','-','-','-','-','-','-'],
      ['MOL',             'Mermaid Ace',           '0080A', 'Dec 21','-','Dec 17','Dec 14','-','-','-','-','Dec 20','-','-','-','Jan 2','Jan 9','Jan 11','-','-','-','-','-','-','-','-'],
      ['TOYOFUJI',        'Dream Angel',           '40',    'Dec 23','-','Dec 19','-','-','Dec 18','-','-','-',   '-','-','Jan 6','Jan 10','Jan 9','-','-','-','-','-','-','-','-','-'],
      ['TOYOFUJI',        'Dream Jasmine',         '31',    'Dec 23','-','Dec 20','-','-','-','-','-','-',        'Jan 12','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['NYK',             'Silver Queen',          '3',     'Dec 24','-','Dec 22','-','-','-','-','-','-',        '-','-','Jan 14','-','-','-','-','-','-','-','-','-','-','-'],
      ['MOL',             'Miraculous Ace',        '0128A', 'Dec 25','-','-','-','Dec 23','-','-','-','-',        'Jan 26','Jan 18','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['MOL',             'Dugong Ace',            '0042A', 'Dec 26','-','Dec 24','Dec 21','-','-','-','-','Dec 25','Jan 10','Jan 17','Jan 19','Jan 6','-','-','-','-','-','-','-','-','-'],
      ['K-LINE',          'RCC Asia',              '14',    'Dec 25','-','Dec 28','Dec 28','-','-','-','-','-',   'Jan 11','Jan 20','-','-','-','-','-','-','-','Feb 6','-','-','-'],
      ['K-LINE',          'Viking Coral',          '51',    'Dec 28','-','Dec 28','Jan 2','-','-','-','-','-',    '-','-','-','-','-','-','-','-','-','-','Jan 18','-','-'],
      ['NYK',             'Glorious Leader',       '37',    'Dec 29','-','Dec 28','-','-','-','-','-','-',        'Jan 7','Jan 14','-','-','-','-','-','-','-','-','-','-','-'],
      ['ARMACUP',         'Viking Paqua',          '231B',  '-','-','Jan 4','Jan 3','Jan 2','-','-','-','-',      '-','-','Jan 19','-','-','-','-','-','-','-','-','-','-'],
      ['MOL',             'Firmament Ace',         '135A',  'Jan 6','-','-','-','-','-','Jan 8','-','-',          '-','Jan 26','Jan 18','-','-','-','-','-','-','Jan 20','-','-'],
      ['K-LINE',          'Grand Ruby',            '1',     'Jan 14','-','Jan 11','-','-','-','-','-','-',        'Feb 20','-','Feb 3','-','-','-','-','-','-','-','-','-','-'],
      ['NYK',             'Jupiter Leader',        '61',    'Jan 18','-','Jan 17','-','-','-','-','-','-',        '-','O','-','-','-','-','-','-','-','-','-','-','-'],
      ['TOYOFUJI',        'Trans Future 5',        '151',   'Jan 20','-','-','-','-','-','-','-','-',             '-','O','-','-','-','-','-','-','-','-','-','-','-'],
      ['ECL',             'Positive Star',         '204',   'Jan 23','-','Jan 25','Jan 26','-','-','-','-','-',   '-','-','-','-','-','-','-','-','-','Feb 9','Feb 16','-','-'],
      ['MOL',             'Iris Ace',              '81A',   'Jan 26','-','Jan 25','-','-','-','-','-','-',        '-','Feb 13','-','-','-','-','-','-','-','-','-','-','-'],
      ['NYK',             'Rigel Leader',          '14',    'Jan 27','-','-','-','-','-','-','-','-',             '-','Feb 16','-','-','-','-','-','-','-','-','-','-','-'],
      ['K-LINE',          'American Highway',      '211',   'Jan 30','-','Jan 23','Jan 25','-','-','-','-','-',   '-','-','-','-','-','-','-','-','-','-','Feb 11','-','-'],
      ['TOYOFUJI',        'Trans Future 7',        '149',   'Feb 3','-','Jan 31','-','Jan 30','-','-','-','-',    'Feb 20','Feb 21','-','-','-','-','-','-','-','-','-','-','-'],
      ['K-LINE',          'Sierra Nevada Highway', '166',   'Feb 12','-','Feb 10','-','-','-','-','-','-',        'O','-','O','-','-','-','-','-','-','-','-','-','-'],
      ['ECL',             'Malaysia Passion',      '46',    'Feb 14','-','Feb 13','-','-','-','-','-','-',        '-','-','-','-','-','-','-','-','-','Mar 1','-','-','-'],
      ['KYOWA',           'Pacific Condor',        '209',   'Feb 17','-','-','Feb 15','-','-','-','-','-',        '-','-','-','-','-','-','Mar 3','-','-','-','-','-','-'],
      ['AUTOHUB',         'To Be Confirmed',       '-',     '-','O','-','O','-','O','-','-','-',                  '-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['DAIWA SHIPPING',  'To Be Confirmed',       '-',     '-','O','-','O','-','-','-','-','-',                  '-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ],
  },
  {
    id: 'middle-east',
    short: 'Middle East',
    label: 'MIDDLE EAST',
    type: 'Container',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Tokyo','Hakata','Hitachi Naka'],
    arrivalPorts:   ['Karachi','Famagusta'],
    rows: [
      ['INTERASIA LINE',  'Wan Hai 510',      'S173', 'Dec 16','-','-','-','-','-','-',  'O','-'],
      ['INTERASIA LINE',  'Wan Hai 527',      'S033', '-','-','-','Dec 17','-','-','-',  '-','-'],
      ['WAN HAI',         'Wan Hai 523',      'S023', '-','-','-','Dec 22','-','-','-',  '-','-'],
      ['INTERASIA LINE',  'Wan Hai 510',      'S174', 'Jan 13','-','-','-','-','-','-',  'O','-'],
      ['INTERASIA LINE',  'Wan Hai 328',      'S034', '-','-','-','Jan 21','-','-','-',  'O','-'],
      ['INTERASIA LINE',  'Wan Hai 365',      'S011', 'Jan 24','-','-','Jan 28','-','-','-','O','-'],
      ['INTERASIA LINE',  'Wan Hai 506',      'S0228','-','Jan 26','-','-','-','-','-',  'O','-'],
      ['INTERASIA LINE',  'Wan Hai 506',      'S226', 'Jan 27','-','-','-','-','-','-',  'O','-'],
      ['INTERASIA LINE',  'Interasia Pursuit','S080', 'Jan 28','-','-','-','-','-','-',  'O','-'],
      ['INTERASIA LINES', 'OOCL Dalian',      'S694', '-','-','-','Jan 30','-','-','-',  'O','-'],
      ['INTERASIA LINES', 'OOCL Dalian',      'S694', 'Feb 3','-','-','-','-','-','-',   'O','-'],
      ['INTERASIA LINE',  'Wan Hai 510',      'S175', '-','-','Feb 6','-','-','-','-',   'O','-'],
      ['INTERASIA LINE',  'Hoegh Trove',      'S174', '-','-','Feb 6','-','-','-','-',   'O','-'],
    ],
  },
  {
    id: 'east-asia-roro',
    short: 'East Asia',
    label: 'EAST ASIA (RO-RO)',
    type: 'RO-RO',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Kanda','Kisa Razu','Hitachi Naka'],
    arrivalPorts:   ['Hong Kong','Laem Chabang','Hambantota','Chittagong','Mongla','Subic'],
    rows: [
      ['ECL','Malaysia Grace',   '26',  'Dec 15','-','Dec 16','-','Dec 17','Dec 16','-','-','-',   '-',    'Jan 16','Jan 18','-','-'],
      ['ECL','Malaysia Passion', '45',  'Dec 27','-','Dec 28','-','Dec 29','-','-','-','-',         '-',    'Jan 17','Jan 19','-','-'],
      ['ECL','Malaysia Grace',   '27',  'Jan 13','-','Jan 15','Jan 17','-','-','-','-','-',         '-',    'O',     '-',     '-','-'],
      ['ECL','Malaysia Brave',   '63',  'Jan 29','-','Jan 30','Jan 31','-','-','-','-','-',         '-',    'Feb 15','Feb 17','-','-'],
      ['ECL','Malaysia Grace',   '28',  'Feb 10','-','Feb 10','-','-','Feb 10','-','-','-',         '-',    'Mar 10','Mar 12','-','-'],
      ['ECL','Malaysia Brave',   'END', 'Feb 22','-','Feb 22','-','Feb 22','-','-','-','-',         '-',    'O',     'O',     '-','-'],
    ],
  },
  {
    id: 'east-asia-container',
    short: 'East Asia · CTR',
    label: 'EAST ASIA (Container)',
    type: 'Container',
    departurePorts: ['Yoko Hama','Kawa Saki','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:   ['Huangpu','Yangon','Laem Chabang','Ulaanbaatar','Zamin Uud'],
    rows: [
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Kachsiuno', '2325W', 'Dec 13','-','-','-','-','-','-',    '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Hai Feng Hai Kou',    '2372W', '-','-','-','-','Dec 13','-','-',    '-','O','-','-'],
      ['SINOTRANS(TECHNO)',     'SITC Shidao',         '2384W', '-','-','Dec 13','-','-','-','-',    '-','O','-','-'],
      ['BEN LINE(CENTROWIDE)',  'Straits City',        '2349W', 'Dec 16','-','-','-','-','-','-',    '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'SITC Subic',          '2382W', '-','-','-','Dec 16','-','-','-',    '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'SITC Busan',          '2360W', 'Dec 16','-','-','-','-','-','-',    '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'SITC Toyohashi',      '2360W', '-','-','Dec 15','-','-','-','-',    '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Bangkok',   '2325W', '-','-','Dec 17','-','-','-','-',    '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Beijing',   '2350W', '-','-','-','-','-','-','Dec 19',    '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'SITC Yokkaichi',      '2333N', '-','-','-','-','-','-','Dec 19',    '-','O','-','-'],
      ['WAN HAI',               'Wan Hai 271',         '5204',  'Dec 21 Cut:Dec 20','-','-','-','-','-','-','-','Jan 5','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Osaka',     '2350W', '-','-','-','-','-','Dec 23','-',    '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'Sinotrans Osaka',     '2350W', '-','-','-','-','-','Dec 23','-',    '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Keelung',   '2325W', '-','-','-','Dec 24','-','-','-',   '-','O','-','-'],
      ['COSCO(CENTROWIDE)',     'Sinotrans Keelung',   '2326W', '-','-','-','Dec 24','-','-','-',   '-','O','-','-'],
      ['SITC(TECHNO)',          'SITC Moji',           '2327N', '-','-','-','-','-','-','Dec 24',   '-','O','-','-'],
      ['WAN HAI',               'Wan Hai 177',         '5027',  '-','-','-','Dec 25 Cut:Dec 22','-','-','-','-','Jan 7','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'SITC Nagoya',         '2389W', '-','-','-','-','-','Dec 26','-',   '-','O','-','-'],
      ['SINOTRANS(TECHNO)',     'SITC Nagoya',         '2369W', '-','-','-','-','-','Dec 26','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Keelung',   '2325W', '-','-','-','-','-','Dec 26','-',   '-','O','-','-'],
      ['SITC(CENTROWIDE)',      'Conscience',          '2352W', 'Dec 27','-','-','-','-','-','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'SITC Toyohashi',      '2382W', '-','-','-','-','-','Dec 28','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'SITC Shidao',         '2389W', '-','-','-','-','-','Dec 29','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Bangkok',   '2326W', 'Dec 30','-','-','-','-','-','-',   '-','O','-','-'],
      ['COSCO(CENTROWIDE)',     'Sinotrans Bangkok',   '2326W', 'Dec 30','-','-','-','-','-','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Bangkok',   '2326W', '-','-','-','-','-','Dec 31','-',   '-','O','-','-'],
      ['SINOTRANS(CENTROWIDE)', 'Sinotrans Osaka',     '2352W', '-','-','-','-','-','Dec 31','-',   '-','O','-','-'],
      ['SINOTRANS(TECHNO)',     'SITC Shidao',         '2390W', '-','-','Jan 2','-','-','-','-',    '-','O','-','-'],
      ['SINOTRANS(TECHNO)',     'SITC Hochiminh',      '2388W', '-','-','Jan 2','-','-','-','-',    '-','O','-','-'],
      ['YANG MING',             'YM Image',            '187S',  '-','-','-','-','-','Jan 14','-',   'Jan 23','-','-','-'],
      ['YANG MING',             'TS Guanzhou',         '24002S','-','-','-','-','-','-','Jan 17',   'Jan 30','-','-','-'],
      ['WAN HAI',               'Wan Hai 177',         '5028',  '-','-','-','Jan 22 Cut:Jan 19','-','-','-','-','Feb 4','-','-'],
      ['YANG MING',             'YM Inception',        '214S',  '-','-','-','-','-','Jan 21 Cut:Jan 19','-','-','Jan 30','-','-','-'],
      ['YANG MING',             'YM Initiative',       '320S',  '-','-','-','-','-','Jan 28 Cut:Jan 26','-','-','Feb 6','-','-','-'],
    ],
  },
  {
    id: 'africa-container',
    short: 'Africa · CTR',
    label: 'AFRICA (Container)',
    type: 'Container',
    departurePorts: ['Yoko Hama','Nagoya','Kobe','Osaka','Hakata','Hitachi Naka'],
    arrivalPorts:   ['Mombasa','Dar Es Salaam','Port Louis','Matadi','Walvis Bay','Nacala','Maputo','Durban','Berbera','Beira'],
    rows: [
      ['MAERSK',      'Alianca Manaus',   '350S', 'Dec 12','-','-','-','-','-',  '-','-','-','-','O','-','-','-','-','-'],
      ['HAPAG LLOYD', 'Jakarta Express',  '078S', '-','-','-','-','Dec 13','-',  '-','-','-','-','-','-','-','-','-','-'],
      ['INTERASIA',   'Wan Hai 329',      'S024', 'Dec 15','-','-','-','-','-',  'Jan 31','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Maersk Noresund',  '350S', '-','-','-','Dec 18','-','-',  '-','-','-','-','Jan 21','-','-','-','-','-'],
      ['MAERSK',      'Josephine Maersk', '351S', '-','-','Dec 18 Cut:Dec 15','-','-','-','-','-','-','-','Jan 21','-','-','-','-','-'],
      ['MAERSK',      'Maersk Noresund',  '350S', '-','-','-','Dec 18 Cut:Dec 15','-','-','-','-','-','-','Jan 21','-','-','-','-','-'],
      ['MAERSK',      'Josephine Maersk', '351S', 'Dec 19','-','Dec 18','-','-','-','-','-','-','-','Jan 21','-','-','-','-','-'],
      ['MAERSK',      'Josephine Maersk', '351S', 'Dec 19 Cut:Dec 18','-','-','-','-','-','-','-','-','-','Jan 21','-','-','-','-','-'],
      ['MAERSK',      'Gabriela A',       '352S', 'Dec 26','-','Dec 25','-','-','-','-','-','-','-','O','-','-','-','-','-'],
      ['MSC',         'MSC Monterey',     'HI401A','Jan 02 Cut:Dec 27','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Alianca Manaus',   '403S', 'Jan 16','-','-','-','-','-',  '-','-','-','-','O','-','-','-','-','-'],
      ['MSC',         'Jan Ritscher',     'HG402A','-','-','Jan 17','-','-','-',  '-','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Meratus Tomini',   '404S', 'Jan 23','-','Jan 22','-','-','-','-','-','-','-','O','-','-','-','-','-'],
      ['MAERSK',      'Meratus Tomini',   '404S', 'Jan 23','-','-','-','-','-',  '-','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Meratus Tomini',   '404S', '-','-','-','-','-','Jan 29',  '-','-','-','-','O','-','-','-','-','-'],
      ['MAERSK',      'Josephine Maersk', '405S', 'Jan 30','-','-','-','-','-',  '-','-','-','-','O','-','-','-','-','-'],
      ['HAPAG LLOYD', 'Valor',            '2346W','Feb 01 Cut:Jan 26','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Alianca Manaus',   '406S', '-','-','-','-','-','Feb 4',   '-','-','-','-','O','-','-','-','-','-'],
      ['HAPAG LLOYD', 'One Humburo',      '077W', '-','-','-','-','Feb 10','-',  'Feb 2','-','-','-','-','-','-','-','-','-'],
      ['MAERSK',      'Nuuk Maersk',      '406S', '-','-','-','-','Feb 12 Cut:Feb 09','-','-','-','-','-','Mar 17','-','-','-','-','-'],
      ['MAERSK',      'Meratus Tomini',   '407S', '-','-','Feb 12','-','-','-',  '-','-','-','-','O','-','-','-','-','-'],
      ['MAERSK',      'Josephine Maersk', '408S', '-','-','Feb 19','-','-','-',  '-','-','-','-','O','-','-','-','-','-'],
    ],
  },
];

/* ─── Type badge ─────────────────────────────────────────────────── */
function TypeBadge({ type }: { type: RouteConfig['type'] }) {
  const map = {
    'RO-RO':     { bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-blue-200'  },
    'Container': { bg: 'bg-purple-50', text: 'text-purple-700',border: 'border-purple-200'},
    'Mixed':     { bg: 'bg-amber-50',  text: 'text-amber-700', border: 'border-amber-200' },
  };
  const s = map[type];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${s.bg} ${s.text} ${s.border}`}>
      {type}
    </span>
  );
}

/* ─── Shipping Table ─────────────────────────────────────────────── */
function ShippingTable({ route }: { route: RouteConfig }) {
  const tableRef = useRef<HTMLDivElement>(null);
  const fixedCols = ['Company', 'Ship Name', 'Voyage'];
  const colWidths = [130, 148, 68];
  const totalFixed = colWidths.reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Mobile swipe hint */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 border-b border-blue-100 md:hidden">
        <ArrowRight size={12} className="text-blue-400" />
        <span className="text-[11px] text-blue-600 font-medium">Swipe left to see all ports and arrival dates</span>
      </div>

      <div
        ref={tableRef}
        className="overflow-auto"
        style={{ maxHeight: '520px' }}
      >
        <table
          className="border-collapse text-xs"
          style={{ minWidth: `${totalFixed + route.departurePorts.length * 74 + 28 + route.arrivalPorts.length * 74}px` }}
        >
          <thead style={{ position: 'sticky', top: 0, zIndex: 30 }}>
            {/* Section labels */}
            <tr>
              <th
                colSpan={fixedCols.length + route.departurePorts.length}
                className="text-center text-[10px] tracking-[0.2em] uppercase font-bold text-white px-4 py-2 border-r border-white/20"
                style={{ background: '#1a1a2e' }}
              >
                ← Departure Port
              </th>
              <th style={{ background: '#1a1a2e', minWidth: 28, borderRight: '1px solid rgba(255,255,255,0.15)' }} />
              <th
                colSpan={route.arrivalPorts.length}
                className="text-center text-[10px] tracking-[0.2em] uppercase font-bold text-white px-4 py-2"
                style={{ background: '#1a1a2e' }}
              >
                Arrival Port →
              </th>
            </tr>

            {/* Column names */}
            <tr style={{ background: '#2a2a3e' }}>
              {fixedCols.map((col, ci) => (
                <th
                  key={ci}
                  className="text-center text-[10px] tracking-wide font-semibold text-white/90 whitespace-nowrap px-2 py-2 border-b border-white/10 border-r border-white/10"
                  style={{ minWidth: colWidths[ci], background: '#2a2a3e' }}
                >
                  {col}
                </th>
              ))}
              {route.departurePorts.map((port, ci) => (
                <th
                  key={`d${ci}`}
                  className="text-center text-[10px] font-semibold text-white/80 whitespace-nowrap px-1.5 py-2 border-b border-white/10 border-r border-white/10"
                  style={{ minWidth: 74, background: '#2a2a3e' }}
                >
                  {port}
                </th>
              ))}
              {/* Separator */}
              <th className="px-1 py-2 border-b border-white/10 border-r border-white/25 text-center" style={{ background: '#2a2a3e', minWidth: 28 }}>
                <span className="text-white/40 text-[11px]">→</span>
              </th>
              {route.arrivalPorts.map((port, ci) => (
                <th
                  key={`a${ci}`}
                  className="text-center text-[10px] font-semibold text-[#C8102E]/90 whitespace-nowrap px-1.5 py-2 border-b border-white/10 border-r border-white/10"
                  style={{ minWidth: 74, background: '#2a2a3e' }}
                >
                  {port}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {route.rows.map((row, ri) => {
              const bg = ri % 2 === 0 ? '#ffffff' : '#f8f8fc';
              const depCnt = fixedCols.length + route.departurePorts.length;
              return (
                <tr key={ri} className="hover:bg-blue-50/40 transition-colors">
                  {/* Fixed sticky cols */}
                  {fixedCols.map((_, ci) => {
                    const val = row[ci] ?? '-';
                    return (
                      <td
                        key={ci}
                        className={`whitespace-nowrap px-2 py-[5px] border-b border-gray-100 border-r border-r-gray-200 ${ci === 0 ? 'text-[10px] font-bold text-gray-700' : ci === 1 ? 'text-[11px] font-medium text-gray-700' : 'text-[10px] font-mono text-gray-500'}`}
                        style={{ minWidth: colWidths[ci], background: bg }}
                      >
                        {val}
                      </td>
                    );
                  })}

                  {/* Departure dates */}
                  {route.departurePorts.map((_, ci) => {
                    const val = row[fixedCols.length + ci] ?? '-';
                    const isDash = val === '-';
                    return (
                      <td
                        key={`d${ci}`}
                        className={`text-center whitespace-nowrap px-1.5 py-[5px] border-b border-gray-100 border-r border-r-gray-100 text-[11px] ${isDash ? 'text-gray-200' : 'text-gray-700 font-medium'}`}
                        style={{ background: isDash ? bg : '#eff6ff' }}
                      >
                        {val}
                      </td>
                    );
                  })}

                  {/* Arrow */}
                  <td className="text-center px-1 border-b border-gray-100 border-r border-r-gray-300 text-gray-300 text-[11px]" style={{ background: bg }}>→</td>

                  {/* Arrival dates */}
                  {route.arrivalPorts.map((_, ci) => {
                    const val = row[depCnt + ci] ?? '-';
                    const isDash = val === '-';
                    const isO = val === 'O';
                    return (
                      <td
                        key={`a${ci}`}
                        className={`text-center whitespace-nowrap px-1.5 py-[5px] border-b border-gray-100 border-r border-r-gray-100 text-[11px] ${isDash ? 'text-gray-200' : isO ? 'text-gray-400 font-semibold' : 'text-gray-800 font-semibold'}`}
                        style={{ background: isDash ? bg : isO ? bg : '#f0fdf4' }}
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
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function ShippingInformationPage() {
  const [activeRoute, setActiveRoute] = useState('europe-roro');
  const current = ROUTES.find(r => r.id === activeRoute) ?? ROUTES[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-[110px] md:pt-[130px]">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div className="relative container mx-auto px-4 md:px-8 py-10 md:py-14 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-[#C8102E]" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C8102E]">Logistics</span>
                <span className="h-px w-6 bg-[#C8102E]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Shipping Information</h1>
              <p className="text-white/50 text-sm">Japan → Worldwide · RO-RO &amp; Container Schedules</p>
            </div>
            {/* Stats */}
            <div className="flex gap-4 md:gap-6">
              {[
                { val: ROUTES.length, label: 'Routes' },
                { val: '130+', label: 'Countries' },
                { val: 'RO-RO &\nContainer', label: 'Methods' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-white leading-none whitespace-pre-line">{s.val}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-5 md:py-7">

        {/* ── Route Tab Selector ──────────────────────────────── */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2 px-0.5">Select Route</p>
          {/* Mobile: 2-col grid | Desktop: flex wrap */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2">
            {ROUTES.map((route) => {
              const active = route.id === activeRoute;
              return (
                <button
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className={`px-3 py-2 md:py-1.5 text-[11px] md:text-[10.5px] font-bold tracking-wide border rounded-md md:rounded transition-all duration-150 text-left md:text-center leading-tight whitespace-nowrap ${
                    active
                      ? 'text-white border-[#C8102E]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E]'
                  }`}
                  style={active ? { background: RED, borderColor: RED } : {}}
                >
                  <Ship size={10} className="inline mr-1 mb-0.5 opacity-70" />
                  {route.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table Card ──────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4">
          {/* Card header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-0.5 h-5 rounded-full flex-shrink-0" style={{ background: RED }} />
              <p className="font-bold text-sm text-gray-800 truncate">{current.label}</p>
              <TypeBadge type={current.type} />
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-gray-600">{current.departurePorts.length}</span> departures
              </span>
              <span className="text-gray-200">·</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-gray-600">{current.arrivalPorts.length}</span> arrivals
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${RED}15`, color: RED }}>
                {current.rows.length} sailings
              </span>
            </div>
          </div>

          <ShippingTable route={current} />

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 h-4 rounded bg-blue-50 border border-blue-100" />
              Departure date
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 h-4 rounded bg-green-50 border border-green-100" />
              Arrival date
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-gray-400">O</span>
              Port call (date TBC)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gray-200">—</span>
              Not calling
            </span>
          </div>
        </div>

        {/* ── Note bar ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-5">
          <Info size={15} className="text-amber-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[12.5px] text-amber-800 flex-1 leading-relaxed">
            <strong>Note:</strong> Schedules are updated regularly. Dates marked <strong>O</strong> indicate port calls with date TBC. For the latest schedule or booking assistance, contact us on WhatsApp.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[11px] font-bold tracking-wide hover:opacity-90 transition-opacity"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={13} />
            WhatsApp Us
          </a>
        </div>

        {/* ── Contact Strip ────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2.5" style={{ background: NAVY }}>
            <div className="w-0.5 h-4 rounded-full" style={{ background: RED }} />
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80">Get in Touch</p>
            <p className="text-white/40 text-[11px]">— Inquiries, quotations &amp; bookings</p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* WhatsApp */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={17} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">WhatsApp</p>
                <p className="font-bold text-sm text-gray-800 group-hover:text-green-600 transition-colors">+81 80-8922-7375</p>
              </div>
              <ChevronRight size={15} className="text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
            </a>

            {/* Email */}
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail size={17} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Email</p>
                <p className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors truncate">wazirtrading-pc@outlook.jp</p>
              </div>
              <ChevronRight size={15} className="text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
            </a>

            {/* Hours */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Business Hours</p>
                <p className="font-bold text-sm text-gray-800">Mon – Sat</p>
                <p className="text-[11px] text-gray-400">9:00 AM – 6:00 PM · Japan Standard Time</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
