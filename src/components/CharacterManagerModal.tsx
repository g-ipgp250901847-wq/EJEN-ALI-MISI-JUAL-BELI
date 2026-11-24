import React, { useState } from 'react';
import { X, Upload, RotateCcw, Check, Link as LinkIcon } from 'lucide-react';
import { AGENT_PROFILES, AgentId, useCharacters } from '../context/CharacterContext';
import { soundEngine } from '../utils/sound';

const AGENT_ORDER: AgentId[] = ['ali', 'comot', 'alicia', 'bakar', 'rizwan'];

export const CharacterManagerModal: React.FC = () => {
  const {
    isManagerOpen,
    closeManager,
    customAvatars,
    setAgentAvatar,
    clearAgentAvatar,
    resetAllAvatars,
    focusedAgent,
  } = useCharacters();

  const [urlInputs, setUrlInputs] = useState<Partial<Record<AgentId, string>>>({});
  const [savedNotice, setSavedNotice] = useState<AgentId | null>(null);

  if (!isManagerOpen) return null;

  const handleFileChange = (agentId: AgentId, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAgentAvatar(agentId, reader.result);
        soundEngine.playSuccess();
        setSavedNotice(agentId);
        setTimeout(() => setSavedNotice(null), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSave = (agentId: AgentId) => {
    const val = urlInputs[agentId]?.trim();
    if (!val) return;
    setAgentAvatar(agentId, val);
    soundEngine.playSuccess();
    setSavedNotice(agentId);
    setTimeout(() => setSavedNotice(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="char-manager-title"
    >
      <div className="holo-panel w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-cyan-500/20">
          <div>
            <h2 id="char-manager-title" className="text-xl font-display font-bold text-white">
              Pengurus Imej Rujukan Watak MATA
            </h2>
            <p className="text-sm text-slate-300 mt-0.5">
              Gantikan ruang watak dengan imej rujukan rasmi Ejen Ali daripada peranti anda atau pautan URL.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              closeManager();
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {AGENT_ORDER.map((id) => {
            const agent = AGENT_PROFILES[id];
            const currentImg = customAvatars[id];
            const isFocused = focusedAgent === id;

            return (
              <div
                key={id}
                className={`p-4 rounded-xl border transition-colors ${
                  isFocused
                    ? 'bg-cyan-950/35 border-cyan-400/60'
                    : 'bg-slate-900/60 border-slate-700/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-xl border overflow-hidden flex items-center justify-center bg-slate-950 shrink-0"
                      style={{ borderColor: agent.accentHex }}
                    >
                      {currentImg ? (
                        <img
                          src={currentImg}
                          alt={agent.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span
                          className="text-xs font-display font-bold"
                          style={{ color: agent.accentHex }}
                        >
                          {agent.name.replace('Ejen ', '')}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-base text-white">
                          {agent.name}
                        </h3>
                        {savedNotice === id && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                            <Check className="w-3.5 h-3.5" /> Disimpan
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {agent.teras} · {agent.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white cursor-pointer transition-colors whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih Fail Imej</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(id, e)}
                        className="sr-only"
                      />
                    </label>

                    {currentImg && (
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          clearAgentAvatar(id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Set Semula</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={urlInputs[id] ?? ''}
                      onChange={(e) =>
                        setUrlInputs((prev) => ({ ...prev, [id]: e.target.value }))
                      }
                      placeholder={`Atau tampal pautan imej ${agent.name}...`}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUrlSave(id)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-200 border border-cyan-500/30 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Guna Pautan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-cyan-500/20 bg-slate-950/60">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              resetAllAvatars();
            }}
            className="text-xs font-medium text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            Kosongkan Semua Imej Tersuai
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              closeManager();
            }}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-sm font-semibold text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
