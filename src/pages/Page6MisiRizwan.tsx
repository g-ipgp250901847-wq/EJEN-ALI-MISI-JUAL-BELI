import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
} from 'lucide-react';
import { CharacterSlot } from '../components/CharacterSlot';
import { RIZWAN_QUIZ_QUESTIONS } from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page6MisiRizwanProps {
  answers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  onReset: () => void;
  onFinishQuiz: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const Page6MisiRizwan: React.FC<Page6MisiRizwanProps> = ({
  answers,
  onSelectAnswer,
  onReset,
  onFinishQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQ = RIZWAN_QUIZ_QUESTIONS[currentIdx];

  const userChoice = answers[currentQ.id];
  const hasAnswered = userChoice !== undefined;
  const isRight = hasAnswered && userChoice === currentQ.correctIndex;

  const totalAnswered = Object.keys(answers).length;
  const correctCount = RIZWAN_QUIZ_QUESTIONS.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / RIZWAN_QUIZ_QUESTIONS.length) * 100);
  const allAnswered = totalAnswered === RIZWAN_QUIZ_QUESTIONS.length;

  const handleOptionClick = (optIdx: number) => {
    if (hasAnswered) return;
    onSelectAnswer(currentQ.id, optIdx);
    if (optIdx === currentQ.correctIndex) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playError();
    }
  };

  return (
    <section className="space-y-8">
      {/* Rizwan Header */}
      <div className="holo-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <CharacterSlot agentId="rizwan" size="md" caption="Ketua Penguji Kuiz MATA" />

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-sky-300">
                Halaman 6 · Misi Rizwan · Objek Pembelajaran 2
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-0.5">
                Kuiz Operasi Adab Jual Beli
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-cyan-500/25">
              <div>
                <div className="text-[11px] text-slate-400">Soalan</div>
                <div className="font-mono-num font-bold text-base text-white">
                  {totalAnswered} / {RIZWAN_QUIZ_QUESTIONS.length}
                </div>
              </div>
              <div className="h-7 w-px bg-slate-800" />
              <div>
                <div className="text-[11px] text-slate-400">Markah Automatik</div>
                <div className="font-mono-num font-bold text-base text-cyan-300">
                  {scorePercent}%
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            "Ujian terakhir sebelum anda diiktiraf sebagai Ejen MATA. Jawab kesemua 10 soalan objektif dengan teliti."
          </p>

          {/* Quiz Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Kemajuan Kuiz Operasi</span>
              <span className="font-mono-num text-cyan-300">
                {Math.round((totalAnswered / RIZWAN_QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-orange-400 transition-all duration-300"
                style={{
                  width: `${(totalAnswered / RIZWAN_QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Number Navigator */}
      <div className="flex flex-wrap items-center gap-2">
        {RIZWAN_QUIZ_QUESTIONS.map((q, idx) => {
          const ans = answers[q.id];
          const answered = ans !== undefined;
          const correct = answered && ans === q.correctIndex;
          const active = idx === currentIdx;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setCurrentIdx(idx);
              }}
              className={`w-10 h-10 rounded-lg font-mono-num text-xs font-bold transition-all cursor-pointer border ${
                active
                  ? 'bg-orange-500 text-slate-950 border-orange-400'
                  : answered
                    ? correct
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/45'
                      : 'bg-rose-950/60 text-rose-300 border-rose-500/45'
                    : 'bg-slate-900/75 text-slate-300 border-slate-700 hover:border-cyan-400/50'
              }`}
              aria-label={`Soalan ${q.id}`}
            >
              {q.id}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="holo-panel rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-2">
          <p className="text-xs font-mono-num font-semibold text-cyan-300">
            SOALAN {currentQ.id} DARIPADA {RIZWAN_QUIZ_QUESTIONS.length}
          </p>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* 4 Answer Choices */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((optText, optIdx) => {
            const isSelected = userChoice === optIdx;
            const isCorrectOption = currentQ.correctIndex === optIdx;

            let cardStyle =
              'bg-slate-900/80 border-slate-700 hover:border-cyan-400 text-slate-100 cursor-pointer';
            if (hasAnswered) {
              if (isCorrectOption) {
                cardStyle = 'bg-emerald-950/60 border-emerald-400 text-white';
              } else if (isSelected) {
                cardStyle = 'bg-rose-950/60 border-rose-400 text-white';
              } else {
                cardStyle = 'bg-slate-950/50 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={optText}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleOptionClick(optIdx)}
                className={`p-4 rounded-xl border-2 text-left flex items-center justify-between gap-4 transition-all ${cardStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-lg font-mono-num text-sm font-bold flex items-center justify-center shrink-0 ${
                      hasAnswered && isCorrectOption
                        ? 'bg-emerald-500 text-slate-950'
                        : hasAnswered && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-cyan-300'
                    }`}
                  >
                    {OPTION_LETTERS[optIdx]}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-snug">
                    {optText}
                  </span>
                </div>

                {hasAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback */}
        {hasAnswered && (
          <div
            className={`p-5 rounded-xl border ${
              isRight
                ? 'bg-emerald-950/45 border-emerald-500/45'
                : 'bg-rose-950/45 border-rose-500/45'
            }`}
          >
            <div className="flex items-center gap-2 font-display font-bold text-base">
              {isRight ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span className="text-emerald-200">
                    Jawapan Tepat! (+10% Markah)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-300" />
                  <span className="text-rose-200">
                    Jawapan Kurang Tepat (Jawapan Sebenar: {OPTION_LETTERS[currentQ.correctIndex]})
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-slate-100 mt-2 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onReset();
              setCurrentIdx(0);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulang Kuiz</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIdx < RIZWAN_QUIZ_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setCurrentIdx((prev) => prev + 1);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm cursor-pointer whitespace-nowrap"
              >
                <span>Soalan Seterusnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playFanfare();
                  onFinishQuiz();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-sm sm:text-base shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap"
              >
                <Award className="w-5 h-5" />
                <span>
                  {allAnswered ? 'Lihat Keputusan Operasi' : 'Tamat & Lihat Keputusan'}
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
