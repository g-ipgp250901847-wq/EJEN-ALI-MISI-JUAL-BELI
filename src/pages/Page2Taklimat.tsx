import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { CharacterSlot } from '../components/CharacterSlot';
import { BriefingVideoPlayer } from '../components/BriefingVideoPlayer';
import { BRIEFING_HOLO_CARDS, LEARNING_OBJECTIVES } from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page2TaklimatProps {
  customVideoUrl: string;
  onChangeVideoUrl: (url: string) => void;
  onCompleteBriefing: () => void;
  onNextPage: () => void;
}

export const Page2Taklimat: React.FC<Page2TaklimatProps> = ({
  customVideoUrl,
  onChangeVideoUrl,
  onCompleteBriefing,
  onNextPage,
}) => {
  const [openedCards, setOpenedCards] = useState<Record<string, boolean>>({
    maksud: true,
  });

  const toggleCard = (id: string) => {
    soundEngine.playHoloOpen();
    setOpenedCards((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (Object.values(next).filter(Boolean).length >= 2) {
        onCompleteBriefing();
      }
      return next;
    });
  };

  return (
    <section className="space-y-8">
      {/* Header Banner with Ali */}
      <div className="holo-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        <CharacterSlot agentId="ali" size="md" caption="Taklimat Ejen Ali" />

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold text-cyan-300">
              Halaman 2 · Taklimat Misi Bandar Niaga
            </p>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1 text-balance">
              Objektif Operasi Adab Jual Beli
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              "Hai Ejen Pelatih! Sebelum kita turun ke pasar dan kedai di Bandar Niaga, pastikan anda kuasai empat objektif utama dan teliti kad hologram di bawah."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEARNING_OBJECTIVES.map((obj, idx) => (
              <div
                key={obj}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/75 border border-cyan-500/20"
              >
                <span className="w-6 h-6 rounded-md bg-orange-500/20 border border-orange-400/40 text-orange-300 font-mono-num text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-100 leading-snug">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Hologram Note Cards */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-cyan-300" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              Kad Hologram Nota Asas Jual Beli
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Klik setiap kad hologram untuk membuka huraian lengkap dan contoh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BRIEFING_HOLO_CARDS.map((card, index) => {
            const isOpen = Boolean(openedCards[card.id]);
            const isOrange = card.accent === 'orange';

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`rounded-2xl p-5 sm:p-6 transition-all ${
                  isOrange ? 'holo-panel-orange' : 'holo-panel'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`text-xs font-mono-num font-semibold ${
                        isOrange ? 'text-orange-300' : 'text-cyan-300'
                      }`}
                    >
                      KAD HOLOGRAM 0{index + 1}
                    </p>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1">
                      {card.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isOpen
                        ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                        : 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/30'
                    }`}
                  >
                    {isOpen ? 'Tutup Nota' : 'Buka Hologram'}
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-200 mt-3 leading-relaxed">
                  {card.summary}
                </p>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-700/70 space-y-3">
                    <p className="text-sm text-slate-300 leading-relaxed">{card.detail}</p>
                    <div className="p-3 rounded-xl bg-slate-950/75 border border-cyan-500/20 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                        {card.example}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Digital Learning Object 1: Video Pembelajaran */}
      <BriefingVideoPlayer
        customVideoUrl={customVideoUrl}
        onChangeVideoUrl={onChangeVideoUrl}
        onCompleteVideo={onCompleteBriefing}
      />

      {/* Footer Navigation */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onCompleteBriefing();
            onNextPage();
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-base shadow-lg shadow-orange-500/20 transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <span>Seterusnya: Pusat Ilmu</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
