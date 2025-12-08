import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { SafeZoneLocations } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, Navigation } from 'lucide-react';

export default function SafeZoneMapPage() {
  const [locations, setLocations] = useState<SafeZoneLocations[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<SafeZoneLocations | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const { items } = await BaseCrudService.getAll<SafeZoneLocations>('safezonelocations');
      setLocations(items);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <MapPin className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Safe Zone Map
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Interactive map showing safe zones, shelters, and emergency facilities in your area
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Area */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-[600px] relative overflow-hidden"
              >
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-grey via-background to-dark-grey opacity-50"></div>
                
                {/* Map Grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-white/5"></div>
                  ))}
                </div>

                {/* Location Markers */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-16 w-full max-w-2xl">
                    {locations.slice(0, 9).map((location, index) => (
                      <motion.button
                        key={location._id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedLocation(location)}
                        className="relative group"
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all"
                          style={{
                            backgroundColor: location.colorCode || '#FF4500',
                            boxShadow: `0 0 20px ${location.colorCode || '#FF4500'}50`,
                          }}
                        >
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div className="bg-background border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                            <p className="font-paragraph text-xs text-foreground font-medium">
                              {location.locationName}
                            </p>
                            <p className="font-paragraph text-xs text-foreground/60">
                              {location.locationType}
                            </p>
                          </div>
                        </div>

                        {/* Pulse Animation */}
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ backgroundColor: location.colorCode || '#FF4500' }}
                        ></div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md border border-white/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-safe-green"></div>
                    <span className="font-paragraph text-xs text-foreground">Safe Zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="font-paragraph text-xs text-foreground">Shelter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-alert-red"></div>
                    <span className="font-paragraph text-xs text-foreground">Hospital</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Location Details */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sticky top-32"
              >
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                  {selectedLocation ? 'Location Details' : 'Select a Location'}
                </h2>

                {selectedLocation ? (
                  <div className="space-y-6">
                    <div>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                          backgroundColor: `${selectedLocation.colorCode || '#FF4500'}20`,
                        }}
                      >
                        <MapPin
                          className="w-8 h-8"
                          style={{ color: selectedLocation.colorCode || '#FF4500' }}
                        />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {selectedLocation.locationName}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-primary/20 rounded-lg mb-4">
                        <span className="font-paragraph text-xs text-primary uppercase tracking-wider">
                          {selectedLocation.locationType}
                        </span>
                      </div>
                    </div>

                    {selectedLocation.tooltipDescription && (
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-foreground/60 mb-2">
                          Description
                        </h4>
                        <p className="font-paragraph text-base text-foreground/80">
                          {selectedLocation.tooltipDescription}
                        </p>
                      </div>
                    )}

                    {(selectedLocation.latitude || selectedLocation.longitude) && (
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-foreground/60 mb-2">
                          Coordinates
                        </h4>
                        <div className="font-mono text-sm text-foreground/80 space-y-1">
                          {selectedLocation.latitude && (
                            <div>Lat: {selectedLocation.latitude.toFixed(6)}</div>
                          )}
                          {selectedLocation.longitude && (
                            <div>Lng: {selectedLocation.longitude.toFixed(6)}</div>
                          )}
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                    <p className="font-paragraph text-base text-foreground/60">
                      Click on a marker to view location details
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* All Locations List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              All Safe Locations
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <motion.button
                  key={location._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  onClick={() => setSelectedLocation(location)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${location.colorCode || '#FF4500'}20`,
                      }}
                    >
                      <MapPin
                        className="w-6 h-6"
                        style={{ color: location.colorCode || '#FF4500' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        {location.locationName}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/60">
                        {location.locationType}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
