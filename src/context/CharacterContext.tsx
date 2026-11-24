import React, { createContext, useContext, useState, useEffect } from 'react';

export type AgentId = 'ali' | 'comot' | 'alicia' | 'bakar' | 'rizwan';

export interface AgentProfile {
  id: AgentId;
  name: string;
  codename: string;
  teras: string;
  role: string;
  accentHex: string;
  ringClass: string;
  badgeTextClass: string;
}

export const AGENT_PROFILES: Record<AgentId, AgentProfile> = {
  ali: {
    id: 'ali',
    name: 'Ejen Ali',
    codename: 'IRIS · Tekno',
    teras: 'Teras Tekno',
    role: 'Ketua Operasi Lapangan',
    accentHex: '#F97316',
    ringClass: 'border-orange-400/50',
    badgeTextClass: 'text-orange-300',
  },
  comot: {
    id: 'comot',
    name: 'Comot',
    codename: 'Ejen Khas',
    teras: 'Unit Inviso / Pengesan',
    role: 'Rakan Pengesan Bandar Niaga',
    accentHex: '#22D3EE',
    ringClass: 'border-cyan-400/50',
    badgeTextClass: 'text-cyan-300',
  },
  alicia: {
    id: 'alicia',
    name: 'Ejen Alicia',
    codename: 'Neuro Taktikal',
    teras: 'Teras Neuro',
    role: 'Pegawai Analisis Situasi',
    accentHex: '#FACC15',
    ringClass: 'border-amber-400/50',
    badgeTextClass: 'text-amber-300',
  },
  bakar: {
    id: 'bakar',
    name: 'Ejen Bakar',
    codename: 'Komando Kombat',
    teras: 'Teras Kombat',
    role: 'Jurulatih Cabaran Padanan',
    accentHex: '#EF4444',
    ringClass: 'border-rose-400/50',
    badgeTextClass: 'text-rose-300',
  },
  rizwan: {
    id: 'rizwan',
    name: 'Ejen Rizwan',
    codename: 'Operasi Inviso',
    teras: 'Teras Inviso',
    role: 'Ketua Penguji Kuiz MATA',
    accentHex: '#38BDF8',
    ringClass: 'border-sky-400/50',
    badgeTextClass: 'text-sky-300',
  },
};

type CustomAvatarMap = Partial<Record<AgentId, string>>;

interface CharacterContextValue {
  customAvatars: CustomAvatarMap;
  setAgentAvatar: (agentId: AgentId, dataUrl: string) => void;
  clearAgentAvatar: (agentId: AgentId) => void;
  resetAllAvatars: () => void;
  isManagerOpen: boolean;
  openManager: (focusAgent?: AgentId) => void;
  closeManager: () => void;
  focusedAgent: AgentId | null;
}

const STORAGE_KEY = 'ejen_ali_mata_custom_avatars_v1';

const CharacterContext = createContext<CharacterContextValue | null>(null);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customAvatars, setCustomAvatars] = useState<CustomAvatarMap>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CustomAvatarMap) : {};
    } catch {
      return {};
    }
  });
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [focusedAgent, setFocusedAgent] = useState<AgentId | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customAvatars));
    } catch {
      // Ignore storage quota errors
    }
  }, [customAvatars]);

  const setAgentAvatar = (agentId: AgentId, dataUrl: string) => {
    setCustomAvatars((prev) => ({ ...prev, [agentId]: dataUrl }));
  };

  const clearAgentAvatar = (agentId: AgentId) => {
    setCustomAvatars((prev) => {
      const next = { ...prev };
      delete next[agentId];
      return next;
    });
  };

  const resetAllAvatars = () => {
    setCustomAvatars({});
  };

  const openManager = (focusAgent?: AgentId) => {
    setFocusedAgent(focusAgent ?? null);
    setIsManagerOpen(true);
  };

  const closeManager = () => {
    setIsManagerOpen(false);
    setFocusedAgent(null);
  };

  return (
    <CharacterContext.Provider
      value={{
        customAvatars,
        setAgentAvatar,
        clearAgentAvatar,
        resetAllAvatars,
        isManagerOpen,
        openManager,
        closeManager,
        focusedAgent,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export function useCharacters() {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error('useCharacters must be used within CharacterProvider');
  }
  return ctx;
}
