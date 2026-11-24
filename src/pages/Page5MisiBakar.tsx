import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  GripVertical,
  AlertCircle,
} from 'lucide-react';
import { CharacterSlot } from '../components/CharacterSlot';
import { BAKAR_MATCH_SETS } from '../data/missionData';
import { soundEngine } from '../utils/sound';

interface Page5MisiBakarProps {
  matchedMeanings: string[];
  matchedSituations: string[];
  mistakes: number;
  onMatchMeaning: (id: string) => void;
  onMatchSituation: (id: string) => void;
  onRecordMistake: () => void;
  onReset: () => void;
  onNextPage: () => void;
}

type CardKind = 'meaning' | 'situation';

interface DragItem {
  id: string;
  kind: CardKind;
  text: string;
}

export const Page5MisiBakar: React.FC<Page5MisiBakarProps> = ({
  matchedMeanings,
  matchedSituations,
  mistakes,
  onMatchMeaning,
  onMatchSituation,
  onRecordMistake,
  onReset,
  onNextPage,
}) => {
  const [round, setRound] = useState<1 | 2>(1);
  const [selectedCard, setSelectedCard] = useState<DragItem | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const roundSets = useMemo(
    () => BAKAR_MATCH_SETS.filter((s) => s.round === round),
    [round]
  );

  // Deterministic scramble order per round so cards don't line up trivially
  const scrambledMeanings = useMemo(() => {
    const order = round === 1 ? [2, 0, 3, 1] : [3, 1, 0, 2];
    return order
      .map((i) => roundSets[i])
      .filter(Boolean)
      .map((s) => ({ id: s.id, kind: 'meaning' as const, text: s.meaning }));
  }, [round, roundSets]);

  const scrambledSituations = useMemo(() => {
    const order = round === 1 ? [1, 3, 0, 2] : [2, 0, 3, 1];
    return order
      .map((i) => roundSets[i])
      .filter(Boolean)
      .map((s) => ({ id: s.id, kind: 'situation' as const, text: s.situation }));
  }, [round, roundSets]);

  const totalSlots = BAKAR_MATCH_SETS.length * 2;
  const completedSlots = matchedMeanings.length + matchedSituations.length;
  const round1Done = BAKAR_MATCH_SETS.filter((s) => s.round === 1).every(
    (s) => matchedMeanings.includes(s.id) && matchedSituations.includes(s.id)
  );
  const round2Done = BAKAR_MATCH_SETS.filter((s) => s.round === 2).every(
    (s) => matchedMeanings.includes(s.id) && matchedSituations.includes(s.id)
  );

  const attemptMatch = (targetId: string, targetKind: CardKind, card: DragItem) => {
    if (card.kind !== targetKind) {
      soundEngine.playError();
      onRecordMistake();
      setFeedback({
        ok: false,
        text:
          targetKind === 'meaning'
            ? 'Slot ini untuk Maksud Adab. Pilih atau seret kad daripada senarai Maksud Adab.'
            : 'Slot ini untuk Contoh Situasi. Pilih atau seret kad daripada senarai Contoh Situasi.',
      });
      return;
    }

    if (card.id === targetId) {
      soundEngine.playSuccess();
      if (targetKind === 'meaning') {
        onMatchMeaning(targetId);
      } else {
        onMatchSituation(targetId);
      }
      setSelectedCard(null);
      setFeedback({
        ok: true,
        text: 'Tepat sekali, Ejen! Padanan berjaya dikunci dalam sistem Bakar.',
      });
    } else {
      soundEngine.playError();
      onRecordMistake();
      setFeedback({
        ok: false,
        text: 'Belum sepadan! Semak semula hubungan antara adab, maksud dan situasi tersebut.',
      });
    }
  };

  return (
    <section className="space-y-8">
      {/* Bakar Header */}
      <div className="holo-panel-orange rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <CharacterSlot agentId="bakar" size="md" caption="Jurulatih Teras Kombat" />

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-rose-300">
                Halaman 5 · Misi Bakar
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-0.5">
                Cabaran Padanan Adab Jual Beli
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-orange-500/30">
              <div>
                <div className="text-[11px] text-slate-400">Padanan Lengkap</div>
                <div className="font-mono-num font-bold text-base text-cyan-300">
                  {completedSlots} / {totalSlots}
                </div>
              </div>
              <div className="h-7 w-px bg-slate-800" />
              <div>
                <div className="text-[11px] text-slate-400">Silap</div>
                <div className="font-mono-num font-bold text-base text-amber-300">
                  {mistakes}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            "Bagus, Ejen Pelatih! Tugas anda ialah memadankan setiap Adab Jual Beli dengan Maksud Adab dan Contoh Situasinya. Anda boleh seret (drag & drop) kad ke dalam slot, atau klik kad dan klik slot sasaran."
          </p>

          {/* Round Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setRound(1);
                setSelectedCard(null);
                setFeedback(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                round === 1
                  ? 'bg-orange-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              Pusingan 1 (Adab 1–4) {round1Done ? '· Selesai' : ''}
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setRound(2);
                setSelectedCard(null);
                setFeedback(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                round === 2
                  ? 'bg-orange-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              Pusingan 2 (Adab 5–8) {round2Done ? '· Selesai' : ''}
            </button>
          </div>
        </div>
      </div>

      {/* Live Feedback Bar */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            feedback.ok
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}
        >
          {feedback.ok ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Matching Target Table */}
      <div className="space-y-3">
        {roundSets.map((setItem) => {
          const hasMeaning = matchedMeanings.includes(setItem.id);
          const hasSituation = matchedSituations.includes(setItem.id);

          return (
            <div
              key={setItem.id}
              className="holo-panel rounded-xl p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
            >
              {/* Column 1: Adab Name */}
              <div className="lg:col-span-3 flex flex-col justify-center p-3.5 rounded-lg bg-slate-950/80 border border-orange-500/30">
                <span className="text-[11px] font-semibold text-orange-300">Adab Jual Beli</span>
                <span className="font-display font-bold text-base sm:text-lg text-white mt-0.5">
                  {setItem.adab}
                </span>
              </div>

              {/* Column 2: Meaning Drop/Click Slot */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const raw = e.dataTransfer.getData('application/json');
                  if (!raw) return;
                  try {
                    const card = JSON.parse(raw) as DragItem;
                    if (!hasMeaning) attemptMatch(setItem.id, 'meaning', card);
                  } catch {
                    // ignore invalid drag payload
                  }
                }}
                onClick={() => {
                  if (!hasMeaning && selectedCard) {
                    attemptMatch(setItem.id, 'meaning', selectedCard);
                  }
                }}
                className={`lg:col-span-4 rounded-lg p-3.5 border-2 transition-all flex flex-col justify-center ${
                  hasMeaning
                    ? 'bg-emerald-950/40 border-emerald-500/50'
                    : selectedCard?.kind === 'meaning'
                      ? 'bg-cyan-950/40 border-dashed border-cyan-400 cursor-pointer'
                      : 'bg-slate-900/60 border-dashed border-slate-700'
                }`}
              >
                <span className="text-[11px] font-semibold text-cyan-300 mb-1">
                  Maksud Adab
                </span>
                {hasMeaning ? (
                  <div className="flex items-start gap-2 text-sm text-emerald-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{setItem.meaning}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    {selectedCard?.kind === 'meaning'
                      ? 'Klik di sini untuk letak Maksud Adab'
                      : 'Seret atau pilih Kad Maksud Adab ke sini'}
                  </p>
                )}
              </div>

              {/* Column 3: Situation Drop/Click Slot */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const raw = e.dataTransfer.getData('application/json');
                  if (!raw) return;
                  try {
                    const card = JSON.parse(raw) as DragItem;
                    if (!hasSituation) attemptMatch(setItem.id, 'situation', card);
                  } catch {
                    // ignore invalid drag payload
                  }
                }}
                onClick={() => {
                  if (!hasSituation && selectedCard) {
                    attemptMatch(setItem.id, 'situation', selectedCard);
                  }
                }}
                className={`lg:col-span-5 rounded-lg p-3.5 border-2 transition-all flex flex-col justify-center ${
                  hasSituation
                    ? 'bg-emerald-950/40 border-emerald-500/50'
                    : selectedCard?.kind === 'situation'
                      ? 'bg-orange-950/40 border-dashed border-orange-400 cursor-pointer'
                      : 'bg-slate-900/60 border-dashed border-slate-700'
                }`}
              >
                <span className="text-[11px] font-semibold text-orange-300 mb-1">
                  Contoh Situasi
                </span>
                {hasSituation ? (
                  <div className="flex items-start gap-2 text-sm text-emerald-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{setItem.situation}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    {selectedCard?.kind === 'situation'
                      ? 'Klik di sini untuk letak Contoh Situasi'
                      : 'Seret atau pilih Kad Contoh Situasi ke sini'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Draggable / Clickable Card Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meaning Cards Pool */}
        <div className="holo-panel rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-cyan-300">
              Pilihan Kad Maksud Adab
            </h2>
            <span className="text-xs text-slate-400">Seret atau klik kad</span>
          </div>

          <div className="space-y-2.5">
            {scrambledMeanings.map((card) => {
              const isMatched = matchedMeanings.includes(card.id);
              const isSelected =
                selectedCard?.id === card.id && selectedCard?.kind === 'meaning';

              if (isMatched) return null;

              return (
                <div
                  key={`m-${card.id}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify(card));
                    setSelectedCard(card);
                  }}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCard(isSelected ? null : card);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all select-none ${
                    isSelected
                      ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-900/80 border-slate-700 hover:border-cyan-400/60 text-slate-100'
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm font-medium">{card.text}</span>
                </div>
              );
            })}

            {scrambledMeanings.every((c) => matchedMeanings.includes(c.id)) && (
              <p className="text-xs text-emerald-300 py-3">
                Semua Kad Maksud Adab untuk pusingan ini telah berjaya dipadankan!
              </p>
            )}
          </div>
        </div>

        {/* Situation Cards Pool */}
        <div className="holo-panel rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-orange-300">
              Pilihan Kad Contoh Situasi
            </h2>
            <span className="text-xs text-slate-400">Seret atau klik kad</span>
          </div>

          <div className="space-y-2.5">
            {scrambledSituations.map((card) => {
              const isMatched = matchedSituations.includes(card.id);
              const isSelected =
                selectedCard?.id === card.id && selectedCard?.kind === 'situation';

              if (isMatched) return null;

              return (
                <div
                  key={`s-${card.id}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify(card));
                    setSelectedCard(card);
                  }}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCard(isSelected ? null : card);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all select-none ${
                    isSelected
                      ? 'bg-orange-500/25 border-orange-400 text-white shadow-md'
                      : 'bg-slate-900/80 border-slate-700 hover:border-orange-400/60 text-slate-100'
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-sm font-medium">{card.text}</span>
                </div>
              );
            })}

            {scrambledSituations.every((c) => matchedSituations.includes(c.id)) && (
              <p className="text-xs text-emerald-300 py-3">
                Semua Kad Contoh Situasi untuk pusingan ini telah berjaya dipadankan!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onReset();
            setSelectedCard(null);
            setFeedback(null);
            setRound(1);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulang Cabaran Padanan</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {round === 1 && round1Done && !round2Done && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playHoloOpen();
                setRound(2);
                setFeedback(null);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm cursor-pointer whitespace-nowrap"
            >
              <span>Lanjut ke Pusingan 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNextPage();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-display font-bold text-base shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap"
          >
            <span>Seterusnya: Misi Rizwan</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
