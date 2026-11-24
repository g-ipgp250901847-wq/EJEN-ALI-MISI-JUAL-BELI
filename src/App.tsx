import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ImagePlus, Check } from 'lucide-react';
import { CharacterProvider, useCharacters } from './context/CharacterContext';
import { CharacterManagerModal } from './components/CharacterManagerModal';
import { MissionGuideModal } from './components/MissionGuideModal';
import {
  ADAB_LIST,
  ALICIA_SITUATIONS,
  BAKAR_MATCH_SETS,
  MISSION_PAGES,
  PageId,
  RIZWAN_QUIZ_QUESTIONS,
} from './data/missionData';
import { Page1Portal } from './pages/Page1Portal';
import { Page2Taklimat } from './pages/Page2Taklimat';
import { Page3PusatIlmu } from './pages/Page3PusatIlmu';
import { Page4MisiAlicia } from './pages/Page4MisiAlicia';
import { Page5MisiBakar } from './pages/Page5MisiBakar';
import { Page6MisiRizwan } from './pages/Page6MisiRizwan';
import { Page7MisiAkhir } from './pages/Page7MisiAkhir';
import { soundEngine } from './utils/sound';

function MissionAppShell() {
  const { openManager } = useCharacters();
  const [activePage, setActivePage] = useState<PageId>('portal');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => soundEngine.isMuted());

  // Learning & Mission State
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [briefingDone, setBriefingDone] = useState(false);
  const [learnedIds, setLearnedIds] = useState<string[]>([]);
  const [aliciaAnswers, setAliciaAnswers] = useState<Record<string, boolean>>({});
  const [bakarMeanings, setBakarMeanings] = useState<string[]>([]);
  const [bakarSituations, setBakarSituations] = useState<string[]>([]);
  const [bakarMistakes, setBakarMistakes] = useState(0);
  const [rizwanAnswers, setRizwanAnswers] = useState<Record<number, number>>({});

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute overall mission completion percentage
  const totalMilestones =
    1 + // Taklimat
    ADAB_LIST.length + // 8 adab
    ALICIA_SITUATIONS.length + // 8 situations
    BAKAR_MATCH_SETS.length * 2 + // 16 matching slots
    RIZWAN_QUIZ_QUESTIONS.length; // 10 quiz questions

  const completedMilestones =
    (briefingDone ? 1 : 0) +
    learnedIds.length +
    Object.keys(aliciaAnswers).length +
    bakarMeanings.length +
    bakarSituations.length +
    Object.keys(rizwanAnswers).length;

  const overallProgress = Math.min(
    100,
    Math.round((completedMilestones / totalMilestones) * 100)
  );

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
    if (!next) soundEngine.playClick();
  };

  const handleToggleLearned = (id: string) => {
    setLearnedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRepeatFullMission = () => {
    setBriefingDone(false);
    setLearnedIds([]);
    setAliciaAnswers({});
    setBakarMeanings([]);
    setBakarSituations([]);
    setBakarMistakes(0);
    setRizwanAnswers({});
    navigateTo('taklimat');
  };

  useEffect(() => {
    if (activePage === 'taklimat') {
      // Mark briefing visited gently only after user interacts or opens cards
    }
  }, [activePage]);

  const currentPageMeta =
    MISSION_PAGES.find((p) => p.id === activePage) ?? MISSION_PAGES[0];

  const isStepComplete = (id: PageId): boolean => {
    switch (id) {
      case 'portal':
        return activePage !== 'portal' || completedMilestones > 0;
      case 'taklimat':
        return briefingDone;
      case 'pusat-ilmu':
        return learnedIds.length >= ADAB_LIST.length;
      case 'misi-alicia':
        return Object.keys(aliciaAnswers).length >= ALICIA_SITUATIONS.length;
      case 'misi-bakar':
        return (
          bakarMeanings.length >= BAKAR_MATCH_SETS.length &&
          bakarSituations.length >= BAKAR_MATCH_SETS.length
        );
      case 'misi-rizwan':
        return Object.keys(rizwanAnswers).length >= RIZWAN_QUIZ_QUESTIONS.length;
      case 'misi-akhir':
        return Object.keys(rizwanAnswers).length >= RIZWAN_QUIZ_QUESTIONS.length;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B16] text-slate-100 mata-grid-bg">
      {/* Top Bar: Clean 3-Zone Contract */}
      <header className="sticky top-0 z-40 border-b border-cyan-500/20 bg-[#060B16]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              navigateTo('portal');
            }}
            className="font-display font-bold text-base sm:text-lg tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Ejen Ali: Misi Jual Beli
          </button>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
            aria-label="Navigasi Utama"
          >
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                navigateTo('portal');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'portal' ? 'text-cyan-300 font-semibold' : ''
              }`}
            >
              Portal
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                navigateTo('taklimat');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'taklimat' ? 'text-cyan-300 font-semibold' : ''
              }`}
            >
              Taklimat
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                navigateTo('pusat-ilmu');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'pusat-ilmu' ? 'text-cyan-300 font-semibold' : ''
              }`}
            >
              Pusat Ilmu
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                navigateTo('misi-alicia');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'misi-alicia' ||
                activePage === 'misi-bakar' ||
                activePage === 'misi-rizwan'
                  ? 'text-cyan-300 font-semibold'
                  : ''
              }`}
            >
              Misi Ejen
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                navigateTo('misi-akhir');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'misi-akhir' ? 'text-cyan-300 font-semibold' : ''
              }`}
            >
              Keputusan
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setIsGuideOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-xs sm:text-sm font-bold text-slate-950 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Panduan Misi
            </button>
          </div>
        </div>
      </header>

      {/* Mission Stepper & Progress Toolbar (Below Header) */}
      <div className="border-b border-slate-800/80 bg-[#081021]/85">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 space-y-3">
          {/* Progress Summary + Audio & Character Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-[220px]">
              <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
                Kemajuan Operasi:
              </span>
              <div className="flex-1 max-w-xs h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-orange-400 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="font-mono-num text-xs font-bold text-cyan-300 whitespace-nowrap">
                {overallProgress}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  openManager();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <ImagePlus className="w-3.5 h-3.5 text-orange-300" />
                <span>Watak MATA</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                aria-label={muted ? 'Aktifkan bunyi' : 'Senyapkan bunyi'}
              >
                {muted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bunyi Tutup</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Audio Aktif</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 7-Page Stepper Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MISSION_PAGES.map((page) => {
              const isActive = activePage === page.id;
              const done = isStepComplete(page.id);

              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    navigateTo(page.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : done
                        ? 'bg-emerald-950/45 text-emerald-200 border-emerald-500/35 hover:border-emerald-400'
                        : 'bg-slate-900/75 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                  }`}
                >
                  <span className="font-mono-num">{page.step}.</span>
                  <span>{page.shortLabel}</span>
                  {done && !isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activePage === 'portal' && (
          <Page1Portal
            onStartOperation={() => navigateTo('taklimat')}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {activePage === 'taklimat' && (
          <Page2Taklimat
            customVideoUrl={customVideoUrl}
            onChangeVideoUrl={setCustomVideoUrl}
            onCompleteBriefing={() => setBriefingDone(true)}
            onNextPage={() => navigateTo('pusat-ilmu')}
          />
        )}

        {activePage === 'pusat-ilmu' && (
          <Page3PusatIlmu
            learnedIds={learnedIds}
            onToggleLearned={handleToggleLearned}
            onNextPage={() => navigateTo('misi-alicia')}
          />
        )}

        {activePage === 'misi-alicia' && (
          <Page4MisiAlicia
            answers={aliciaAnswers}
            onAnswer={(id, choice) =>
              setAliciaAnswers((prev) => ({ ...prev, [id]: choice }))
            }
            onReset={() => setAliciaAnswers({})}
            onNextPage={() => navigateTo('misi-bakar')}
          />
        )}

        {activePage === 'misi-bakar' && (
          <Page5MisiBakar
            matchedMeanings={bakarMeanings}
            matchedSituations={bakarSituations}
            mistakes={bakarMistakes}
            onMatchMeaning={(id) =>
              setBakarMeanings((prev) => (prev.includes(id) ? prev : [...prev, id]))
            }
            onMatchSituation={(id) =>
              setBakarSituations((prev) => (prev.includes(id) ? prev : [...prev, id]))
            }
            onRecordMistake={() => setBakarMistakes((prev) => prev + 1)}
            onReset={() => {
              setBakarMeanings([]);
              setBakarSituations([]);
              setBakarMistakes(0);
            }}
            onNextPage={() => navigateTo('misi-rizwan')}
          />
        )}

        {activePage === 'misi-rizwan' && (
          <Page6MisiRizwan
            answers={rizwanAnswers}
            onSelectAnswer={(qId, optIdx) =>
              setRizwanAnswers((prev) => ({ ...prev, [qId]: optIdx }))
            }
            onReset={() => setRizwanAnswers({})}
            onFinishQuiz={() => navigateTo('misi-akhir')}
          />
        )}

        {activePage === 'misi-akhir' && (
          <Page7MisiAkhir
            learnedIds={learnedIds}
            aliciaAnswers={aliciaAnswers}
            bakarMatchedCount={bakarMeanings.length + bakarSituations.length}
            rizwanAnswers={rizwanAnswers}
            onRepeatMission={handleRepeatFullMission}
            onReturnPortal={() => navigateTo('portal')}
            onGoToQuiz={() => navigateTo('misi-rizwan')}
          />
        )}
      </main>

      {/* Quiet Educational Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050912]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            Ejen Ali: Misi Operasi Jual Beli · Pendidikan Islam Tahun 5 (Fiqah: Adab Jual Beli)
          </p>
          <p>
            Halaman Semasa: {currentPageMeta.label} · Pemandu: {currentPageMeta.agent}
          </p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <CharacterManagerModal />
      <MissionGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartMission={() => navigateTo('taklimat')}
      />
    </div>
  );
}

export default function App() {
  return (
    <CharacterProvider>
      <MissionAppShell />
    </CharacterProvider>
  );
}
