import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Link as LinkIcon,
  Film,
  RotateCcw,
} from 'lucide-react';
import { VIDEO_BRIEFING_SLIDES } from '../data/missionData';
import { soundEngine } from '../utils/sound';

function parseVideoEmbed(url: string): { type: 'youtube' | 'mp4'; src: string } | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    if (host.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return { type: 'youtube', src: `https://www.youtube.com/embed/${v}` };
      if (parsed.pathname.startsWith('/embed/')) {
        return { type: 'youtube', src: trimmed };
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/')[2];
        if (id) return { type: 'youtube', src: `https://www.youtube.com/embed/${id}` };
      }
    }

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      if (id) return { type: 'youtube', src: `https://www.youtube.com/embed/${id}` };
    }

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsed.pathname)) {
      return { type: 'mp4', src: trimmed };
    }
  } catch {
    return null;
  }

  return null;
}

interface BriefingVideoPlayerProps {
  customVideoUrl: string;
  onChangeVideoUrl: (url: string) => void;
  onCompleteVideo?: () => void;
}

export const BriefingVideoPlayer: React.FC<BriefingVideoPlayerProps> = ({
  customVideoUrl,
  onChangeVideoUrl,
  onCompleteVideo,
}) => {
  const [mode, setMode] = useState<'interactive' | 'custom'>(customVideoUrl ? 'custom' : 'interactive');
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [urlDraft, setUrlDraft] = useState(customVideoUrl);
  const [urlError, setUrlError] = useState('');
  const timerRef = useRef<number | null>(null);

  const parsedCustom = parseVideoEmbed(customVideoUrl);
  const currentSlide = VIDEO_BRIEFING_SLIDES[slideIdx];

  const speakNarration = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ms-MY';
    utter.rate = 0.96;
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    if (!isPlaying || mode !== 'interactive') {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }

    speakNarration(`${currentSlide.title}. ${currentSlide.narration}`);

    timerRef.current = window.setTimeout(() => {
      if (slideIdx < VIDEO_BRIEFING_SLIDES.length - 1) {
        setSlideIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        onCompleteVideo?.();
      }
    }, 6500);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isPlaying, slideIdx, mode, voiceEnabled]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    soundEngine.playClick();
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseVideoEmbed(urlDraft);
    if (!parsed) {
      soundEngine.playError();
      setUrlError('Sila masukkan pautan YouTube atau fail video (.mp4 / .webm) yang sah.');
      return;
    }
    setUrlError('');
    soundEngine.playSuccess();
    onChangeVideoUrl(urlDraft.trim());
    setMode('custom');
    setIsPlaying(false);
    onCompleteVideo?.();
  };

  return (
    <div className="holo-panel rounded-2xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-cyan-500/20 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <Film className="w-5 h-5 text-cyan-300 shrink-0" />
          <div>
            <h3 className="font-display font-bold text-base text-white">
              Objek Pembelajaran 1: Video Taklimat Adab Jual Beli
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-700/70">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setMode('interactive');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              mode === 'interactive'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Video Interaktif MATA
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setIsPlaying(false);
              setMode('custom');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              mode === 'custom'
                ? 'bg-orange-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Pautan Video Guru
          </button>
        </div>
      </div>

      {mode === 'interactive' ? (
        <div>
          {/* Video Stage */}
          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/20" />

            {/* Top slide indicator */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4">
              <span className="text-xs font-mono-num font-semibold text-cyan-200 bg-slate-950/75 px-3 py-1 rounded-md border border-cyan-500/30">
                BABAK {slideIdx + 1} / {VIDEO_BRIEFING_SLIDES.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/75 border border-slate-700 text-xs text-slate-200 hover:border-cyan-400 transition-colors cursor-pointer"
              >
                {voiceEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Suara Aktif</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Suara Dimatikan</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom narration overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
              <p className="text-xs font-semibold text-orange-300 uppercase tracking-wide">
                {currentSlide.subtitle}
              </p>
              <h4 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
                {currentSlide.title}
              </h4>
              <p className="text-sm sm:text-base text-slate-100 mt-2 max-w-3xl leading-relaxed">
                {currentSlide.narration}
              </p>
              <div className="mt-3 inline-block px-3.5 py-2 rounded-lg bg-cyan-950/80 border border-cyan-400/30 text-xs sm:text-sm font-medium text-cyan-100">
                {currentSlide.keyPoint}
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-4 bg-slate-950/80 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSlideIdx((prev) => Math.max(0, prev - 1));
                }}
                disabled={slideIdx === 0}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                aria-label="Babak sebelum"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-sm font-bold text-slate-950 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Jeda Video</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Mainkan Video</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  if (slideIdx < VIDEO_BRIEFING_SLIDES.length - 1) {
                    setSlideIdx((prev) => prev + 1);
                  } else {
                    onCompleteVideo?.();
                  }
                }}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                aria-label="Babak seterusnya"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Scene Progress Dots */}
            <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-md">
              {VIDEO_BRIEFING_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSlideIdx(idx);
                    if (idx === VIDEO_BRIEFING_SLIDES.length - 1) onCompleteVideo?.();
                  }}
                  className={`h-2 flex-1 rounded-full transition-colors cursor-pointer ${
                    idx <= slideIdx ? 'bg-cyan-400' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Pilih babak ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6 space-y-4 bg-slate-950/60">
          <form onSubmit={handleApplyUrl} className="space-y-2">
            <label
              htmlFor="custom-video-url"
              className="block text-sm font-semibold text-white"
            >
              Masukkan Pautan Video Pembelajaran (YouTube atau fail .mp4)
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="custom-video-url"
                  type="url"
                  value={urlDraft}
                  onChange={(e) => {
                    setUrlDraft(e.target.value);
                    setUrlError('');
                  }}
                  placeholder="Contoh: https://www.youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-sm font-bold text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
              >
                Muat Video
              </button>
            </div>
            {urlError && <p className="text-xs text-rose-400">{urlError}</p>}
          </form>

          {parsedCustom ? (
            <div className="space-y-3">
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-cyan-500/30 bg-black">
                {parsedCustom.type === 'youtube' ? (
                  <iframe
                    src={parsedCustom.src}
                    title="Video Pembelajaran Adab Jual Beli"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={parsedCustom.src} controls className="w-full h-full" />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onChangeVideoUrl('');
                    setUrlDraft('');
                    setMode('interactive');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kembali ke Video Interaktif MATA</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-xl border border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center">
              <Film className="w-10 h-10 text-cyan-400/70 mb-3" />
              <p className="text-sm font-semibold text-white">
                Ruang Paparan Video Pembelajaran Guru
              </p>
              <p className="text-xs text-slate-400 max-w-md mt-1 leading-relaxed">
                Guru atau murid boleh memasukkan pautan YouTube PdPR Adab Jual Beli Tahun 5 di atas, atau terus menonton Video Interaktif MATA terbina dalam.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
