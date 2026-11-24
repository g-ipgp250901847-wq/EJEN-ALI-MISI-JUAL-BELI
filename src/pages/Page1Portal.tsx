import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, BookOpenCheck, ImagePlus } from 'lucide-react';
import { MataLogo } from '../components/MataLogo';
import { CharacterSlot } from '../components/CharacterSlot';
import { SCENE_IMAGES } from '../data/missionData';
import { useCharacters } from '../context/CharacterContext';
import { soundEngine } from '../utils/sound';

interface Page1PortalProps {
  onStartOperation: () => void;
  onOpenGuide: () => void;
}

export const Page1Portal: React.FC<Page1PortalProps> = ({
  onStartOperation,
  onOpenGuide,
}) => {
  const { openManager } = useCharacters();
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="space-y-8">
      {/* Main Hero Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#070E1D] shadow-2xl">
        {/* Background generated Bandar Niaga HQ */}
        <div className="absolute inset-0">
          <img
            src={SCENE_IMAGES.hq}
            alt="Ibu Pejabat MATA menghadap Bandar Niaga"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B16] via-[#060B16]/90 to-[#060B16]/75" />
          <div className="absolute inset-0 mata-grid-bg opacity-60" />
        </div>

        {/* Game-style opening holo scanline */}
        {!introComplete && (
          <motion.div
            initial={{ opacity: 0.9, y: '-100%' }}
            animate={{ opacity: 0, y: '120%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent z-20"
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission Briefing & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3.5">
              <MataLogo className="w-12 h-12 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-cyan-300">
                  Meta Advance Tactical Agency (MATA) · Sektor Bandar Niaga
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pendidikan Islam · Tahun 5 · Bidang Fiqah · Tajuk: Adab Jual Beli
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] text-balance">
                EJEN ALI: MISI OPERASI JUAL BELI
              </h1>
              <p className="font-display font-medium text-lg sm:text-xl text-cyan-300">
                Meneroka Adab Jual Beli dalam Islam
              </p>
            </div>

            {/* Official MATA Dialogue Box */}
            <div className="holo-panel rounded-xl p-5 space-y-2 relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-400/10 to-transparent animate-holo-scan"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold text-orange-400">
                Siaran Arahan Ketua MATA kepada Ejen Pelatih
              </p>
              <blockquote className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
                "Perhatian semua ejen! Satu operasi khas telah diaktifkan. Anda ditugaskan untuk menguasai ilmu dan adab jual beli menurut Islam. Bersedia untuk memulakan misi?"
              </blockquote>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playHoloOpen();
                  onStartOperation();
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-base shadow-lg shadow-orange-500/25 transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>MULA OPERASI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenGuide();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-200 border border-cyan-500/35 font-display font-semibold text-base transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpenCheck className="w-5 h-5 text-cyan-300" />
                <span>PANDUAN MISI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  openManager('ali');
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <ImagePlus className="w-4 h-4 text-orange-300" />
                <span>Imej Watak Rasmi</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Ali & Comot Character Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="holo-panel-orange rounded-2xl p-6 w-full flex flex-col items-center gap-5">
              <div className="text-center">
                <p className="text-xs font-semibold text-cyan-300">
                  Skuad Pengenalan Operasi
                </p>
                <h2 className="font-display font-bold text-lg text-white mt-0.5">
                  Ali & Comot di Bandar Niaga
                </h2>
              </div>

              <div className="flex items-end justify-center gap-4 sm:gap-6">
                <CharacterSlot agentId="ali" size="md" caption="Ketua Operasi" />
                <CharacterSlot agentId="comot" size="md" caption="Rakan Pengesan" />
              </div>

              <p className="text-xs text-slate-300 text-center leading-relaxed max-w-sm">
                Ali dan Comot akan membimbing anda menyiasat amalan jual beli di kedai, pasar dan perniagaan dalam talian sekitar Bandar Niaga.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Curriculum Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="holo-panel rounded-xl p-4">
          <div className="text-xs text-cyan-300 font-medium">Subjek & Tahun</div>
          <div className="font-display font-bold text-base text-white mt-1">
            Pendidikan Islam · Tahun 5
          </div>
        </div>
        <div className="holo-panel rounded-xl p-4">
          <div className="text-xs text-cyan-300 font-medium">Bidang & Tajuk</div>
          <div className="font-display font-bold text-base text-white mt-1">
            Fiqah · Adab Jual Beli
          </div>
        </div>
        <div className="holo-panel rounded-xl p-4">
          <div className="text-xs text-cyan-300 font-medium">Lokasi Simulasi</div>
          <div className="font-display font-bold text-base text-white mt-1">
            Bandar Niaga (Kedai, Pasar & Online)
          </div>
        </div>
        <div className="holo-panel rounded-xl p-4">
          <div className="text-xs text-cyan-300 font-medium">Latihan & Penilaian</div>
          <div className="font-display font-bold text-base text-white mt-1">
            Situasi, Padanan & 10 Soalan Kuiz
          </div>
        </div>
      </div>
    </section>
  );
};
