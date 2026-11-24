import React, { useState } from 'react';
import { ImagePlus, Shield } from 'lucide-react';
import { AGENT_PROFILES, AgentId, useCharacters } from '../context/CharacterContext';
import { soundEngine } from '../utils/sound';

interface CharacterSlotProps {
  agentId: AgentId;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  caption?: string;
  hideReplaceHint?: boolean;
}

export const CharacterSlot: React.FC<CharacterSlotProps> = ({
  agentId,
  size = 'md',
  animated = true,
  caption,
  hideReplaceHint = false,
}) => {
  const profile = AGENT_PROFILES[agentId];
  const { customAvatars, openManager } = useCharacters();
  const [imgError, setImgError] = useState(false);

  const customUrl = customAvatars[agentId];
  const hasImage = Boolean(customUrl && !imgError);

  const dimensionClasses =
    size === 'sm'
      ? 'w-20 h-24 sm:w-24 sm:h-28'
      : size === 'lg'
        ? 'w-44 h-52 sm:w-52 sm:h-60'
        : 'w-28 h-36 sm:w-36 sm:h-44';

  const handleOpenUpload = () => {
    soundEngine.playClick();
    openManager(agentId);
  };

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div
        className={`relative group rounded-xl overflow-hidden border ${profile.ringClass} bg-[#0A1428] ${dimensionClasses} ${
          animated ? 'animate-agent-float' : ''
        } shadow-lg shadow-cyan-950/50 transition-transform duration-200`}
      >
        {/* Subtle hologram corner brackets */}
        <div
          className="pointer-events-none absolute inset-1.5 border border-cyan-400/20 rounded-lg z-10"
          aria-hidden="true"
        />

        {hasImage ? (
          <img
            src={customUrl}
            alt={`Watak ${profile.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-between p-3 bg-gradient-to-b from-[#0E1E3A] via-[#091326] to-[#060C18] text-center">
            <div className="w-full flex items-center justify-between text-[10px] font-mono-num text-cyan-300/80">
              <span>MATA</span>
              <span style={{ color: profile.accentHex }}>{profile.teras.replace('Teras ', '')}</span>
            </div>

            {/* Official Character Hologram Placeholder Frame (Not a generic character) */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center bg-slate-950/70"
                style={{ borderColor: profile.accentHex }}
              >
                <Shield className="w-6 h-6" style={{ color: profile.accentHex }} />
              </div>
              <p className="mt-2 font-display font-bold text-sm sm:text-base text-white leading-tight">
                {profile.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                Ruang Imej Rasmi
              </p>
            </div>

            <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full w-2/3 rounded-full"
                style={{ backgroundColor: profile.accentHex }}
              />
            </div>
          </div>
        )}

        {/* Scrim & Replace Button */}
        {!hideReplaceHint && (
          <button
            type="button"
            onClick={handleOpenUpload}
            className="absolute inset-x-1.5 bottom-1.5 z-20 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-slate-950/85 hover:bg-cyan-950 text-[11px] font-medium text-cyan-200 border border-cyan-400/30 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
            title={`Muat naik imej rujukan ${profile.name}`}
          >
            <ImagePlus className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{hasImage ? 'Tukar Imej' : 'Muat Imej'}</span>
          </button>
        )}
      </div>

      <div className="text-center">
        <div className="text-sm font-display font-semibold text-white whitespace-nowrap">
          {profile.name}
        </div>
        <div className="text-xs text-slate-400">
          {caption ?? profile.role}
        </div>
      </div>
    </div>
  );
};
