import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { CharacterSlot } from '../components/CharacterSlot';
import { ALICIA_SITUATIONS } from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page4MisiAliciaProps {
  answers: Record<string, boolean>;
  onAnswer: (situationId: string, chosenIsCorrect: boolean) => void;
  onReset: () => void;
  onNextPage: () => void;
}

export const Page4MisiAlicia: React.FC<Page4MisiAliciaProps> = ({
  answers,
  onAnswer,
  onReset,
  onNextPage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = ALICIA_SITUATIONS[currentIndex];

  const chosen = answers[current.id];
  const hasAnswered = chosen !== undefined;
  const isUserRight = hasAnswered && chosen === current.isCorrect;

  const answeredCount = Object.keys(answers).length;
  const correctCount = ALICIA_SITUATIONS.filter(
    (s) => answers[s.id] !== undefined && answers[s.id] === s.isCorrect
  ).length;

  const handlePick = (choiceIsCorrect: boolean) => {
    if (hasAnswered) return;
    onAnswer(current.id, choiceIsCorrect);
    if (choiceIsCorrect === current.isCorrect) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playError();
    }
  };

  return (
    <section className="space-y-8">
      {/* Alicia Briefing Header */}
      <div className="holo-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <CharacterSlot agentId="alicia" size="md" caption="Pegawai Analisis Situasi" />

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-amber-300">
                Halaman 4 · Misi Alicia
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-0.5">
                Kenal Pasti Situasi Jual Beli
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-cyan-500/25">
              <div>
                <div className="text-[11px] text-slate-400">Dijawab</div>
                <div className="font-mono-num font-bold text-base text-white">
                  {answeredCount} / {ALICIA_SITUATIONS.length}
                </div>
              </div>
              <div className="h-7 w-px bg-slate-800" />
              <div>
                <div className="text-[11px] text-slate-400">Tepat</div>
                <div className="font-mono-num font-bold text-base text-emerald-300">
                  {correctCount}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            "Ejen Pelatih, saya sedang memantau kamera pengawasan di Bandar Niaga. Analisis setiap situasi jual beli berikut dan tentukan sama ada ia menunjukkan adab yang BETUL atau SALAH."
          </p>
        </div>
      </div>

      {/* Situation Stepper Pills (Interactive tabs) */}
      <div className="flex flex-wrap items-center gap-2">
        {ALICIA_SITUATIONS.map((sit, idx) => {
          const ans = answers[sit.id];
          const answered = ans !== undefined;
          const correct = answered && ans === sit.isCorrect;
          const active = idx === currentIndex;

          return (
            <button
              key={sit.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentIndex(idx);
              }}
              className={`px-3.5 py-2 rounded-lg font-mono-num text-xs font-bold transition-all cursor-pointer border ${
                active
                  ? 'bg-orange-500 text-slate-950 border-orange-400'
                  : answered
                    ? correct
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                    : 'bg-slate-900/70 text-slate-300 border-slate-700 hover:border-cyan-400/50'
              }`}
            >
              Situasi {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Situation Scanner Card */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="holo-panel rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>{current.location}</span>
          </span>
          <span className="text-xs font-mono-num text-slate-400">
            Kes {currentIndex + 1} daripada {ALICIA_SITUATIONS.length}
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-xl bg-slate-950/80 border border-cyan-500/25">
          <p className="font-display font-semibold text-lg sm:text-2xl text-white leading-snug">
            "{current.scenario}"
          </p>
        </div>

        {/* Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            disabled={hasAnswered}
            onClick={() => handlePick(true)}
            className={`p-5 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
              hasAnswered
                ? chosen === true
                  ? isUserRight
                    ? 'bg-emerald-950/60 border-emerald-400 text-white'
                    : 'bg-rose-950/60 border-rose-400 text-white'
                  : current.isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                : 'bg-slate-900/80 border-emerald-500/35 hover:border-emerald-400 hover:bg-emerald-950/35 text-white cursor-pointer'
            }`}
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="font-display font-bold text-lg">Adab Betul</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Menepati adab jual beli dalam Islam
              </div>
            </div>
          </button>

          <button
            type="button"
            disabled={hasAnswered}
            onClick={() => handlePick(false)}
            className={`p-5 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
              hasAnswered
                ? chosen === false
                  ? isUserRight
                    ? 'bg-emerald-950/60 border-emerald-400 text-white'
                    : 'bg-rose-950/60 border-rose-400 text-white'
                  : !current.isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                : 'bg-slate-900/80 border-rose-500/35 hover:border-rose-400 hover:bg-rose-950/35 text-white cursor-pointer'
            }`}
          >
            <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
            <div>
              <div className="font-display font-bold text-lg">Adab Salah</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Melanggar adab jual beli dalam Islam
              </div>
            </div>
          </button>
        </div>

        {/* Immediate Feedback Banner */}
        {hasAnswered && (
          <div
            className={`p-5 rounded-xl border ${
              isUserRight
                ? 'bg-emerald-950/45 border-emerald-500/45'
                : 'bg-rose-950/45 border-rose-500/45'
            }`}
          >
            <div className="flex items-center gap-2 font-display font-bold text-base">
              {isUserRight ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span className="text-emerald-200">
                    Maklum Balas Alicia: Jawapan Anda Betul!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-300" />
                  <span className="text-rose-200">
                    Maklum Balas Alicia: Cuba Teliti Semula!
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-slate-100 mt-2 leading-relaxed">
              {isUserRight ? current.feedbackCorrect : current.feedbackWrong}
            </p>
            <p className="text-xs text-cyan-300 mt-2 font-medium">
              Kaitan Adab: {current.adabRelated}
            </p>
          </div>
        )}

        {/* Controls Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onReset();
              setCurrentIndex(0);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulang Misi Alicia</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex < ALICIA_SITUATIONS.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setCurrentIndex((prev) => prev + 1);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm cursor-pointer whitespace-nowrap"
              >
                <span>Situasi Seterusnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNextPage();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                <span>Seterusnya: Misi Bakar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
