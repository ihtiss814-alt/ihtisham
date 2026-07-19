import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import CarCard, { Car } from '@/components/CarCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

function getParam(key: string) {
  return new URLSearchParams(window.location.search).get(key) ?? '';
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States — seeded from URL params on mount
  const [showFilters, setShowFilters]   = useState(false);
  const [searchQuery, setSearchQuery]   = useState(() => getParam('q'));
  const [makeFilter, setMakeFilter]     = useState('');
  const [bodyFilter, setBodyFilter]     = useState(() => getParam('body'));
  const [fuelFilter, setFuelFilter]     = useState('');
  const [maxPrice, setMaxPrice]         = useState(() => getParam('maxPrice'));
  const [minPrice, setMinPrice]         = useState(() => getParam('minPrice'));
  const [steeringFilter, setSteeringFilter] = useState(() => getParam('steering'));
  const [destinationFilter, setDestinationFilter] = useState(() => getParam('destination'));

  // Sync URL → state whenever URL changes (e.g. back/forward)
  useEffect(() => {
    const sync = () => {
      setSearchQuery(getParam('q'));
      setBodyFilter(getParam('body'));
      setMaxPrice(getParam('maxPrice'));
      setMinPrice(getParam('minPrice'));
      setSteeringFilter(getParam('steering'));
      setDestinationFilter(getParam('destination'));
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Extract unique filter options
  const makes     = Array.from(new Set(cars.map(c => c.make))).sort();
  const bodyTypes = Array.from(new Set(cars.map(c => c.body_type))).sort();
  const fuelTypes = Array.from(new Set(cars.map(c => c.fuel_type))).sort();

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setCars(data);
      } catch (err) {
        console.error("Failed to fetch cars", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    // Text search across make, model, variant
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = `${car.make} ${car.model} ${car.variant ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (makeFilter && car.make !== makeFilter) return false;
    // Body filter: "SUV" matches SUV, 4WD, Wagon etc.
    if (bodyFilter) {
      const b = bodyFilter.toLowerCase();
      const bt = (car.body_type ?? '').toLowerCase();
      if (b === 'suv') {
        if (!bt.includes('suv') && !bt.includes('4wd') && !bt.includes('wagon') && !bt.includes('crossover')) return false;
      } else {
        if (!bt.includes(b)) return false;
      }
    }
    if (fuelFilter && car.fuel_type !== fuelFilter) return false;
    if (maxPrice && car.fob_price_usd > Number(maxPrice)) return false;
    if (minPrice && car.fob_price_usd < Number(minPrice)) return false;
    if (steeringFilter && !(car.steering ?? '').toLowerCase().includes(steeringFilter.toLowerCase())) return false;
    return true;
  });

  const clearAll = () => {
    setSearchQuery('');
    setMakeFilter('');
    setBodyFilter('');
    setFuelFilter('');
    setMaxPrice('');
    setMinPrice('');
    setSteeringFilter('');
    setDestinationFilter('');
    window.history.replaceState({}, '', '/cars');
  };

  const activeCount = [searchQuery, makeFilter, bodyFilter, fuelFilter, maxPrice, minPrice, steeringFilter, destinationFilter].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pt-[130px] pb-16">
      {/* Page Header */}
      <div className="bg-secondary text-white py-16 mb-10">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Japanese Stock</h1>
          <p className="text-white/70 max-w-2xl text-lg">Browse our current inventory of premium Japanese used vehicles available for global export.</p>
          {(destinationFilter || maxPrice || minPrice) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {destinationFilter && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold">
                  Shipping to: <span className="text-[#F87171]">{destinationFilter}</span>
                  <button onClick={() => { setDestinationFilter(''); window.history.replaceState({}, '', '/cars'); }} className="text-white/50 hover:text-white transition-colors text-lg leading-none" aria-label="Clear destination">×</button>
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold">
                  Budget: <span className="text-[#F87171]">Under ${Number(maxPrice).toLocaleString()}</span>
                  <button onClick={() => { setMaxPrice(''); window.history.replaceState({}, '', '/cars'); }} className="text-white/50 hover:text-white transition-colors text-lg leading-none" aria-label="Clear max price">×</button>
                </span>
              )}
              {minPrice && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold">
                  Budget: <span className="text-[#F87171]">${Number(minPrice).toLocaleString()} & Above</span>
                  <button onClick={() => { setMinPrice(''); window.history.replaceState({}, '', '/cars'); }} className="text-white/50 hover:text-white transition-colors text-lg leading-none" aria-label="Clear min price">×</button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 bg-card border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-lg flex items-center">
                <SlidersHorizontal size={18} className="mr-2 text-primary" /> Filters
              </h3>
              <button 
                className="md:hidden text-muted-foreground"
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Make</label>
                <select 
                  className="w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:border-primary outline-none"
                  value={makeFilter}
                  onChange={(e) => setMakeFilter(e.target.value)}
                >
                  <option value="">All Makes</option>
                  {makes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Body Type</label>
                <select 
                  className="w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:border-primary outline-none"
                  value={bodyFilter}
                  onChange={(e) => setBodyFilter(e.target.value)}
                >
                  <option value="">All Body Types</option>
                  {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Fuel Type</label>
                <select 
                  className="w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:border-primary outline-none"
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
                </select>
              </div>

              <button
                onClick={clearAll}
                className="w-full py-2 border border-border text-sm font-medium hover:bg-muted transition-colors mt-4"
              >
                Reset Filters {activeCount > 0 && `(${activeCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground text-sm">
              Showing <span className="font-bold text-foreground">{filteredCars.length}</span> vehicles
            </p>
            <button 
              className="md:hidden flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[400px] bg-muted animate-pulse border border-border" />
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car, idx) => (
                <motion.div 
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="h-full"
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border p-12 text-center">
              <Search className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-xl font-serif font-bold mb-2">No vehicles found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any vehicles matching your current filters.</p>
              <button 
                onClick={() => {
                  setMakeFilter('');
                  setBodyFilter('');
                  setFuelFilter('');
                }}
                className="bg-primary text-primary-foreground px-6 py-2 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
