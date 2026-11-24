import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  RotateCcw,
  Home,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CharacterSlot } from '../components/CharacterSlot';
import {
  ADAB_LIST,
  ALICIA_SITUATIONS,
  BAKAR_MATCH_SETS,
  RIZWAN_QUIZ_QUESTIONS,
} from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page7MisiAkhirProps {
  learnedIds: string[];
  aliciaAnswers: Record<string, boolean>;
  bakarMatchedCount: number;
  rizwanAnswers: Record<number, number>;
  onRepeatMission: () => void;
  onReturnPortal: () => void;
  onGoToQuiz: () => void;
}

function getMataRank(scorePercent: number) {
  if (scorePercent >= 90) {
    return {
      title: 'Ejen MATA Cemerlang',
      message:
        'Tahniah! Anda telah menguasai ilmu dan adab jual beli dalam Islam dengan cemerlang sekali.',
      colorClass: 'text-emerald-300',
      borderClass: 'border-emerald-400/50',
      bgClass: 'bg-emerald-950/45',
    };
  }
  if (scorePercent >= 70) {
    return {
      title: 'Ejen MATA Berjaya',
      message:
        'Syabas, Ejen! Anda berjaya menamatkan operasi di Bandar Niaga dengan prestasi yang membanggakan.',
      colorClass: 'text-cyan-300',
      borderClass: 'border-cyan-400/50',
      bgClass: 'bg-cyan-950/45',
    };
  }
  if (scorePercent >= 50) {
    return {
      title: 'Ejen Dalam Latihan',
      message:
        'Usaha yang baik! Ulang kaji semula nota di Pusat Ilmu untuk meningkatkan lagi markah anda.',
      colorClass: 'text-amber-300',
      borderClass: 'border-amber-400/50',
      bgClass: 'bg-amber-950/45',
    };
  }
  return {
    title: 'Ulang Semula Operasi',
    message:
      'Jangan berputus asa! Sila lengkapkan Taklimat Misi, Pusat Ilmu dan Kuiz Operasi untuk mencapai tahap Ejen Berjaya.',
    colorClass: 'text-rose-300',
    borderClass: 'border-rose-400/50',
    bgClass: 'bg-rose-950/45',
  };
}

export const Page7MisiAkhir: React.FC<Page7MisiAkhirProps> = ({
  learnedIds,
  aliciaAnswers,
  bakarMatchedCount,
  rizwanAnswers,
  onRepeatMission,
  onReturnPortal,
  onGoToQuiz,
}) => {
  const aliciaCorrect = ALICIA_SITUATIONS.filter(
    (s) => aliciaAnswers[s.id] !== undefined && aliciaAnswers[s.id] === s.isCorrect
  ).length;
  const quizCorrect = RIZWAN_QUIZ_QUESTIONS.filter(
    (q) => rizwanAnswers[q.id] !== undefined && rizwanAnswers[q.id] === q.correctIndex
  ).length;
  const quizAnsweredCount = Object.keys(rizwanAnswers).length;
  const quizScorePercent = Math.round(
    (quizCorrect / RIZWAN_QUIZ_QUESTIONS.length) * 100
  );

  const rank = getMataRank(quizScorePercent);
  const totalBakarSlots = BAKAR_MATCH_SETS.length * 2;

  useEffect(() => {
    if (quizScorePercent >= 70) {
      soundEngine.playFanfare();
    }
  }, []);

  return (
    <section className="space-y-8">
      {/* Main Result Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="holo-panel rounded-2xl p-6 sm:p-10 text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-400/50 mx-auto">
          <Award className="w-9 h-9 text-orange-400" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-cyan-300">
            Halaman 7 · Misi Akhir · Laporan Rasmi Operasi Bandar Niaga
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            {quizScorePercent >= 50 ? 'Operasi Berjaya!' : 'Laporan Latihan Ejen'}
          </h1>
        </div>

        {/* Score & Official Rank Card */}
        <div
          className={`max-w-xl mx-auto p-6 rounded-2xl border ${rank.borderClass} ${rank.bgClass} space-y-3`}
        >
          <div className="text-xs text-slate-300">Keputusan Kuiz Operasi Rizwan</div>
          <div className="font-mono-num font-extrabold text-5xl sm:text-6xl text-white">
            {quizScorePercent}%
          </div>
          <div className={`font-display font-bold text-2xl sm:text-3xl ${rank.colorClass}`}>
            {rank.title}
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {rank.message}
          </p>
        </div>

        {quizAnsweredCount < RIZWAN_QUIZ_QUESTIONS.length && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex flex-wrap items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Anda baru menjawab {quizAnsweredCount} daripada {RIZWAN_QUIZ_QUESTIONS.length} soalan Kuiz Operasi.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onGoToQuiz();
              }}
              className="px-3.5 py-2 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer whitespace-nowrap"
            >
              Lengkapkan Kuiz
            </button>
          </div>
        )}

        {/* Mission Breakdown Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left pt-2">
          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-800">
            <div className="text-xs text-slate-400">Pusat Ilmu</div>
            <div className="font-mono-num font-bold text-xl text-cyan-300 mt-1">
              {learnedIds.length} / {ADAB_LIST.length}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">Adab dipelajari</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-800">
            <div className="text-xs text-slate-400">Misi Alicia</div>
            <div className="font-mono-num font-bold text-xl text-amber-300 mt-1">
              {aliciaCorrect} / {ALICIA_SITUATIONS.length}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">Situasi tepat</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-800">
            <div className="text-xs text-slate-400">Misi Bakar</div>
            <div className="font-mono-num font-bold text-xl text-orange-300 mt-1">
              {bakarMatchedCount} / {totalBakarSlots}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">Slot dipadankan</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-800">
            <div className="text-xs text-slate-400">Misi Rizwan</div>
            <div className="font-mono-num font-bold text-xl text-emerald-300 mt-1">
              {quizCorrect} / {RIZWAN_QUIZ_QUESTIONS.length}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">Soalan betul</div>
          </div>
        </div>
      </motion.div>

      {/* Celebration Squad: Ali, Alicia, Bakar, Rizwan & Comot */}
      <div className="holo-panel-orange rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Pasukan Utama MATA</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
            Ali dan Rakan-Rakan Meraikan Kejayaan Anda!
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            "Syabas, Ejen Pelatih! Teruskan mengamalkan sikap jujur, amanah, tepat timbangan, bertolak ansur dan menjauhi riba setiap kali berjual beli."
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-7 pt-2">
          <CharacterSlot agentId="ali" size="sm" caption="Teras Tekno" />
          <CharacterSlot agentId="comot" size="sm" caption="Unit Pengesan" />
          <CharacterSlot agentId="alicia" size="sm" caption="Teras Neuro" />
          <CharacterSlot agentId="bakar" size="sm" caption="Teras Kombat" />
          <CharacterSlot agentId="rizwan" size="sm" caption="Teras Inviso" />
        </div>
      </div>

      {/* Required Action Buttons: ULANG MISI & KEMBALI KE PORTAL */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playHoloOpen();
            onRepeatMission();
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-base shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5" />
          <span>ULANG MISI</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onReturnPortal();
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-200 border border-cyan-500/35 font-display font-bold text-base cursor-pointer whitespace-nowrap"
        >
          <Home className="w-5 h-5 text-cyan-300" />
          <span>KEMBALI KE PORTAL</span>
        </button>
      </div>
    </section>
  );
};
