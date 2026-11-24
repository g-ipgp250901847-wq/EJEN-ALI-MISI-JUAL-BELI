import React from 'react';
import { X, Compass, BookOpen, CheckCircle2, Puzzle, HelpCircle, Award } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface MissionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMission: () => void;
}

export const MissionGuideModal: React.FC<MissionGuideModalProps> = ({
  isOpen,
  onClose,
  onStartMission,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Compass,
      title: '1. Taklimat Misi (Ejen Ali)',
      desc: 'Fahami 4 objektif pembelajaran, kad hologram maksud & rukun jual beli, serta tonton video pembelajaran.',
    },
    {
      icon: BookOpen,
      title: '2. Pusat Ilmu (Bandar Niaga)',
      desc: 'Pelajari 8 adab jual beli dalam Islam lengkap dengan ilustrasi di kedai, pasar dan perniagaan dalam talian.',
    },
    {
      icon: CheckCircle2,
      title: '3. Misi Alicia (Kenal Pasti Situasi)',
      desc: 'Analisis 8 situasi jual beli di Bandar Niaga dan tentukan sama ada amalan tersebut BETUL atau SALAH.',
    },
    {
      icon: Puzzle,
      title: '4. Misi Bakar (Cabaran Padanan)',
      desc: 'Padankan Adab Jual Beli dengan Maksud Adab dan Contoh Situasi menggunakan seretan atau butang pilihan.',
    },
    {
      icon: HelpCircle,
      title: '5. Misi Rizwan (Kuiz Operasi)',
      desc: 'Jawab 10 soalan objektif untuk menguji kefahaman anda dengan pemarkahan automatik.',
    },
    {
      icon: Award,
      title: '6. Misi Akhir (Penilaian & Pangkat)',
      desc: 'Terima pangkat rasmi MATA daripada Ejen MATA Cemerlang (90–100%) hingga Ulang Semula Operasi.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="holo-panel w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-cyan-500/20">
          <div>
            <h2 id="guide-modal-title" className="text-xl font-display font-bold text-white">
              Panduan Misi Ejen Pelatih MATA
            </h2>
            <p className="text-xs text-cyan-300 mt-0.5">
              Pendidikan Islam Tahun 5 · Bidang Fiqah · Adab Jual Beli
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/70 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2 text-cyan-300 font-display font-semibold text-sm">
                    <Icon className="w-4 h-4 shrink-0 text-orange-400" />
                    <span>{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/25">
            <h3 className="text-sm font-display font-bold text-white mb-2">
              Tahap Ganjaran Pangkat MATA
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30">
                <div className="font-mono-num font-bold text-emerald-300">90–100%</div>
                <div className="text-slate-200 mt-0.5">Ejen MATA Cemerlang</div>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30">
                <div className="font-mono-num font-bold text-cyan-300">70–89%</div>
                <div className="text-slate-200 mt-0.5">Ejen MATA Berjaya</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/30">
                <div className="font-mono-num font-bold text-amber-300">50–69%</div>
                <div className="text-slate-200 mt-0.5">Ejen Dalam Latihan</div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/30">
                <div className="font-mono-num font-bold text-rose-300">&lt; 50%</div>
                <div className="text-slate-200 mt-0.5">Ulang Semula Operasi</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-cyan-500/20 bg-slate-950/60">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playHoloOpen();
              onClose();
              onStartMission();
            }}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-sm font-bold text-slate-950 transition-colors cursor-pointer"
          >
            Mula Operasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
