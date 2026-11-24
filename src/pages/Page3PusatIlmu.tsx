import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Store,
  ShoppingBasket,
  Laptop,
} from 'lucide-react';
import { ADAB_LIST, AdabItem, SCENE_IMAGES } from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page3PusatIlmuProps {
  learnedIds: string[];
  onToggleLearned: (id: string) => void;
  onNextPage: () => void;
}

type SettingFilter = 'all' | 'kedai' | 'pasar' | 'online';

export const Page3PusatIlmu: React.FC<Page3PusatIlmuProps> = ({
  learnedIds,
  onToggleLearned,
  onNextPage,
}) => {
  const [filter, setFilter] = useState<SettingFilter>('all');
  const [selectedAdab, setSelectedAdab] = useState<AdabItem>(ADAB_LIST[0]);

  const filteredItems =
    filter === 'all' ? ADAB_LIST : ADAB_LIST.filter((item) => item.setting === filter);

  const handleSelectAdab = (item: AdabItem) => {
    soundEngine.playHoloOpen();
    setSelectedAdab(item);
    if (!learnedIds.includes(item.id)) {
      onToggleLearned(item.id);
    }
  };

  return (
    <section className="space-y-8">
      {/* Header + Location Filter */}
      <div className="holo-panel rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-cyan-300">
              Halaman 3 · Pusat Ilmu MATA
            </p>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
              Kenali 8 Adab Jual Beli dalam Islam
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-2xl">
              Terokai lapan adab jual beli melalui ilustrasi situasi sebenar di kedai, pasar dan perniagaan dalam talian di Bandar Niaga.
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0">
            <div className="text-xs text-slate-400">Kemajuan Nota Dipelajari</div>
            <div className="font-mono-num font-bold text-2xl text-cyan-300">
              {learnedIds.length} / {ADAB_LIST.length} Adab
            </div>
          </div>
        </div>

        {/* Interactive Location Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-950/70 border border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('all');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Semua Lokasi (8)
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('kedai');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'kedai'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Kedai Runcit</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('pasar');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'pasar'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShoppingBasket className="w-4 h-4" />
            <span>Pasar Segar</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('online');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'online'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Perniagaan Dalam Talian</span>
          </button>
        </div>
      </div>

      {/* Main Split View: 8 Adab Selector + Detailed Illustrated Holo Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List: 8 Adab Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredItems.map((item) => {
            const isActive = selectedAdab.id === item.id;
            const isLearned = learnedIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectAdab(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-cyan-950/55 border-cyan-400 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg font-mono-num text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-orange-500 text-slate-950'
                        : 'bg-slate-800 text-cyan-300'
                    }`}
                  >
                    {item.number}
                  </span>
                  <div>
                    <h2 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">{item.settingLabel}</p>
                  </div>
                </div>

                {isLearned && (
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                    aria-label="Telah dipelajari"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Detail Panel: Illustrated Situation + Year 5 Explanation */}
        <div className="lg:col-span-7 holo-panel rounded-2xl overflow-hidden">
          <div className="relative aspect-[16/10] w-full bg-slate-950">
            <img
              src={selectedAdab.image}
              alt={`Ilustrasi ${selectedAdab.settingLabel} untuk ${selectedAdab.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091223] via-[#091223]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-orange-300">
                  Adab {selectedAdab.number} daripada 8 · {selectedAdab.settingLabel}
                </p>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">
                  {selectedAdab.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSuccess();
                  onToggleLearned(selectedAdab.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  learnedIds.includes(selectedAdab.id)
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-900/90 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {learnedIds.includes(selectedAdab.id) ? 'Sudah Faham' : 'Tanda Sudah Faham'}
                </span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
                Maksud & Penerangan Ringkas
              </h3>
              <p className="text-base font-semibold text-white">{selectedAdab.meaning}</p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedAdab.explanation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/75 border border-cyan-500/25">
              <p className="text-xs font-semibold text-orange-300 mb-1">
                Contoh Situasi di {selectedAdab.settingLabel}
              </p>
              <p className="text-sm text-slate-100 leading-relaxed">{selectedAdab.situation}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-emerald-950/35 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Amalan Betul</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedAdab.doTip}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/35 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Perkara Dilarang</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedAdab.avoidTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Environments Visual Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Kedai Runcit',
            img: SCENE_IMAGES.kedai,
            note: 'Paparkan harga jelas, jujur tentang mutu barang dan bebas daripada riba.',
            filterKey: 'kedai' as SettingFilter,
          },
          {
            title: 'Pasar Segar',
            img: SCENE_IMAGES.pasar,
            note: 'Gunakan penimbang yang tepat, tidak bersumpah palsu dan sentiasa bertolak ansur.',
            filterKey: 'pasar' as SettingFilter,
          },
          {
            title: 'Perniagaan Dalam Talian',
            img: SCENE_IMAGES.online,
            note: 'Berterus terang tentang kecacatan, amanah menghantar tempahan dan jual barang halal.',
            filterKey: 'online' as SettingFilter,
          },
        ].map((env) => (
          <button
            key={env.title}
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter(env.filterKey);
              const firstMatch = ADAB_LIST.find((a) => a.setting === env.filterKey);
              if (firstMatch) setSelectedAdab(firstMatch);
            }}
            className="text-left holo-panel rounded-xl overflow-hidden group cursor-pointer hover:border-cyan-400/50 transition-colors"
          >
            <div className="aspect-[16/9] overflow-hidden bg-slate-950">
              <img
                src={env.img}
                alt={env.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-base text-white">{env.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{env.note}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onNextPage();
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-base shadow-lg shadow-orange-500/20 transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <span>Seterusnya: Misi Alicia</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
