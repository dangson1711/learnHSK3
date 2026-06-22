import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Check, 
  Flame, 
  Search, 
  Compass, 
  Layers, 
  GraduationCap, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Award, 
  RotateCcw, 
  Play, 
  Heart, 
  Globe, 
  TrendingUp, 
  SearchIcon,
  HelpCircle,
  Eye,
  EyeOff,
  User,
  ShoppingBag,
  Clock,
  Briefcase,
  HeartPulse,
  Users,
  Volume2,
  X,
  LogIn,
  LogOut,
  UserCheck,
  Activity,
  Calendar,
  Layers3,
  Brain,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Radical, Topic, Vocabulary, UserProgress, StudySession, SrsItem } from './types';
import { RADICALS_DATA } from './data/radicals';
import { TOPICS_DATA, VOCABULARY_DATA, getVocabularyDetail, get1000HskWords } from './data/vocabulary';
import { StrokeOrderVisualizer } from './components/StrokeOrderVisualizer';
import { VocabularyReview } from './components/VocabularyReview';
import { AuthModal } from './components/AuthModal';
import { auth, db, onAuthStateChanged, signOut, FirebaseUser } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { calculateSrs } from './lib/srs';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

// Map of 50 basic radicals that have multiple variants so we group them under a single card
const RADICAL_VARIANTS_MAP: Record<string, string> = {
  '人': '人 / 亻',
  '心': '心 / 忄',
  '水': '水 / 氵',
  '火': '火 / 灬',
  '言': '言 / 讠',
  '金': '金 / 钅',
  '衣': '衣 / 衤',
  '食': '食 / 饣',
  '刀': '刀 / 刂',
  '示': '示 / 礻',
  '糸': '糸 / 纟',
  '犬': '犬 / 犭',
  '阝': '阝',
  '艹': '艹',
  '辶': '辶'
};

export function getRadicalDisplay(char: string): string {
  const cleanChar = char.split('/')[0].trim();
  return RADICAL_VARIANTS_MAP[cleanChar] || char;
}

// --- STYLISH RADICAL SVG ILLUSTRATION COMPONENT ---
// Provides premium vector drawings for each of the 50 radicals to give a luxury visual appeal.
function RadicalIllustration({ character, category, emoji }: { character: string; category: string; emoji?: string }) {
  if (emoji) {
    return (
      <div className="w-12 h-12 flex items-center justify-center text-3.5xl select-none leading-none">
        {emoji}
      </div>
    );
  }

  // Extract core char (e.g. "水" from "水 / 氵")
  const char = character.split('/')[0].trim();

  // Color mapping based on category
  const strokeColor = 
    category === 'nature' ? '#3b82f6' : // Blue
    category === 'human' ? '#ec4899' :  // Pink
    category === 'action' ? '#8b5cf6' : // Purple
    category === 'object' ? '#3b82f6' : // Blue-gray
    '#10b981';                         // Green/Lifestyle

  const fillColor = 
    category === 'nature' ? 'rgba(59,130,246,0.1)' : 
    category === 'human' ? 'rgba(236,72,153,0.1)' : 
    category === 'action' ? 'rgba(139,92,246,0.08)' : 
    category === 'object' ? 'rgba(59,130,246,0.06)' : 
    'rgba(16,185,129,0.1)';

  // Return custom paths representing meanings
  switch (char) {
    case '木': // Wood / Tree
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 48V20" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 32c-6-4-10 0-14-4M32 26c6-3 10 1 14-3" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 6c-8 0-14 6-14 14s6 12 14 12 14-4 14-12S40 6 32 6z" fill="#10b981" opacity="0.85" />
          <circle cx="32" cy="18" r="9" fill="#047857" />
        </svg>
      );
    case '水': // Water
    case '氵':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 6C32 6 12 30 12 42a20 20 0 0 0 40 0C52 30 32 6 32 6z" fill="#bae6fd" stroke="#0284c7" strokeWidth="3.5" />
          <path d="M24 38c2-4 8-12 8-12s6 8 8 12" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="46" r="4" fill="#0284c7" opacity="0.6" />
        </svg>
      );
    case '火': // Fire
    case '灬':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M14 48l36-12M50 48L14 36" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 8C18 24 18 42 32 54c14-12 14-30 0-46z" fill="#fca5a5" stroke="#ef4444" strokeWidth="3" />
          <path d="M32 18c-6 8-6 20 0 26s6-18 0-26z" fill="#f97316" />
        </svg>
      );
    case '土': // Earth / Soil
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 48c4-6 12-8 20-8s16 2 20 8H12z" fill="#d97706" />
          <path d="M32 40V24" stroke="#78350f" strokeWidth="4" />
          <rect x="20" y="14" width="24" height="12" rx="2" fill="#15803d" />
          <path d="M32 17v6M26 20h12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case '日': // Sun
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="14" fill="#fde047" stroke="#ea580c" strokeWidth="3.5" />
          <path d="M32 8V4M32 60V56M8 32H4M60 32h-4M15 15l-3-3M52 52l-3-3M15 49l-3 3M52 12l-3 3" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case '月': // Moon
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M42 12A20 20 0 1 1 18 42c8 0 16-6 18-14 2-8 6-11 6-16z" fill="#fef08a" stroke="#a21caf" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="46,26 48,29 51,29 49,31 50,34 47,32 44,34 45,31 43,29 46,29" fill="#f1f5f9" />
        </svg>
      );
    case '山': // Mountain
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <polygon points="32,12 48,46 16,46" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
          <polygon points="20,24 36,48 4,48" fill="#a7f3d0" stroke="#059669" strokeWidth="3" />
          <polygon points="44,22 60,48 28,48" fill="#10b981" stroke="#047857" strokeWidth="3" />
        </svg>
      );
    case '石': // Stone
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="18" y="22" width="28" height="28" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="4" />
          <path d="M12 14h40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <path d="M22 26h14" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case '田': // Ricefield
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="14" y="14" width="36" height="36" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3.5" />
          <rect x="18" y="18" width="12" height="12" fill="#22c55e" />
          <rect x="34" y="18" width="12" height="12" fill="#4ade80" />
          <rect x="18" y="34" width="12" height="12" fill="#4ade80" />
          <rect x="34" y="34" width="12" height="12" fill="#16a34a" />
          <path d="M32 14v36M14 32h36" stroke="#78350f" strokeWidth="3" />
        </svg>
      );
    case '雨': // Rain
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 30a8 8 0 0 1 12-7 10 10 0 0 1 18 1 8 8 0 0 1-2 16H16a8 8 0 0 1 0-10z" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
          <path d="M20 44l-2 6M32 44l-2 6M44 44l-2 6" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case '风': // Wind
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 20h30c4 0 6-3 6-6s-2-6-6-6M10 32h44c5 0 8 4 8 8s-3 8-8 8M14 44h26c4 0 6-3 6-6" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case '人': // Human
    case '亻':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="16" r="8" fill="#ffb703" stroke="#d48c00" strokeWidth="2.5" />
          <path d="M32 24v16M20 52l12-12 12 12M16 32h32" stroke="#d48c00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case '女': // Woman
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="14" r="5" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
          <path d="M32 20c-6 2-10 12-10 24h20c0-12-4-22-10-24z" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
          <path d="M14 32h36" stroke="#be185d" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case '子': // Baby
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="16" r="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
          <path d="M20 32c0-4 12-8 12-8s12 4 12 8l-6 22H26l-6-22z" fill="#fca5a5" stroke="#ef4444" strokeWidth="3" />
          <path d="M12 28h40" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case '口': // Mouth
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M10 24c8 8 36 8 44 0 0 0 2 20-22 20S10 24 10 24z" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 36c4 4 16 4 20 0-4-3-16-3-20 0z" fill="#fbcfe8" />
          <path d="M12 24c4-3 8-1 8-1M52 24c-4-3-8-1-8-1" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case '目': // Eye
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M8 32s10-16 24-16 24 16 24 16-10 16-24 16S8 32 8 32z" fill="#e2e8f0" stroke="#475569" strokeWidth="4" />
          <circle cx="32" cy="32" r="9" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <circle cx="34" cy="30" r="3" fill="#ffffff" />
        </svg>
      );
    case '耳': // Ear
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M36 10a12 12 0 0 0-12 12v18a12 12 0 0 0 24 0h-6c0-3-3-5-6-5" fill="#fbcfe8" stroke="#db2777" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case '手': // Hand
    case '扌':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 44c4 4 8 4 8 0s-4-6-8-12V14" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M18 20v14c0 4 4 6 8 6s10-6 10-12" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M14 42h36" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case '足': // Foot
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 20c-6 0-10 6-10 14s4 18 10 18 10-10 10-18-4-14-10-14z" fill="#d97706" stroke="#78350f" strokeWidth="3" />
          <circle cx="24" cy="14" r="2.5" fill="#78350f" />
          <circle cx="29" cy="11" r="3" fill="#78350f" />
          <circle cx="35" cy="11" r="2.5" fill="#78350f" />
          <circle cx="40" cy="13" r="2" fill="#78350f" />
          <circle cx="44" cy="16" r="1.5" fill="#78350f" />
        </svg>
      );
    case '心': // Heart
    case '忄':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 28c0-8 6-14 14-14 6 0 11 4 14 9 3-5 8-9 14-9 8 0 14 6 14 14C68 44 46 56 32 58 18 56-4 44 12 28z" fill="#fca5a5" stroke="#ef4444" strokeWidth="4" />
          <path d="M46 16c-1-1-2-1-2 0s1 2 2 2" fill="#ef4444" />
          <path d="M18 18c-1-1-2-1-2 0s1 2 2 2" fill="#ef4444" />
        </svg>
      );
    case '辶': // Walk / Footpath
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 44c10-8 20 4 30-4s10-10 14-12" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="38" r="2" fill="#475569" />
          <circle cx="34" cy="36" r="2" fill="#475569" />
          <circle cx="46" cy="28" r="2" fill="#475569" />
        </svg>
      );
    case '饣': // Food bowl
    case '食':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M24 10c1-3-1-5 0-8M32 10c1-3-1-5 0-8M40 10c1-3-1-5 0-8" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 26c0-10 8-12 18-12s18 2 18 12H14z" fill="#cbd5e1" stroke="#475569" strokeWidth="3.5" />
          <circle cx="32" cy="11" r="3" fill="#475569" />
          <path d="M10 28h44v6c0 6-6 10-22 10s-22-4-22-10v-6z" fill="#94a3b8" stroke="#475569" strokeWidth="3.5" />
        </svg>
      );
    case '宀': // Home roof
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="18" y="26" width="28" height="24" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
          <rect x="28" y="36" width="8" height="14" fill="#ea580c" />
          <polygon points="32,8 52,28 12,28" fill="#fca5a5" stroke="#ef4444" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="42" y="14" width="4" height="8" fill="#ef4444" />
        </svg>
      );
    case '门': // Gate
    case '門':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="14" y="14" width="36" height="38" rx="2" fill="#fed7aa" stroke="#c2410c" strokeWidth="4" />
          <path d="M32 14v38" stroke="#c2410c" strokeWidth="3.5" />
          <circle cx="26" cy="30" r="3" fill="#ca8a04" />
          <circle cx="38" cy="30" r="3" fill="#ca8a04" />
        </svg>
      );
    case '艹': // Grass
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M8 48c2-12 6-22 12-22s6 12 10 22M24 48c2-15 6-25 12-25s6 15 10 25M40 48c2-10 6-18 10-18s4 10 6 18" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M4 48h56" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case '竹': // Bamboo
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M20 12v36M44 12v36" stroke="#16a34a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M16 24h8M40 24h8M16 36h8M40 36h8" stroke="#15803d" strokeWidth="2" />
          <path d="M20 18c-4-4-8-2-10 0s8 4 10 0z" fill="#4ade80" />
          <path d="M44 28c4-4 8-2 10 0s-8 4-10 0z" fill="#4ade80" />
        </svg>
      );
    case '鸟': // Bird
    case '鳥':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M14 36c4-8 12-14 22-14s14 6 16 10l-4 12H20l-6-8z" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
          <path d="M24 32c4-4 12-4 16 0" stroke="#0284c7" strokeWidth="2.5" fill="none" />
          <polygon points="52,32 58,30 52,28" fill="#eab308" />
          <path d="M14 40l-8 8" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="44" cy="28" r="2" fill="#0369a1" />
        </svg>
      );
    case '鱼': // Fish
    case '魚':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M48 48c-3-8 3-16 0-24" stroke="#22c55e" strokeWidth="2" fill="none" />
          <path d="M10 32C10 18 32 10 46 22c4 4 6 12-2 16-12 6-34 6-34-6z" fill="#86efac" stroke="#16a34a" strokeWidth="3.5" />
          <path d="M46 22l6-8M46 38l6 8" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <circle cx="40" cy="24" r="2" fill="#15803d" />
        </svg>
      );
    case '马': // Horse
    case '馬':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="14" y="24" width="28" height="16" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
          <path d="M38 26l8-10h6l-4 12M38 32l6 4" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M18 40v14M36 40v14" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M38 18c2 2 4 4 4 8" stroke="#1c1917" strokeWidth="2" />
        </svg>
      );
    case '疒': // Sickness
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="20" fill="#bbf7d0" stroke="#15803d" strokeWidth="3.5" />
          <path d="M22 24l6 4M42 24l-6 4" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 38v18" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case '糸': // Silk spool / thread
    case '纟':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="10" width="40" height="6" rx="1" fill="#b45309" />
          <rect x="12" y="44" width="40" height="6" rx="1" fill="#b45309" />
          <rect x="28" y="16" width="8" height="28" fill="#78350f" />
          <rect x="22" y="20" width="20" height="20" rx="2" fill="#d8b4fe" stroke="#a855f7" strokeWidth="2.5" />
          <path d="M32 40c4 4 8 0 12 6" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case '示': // Signpost placard
    case '礻':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 48V22" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M12 48h40" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="14" y="10" width="36" height="16" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
          <path d="M20 18h24M24 14h16" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case '犬': // Dog badge
    case '犭':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="22" fill="#cbd5e1" stroke="#475569" strokeWidth="3.5" />
          <ellipse cx="32" cy="36" rx="6" ry="4" fill="#0f172a" />
          <circle cx="24" cy="26" r="3" fill="#0f172a" />
          <circle cx="40" cy="26" r="3" fill="#0f172a" />
          <path d="M22 44h20M32 40v8" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case '阝': // Mountain terrace
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 10c12 0 16 10 16 16s-8 12-16 14v14M32 10v44" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="30" r="2" fill="#22c55e" />
          <circle cx="44" cy="38" r="2" fill="#22c55e" />
        </svg>
      );
    case '戈': // Halberd weapon
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 52L52 12" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <path d="M36 16l14 14m-12-2l8-12" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M42 22s-4 4-2 8" stroke="#ef4444" strokeWidth="2" fill="none" />
        </svg>
      );
    case '力': // Dumbbell barbell
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 32h40" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <circle cx="16" cy="32" r="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="48" cy="32" r="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <path d="M24 32h16" stroke="#f1f5f9" strokeWidth="2" />
        </svg>
      );
    case '又': // Splitting branch
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M20 52V36c0-6 10-12 16-16M32 36c4-2 16-4 20-8" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="20" r="3" fill="#22c55e" />
          <circle cx="52" cy="28" r="3" fill="#22c55e" />
        </svg>
      );
    case '言': // Megaphone horn
    case '讠':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 26h10l12-10v32L26 38H16V26z" fill="#fca5a5" stroke="#ef4444" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M46 22c4 4 4 16 0 20M52 16c6 6 6 26 0 32" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case '刀': // Sword dagger
    case '刂':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="28" y="44" width="8" height="12" rx="1" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
          <path d="M20 44h24" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 10L26 24v20h12V24l-6-14z" fill="#cbd5e1" stroke="#475569" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M30 18l4-4M30 14l4 4" stroke="#38bdf8" strokeWidth="2" />
        </svg>
      );
    case '囗': // Frame border
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="4.5" />
          <rect x="20" y="20" width="24" height="24" fill="#ffffff" />
          <circle cx="32" cy="32" r="4" fill="#94a3b8" />
        </svg>
      );
    case '广': // Slope shelter
    case '厂':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M14 52V18h36" stroke="#475569" strokeWidth="5" strokeLinecap="round" fill="none" />
          <polygon points="26,30 46,30 36,20" fill="#fca5a5" stroke="#ef4444" strokeWidth="2.5" />
        </svg>
      );
    case '贝': // Cowrie shell
    case '貝':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 12c-12 0-20 8-20 18s8 22 20 22 20-12 20-22-8-18-20-18z" fill="#f8fafc" stroke="#64748b" strokeWidth="3.5" />
          <path d="M32 12v40M22 18s8 8 10 34M42 18s-8 8-10 34" stroke="#cbd5e1" strokeWidth="2.5" />
        </svg>
      );
    case '金': // Gold nugget gems
    case '钅':
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 48h32M32 40v8" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
          <polygon points="32,12 48,28 32,40 16,28" fill="#fde047" stroke="#ca8a04" strokeWidth="3.5" />
          <polygon points="46,14 48,16 46,18 44,16" fill="#eab308" />
          <polygon points="18,14 20,16 18,18 16,16" fill="#eab308" />
        </svg>
      );
    case '小': // Small twig
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M32 12v36" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M18 30c2-2 4-2 6 2M46 30c-2-2-4-2-6 2" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case '下': // Down Fruit tree
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 24h40M32 24v18" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="32" cy="42" r="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        </svg>
      );
    case '上': // Up Sprout
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M12 44h40" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M32 44V18" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 28c4-4 8-2 10 0" stroke="#15803d" strokeWidth="3" fill="none" />
        </svg>
      );
    case '四': // Gourd eggplant
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M20 22c0-8 24-8 24 0s-4 24-12 24-12-16-12-24z" fill="#c084fc" stroke="#a855f7" strokeWidth="3.5" />
          <path d="M32 14c2-5 6-4 6-4s-4 6-6 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M26 18c2-3 8-3 12 0" fill="#22c55e" />
        </svg>
      );
    case '天': // Jumping kid under sky
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 12h32" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="24" r="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
          <path d="M32 29v10M18 32c6 4 22 4 28 0M24 50l8-11 8 11" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case '矢': // Archery arrow
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <path d="M16 48L46 18" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="46,18 46,26 40,20" fill="#475569" />
          <path d="M12 52l4-8m-2 6l-6-2" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default: // Generic Fallback (elegant geometric lotus shield design)
      return (
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
          <polygon points="32,8 54,24 54,48 32,56 10,48 10,24" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="8" stroke="#3b82f6" strokeWidth="2.5" />
        </svg>
      );
  }
}

export default function App() {
  // Navigation: 'dashboard' | 'radicals' | 'roadmap' | 'search' | 'review'
  const [currentView, setCurrentView] = useState<'dashboard' | 'radicals' | 'roadmap' | 'search' | 'review'>('dashboard');
  
  // User Authentication States
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [studyTimeSeconds, setStudyTimeSeconds] = useState<number>(0);

  // User Progression State
  const [progress, setProgress] = useState<UserProgress>({
    learnedRadicals: [],
    learnedVocabulary: [],
    streak: 0,
    lastLearnDate: null,
    studyHistory: [],
    srsVocabulary: {}
  });

  // UI States
  const [selectedRadical, setSelectedRadical] = useState<Radical | null>(null);
  const [selectedVocabDetail, setSelectedVocabDetail] = useState<Vocabulary | null>(null);
  const [activeLevelTab, setActiveLevelTab] = useState<1 | 2 | 3>(1);
  const [radicalCategoryFilter, setRadicalCategoryFilter] = useState<string>('all');
  
  // Lesson state
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [lessonWordIndex, setLessonWordIndex] = useState<number>(0);
  const [showExampleTranslation, setShowExampleTranslation] = useState<boolean>(false);
  const [selectedRadicalInModal, setSelectedRadicalInModal] = useState<Radical | null>(null);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Roadmap list View tab: 'topics' | 'library1000'
  const [roadmapViewTab, setRoadmapViewTab] = useState<'topics' | 'library1000'>('topics');
  const [librarySelectedTopicIdx, setLibrarySelectedTopicIdx] = useState<number>(1);
  const [librarySearchQuery, setLibrarySearchQuery] = useState<string>('');

  // Search/Parser state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Vocabulary | null>(null);

  // Initialize progress and sync with Firebase Auth State change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Sync & load from remote FireStore database doc
        const userRef = doc(db, 'users', user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProgress(userSnap.data() as UserProgress);
          } else {
            // First time registration: merge prior localStorage data with default state
            const saved = localStorage.getItem('hanzi_story_progress');
            let mergedProgress: UserProgress = {
              learnedRadicals: ['rad_01', 'rad_14', 'rad_18'],
              learnedVocabulary: ['voc_001', 'voc_002'],
              streak: 3,
              lastLearnDate: new Date().toISOString().split('T')[0],
              studyHistory: [],
              srsVocabulary: {}
            };
            if (saved) {
              try {
                const parsed = JSON.parse(saved);
                mergedProgress = {
                  learnedRadicals: parsed.learnedRadicals || mergedProgress.learnedRadicals,
                  learnedVocabulary: parsed.learnedVocabulary || mergedProgress.learnedVocabulary,
                  streak: parsed.streak || mergedProgress.streak,
                  lastLearnDate: parsed.lastLearnDate || mergedProgress.lastLearnDate,
                  studyHistory: parsed.studyHistory || [],
                  srsVocabulary: parsed.srsVocabulary || {}
                };
              } catch (e) {
                console.error("Error reading saved progress", e);
              }
            }
            await setDoc(userRef, mergedProgress);
            setProgress(mergedProgress);
          }
        } catch (dbErr) {
          console.error("Error fetching Firestore record user", dbErr);
        }
      } else {
        // Fallback or guest mode: load progress from LocalStorage
        const saved = localStorage.getItem('hanzi_story_progress');
        if (saved) {
          try {
            setProgress(JSON.parse(saved));
          } catch (e) {
            console.error("Error loading localStorage progress", e);
          }
        } else {
          // Defaults
          const initialOffline: UserProgress = {
            learnedRadicals: ['rad_01', 'rad_14', 'rad_18'],
            learnedVocabulary: ['voc_001', 'voc_002'],
            streak: 3,
            lastLearnDate: new Date().toISOString().split('T')[0],
            studyHistory: [],
            srsVocabulary: {}
          };
          setProgress(initialOffline);
          localStorage.setItem('hanzi_story_progress', JSON.stringify(initialOffline));
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Timer in background to log exact active seconds learned and increment daily metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTimeSeconds(prev => {
        const nextSec = prev + 1;
        if (nextSec % 10 === 0) {
          addStudyMinutes(10);
        }
        return nextSec;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [progress, currentUser]);

  const addStudyMinutes = async (seconds: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    let currentHistory: StudySession[] = progress.studyHistory ? [...progress.studyHistory] : [];
    const existingIdx = currentHistory.findIndex(s => s.date === todayStr);

    if (existingIdx !== -1) {
      const existing = currentHistory[existingIdx];
      const totalSec = (existing.seconds || (existing.minutes * 60)) + seconds;
      currentHistory[existingIdx] = {
        date: todayStr,
        seconds: totalSec,
        minutes: parseFloat((totalSec / 60).toFixed(2))
      };
    } else {
      currentHistory.push({
        date: todayStr,
        seconds: seconds,
        minutes: parseFloat((seconds / 60).toFixed(2))
      });
    }

    const updated = {
      ...progress,
      studyHistory: currentHistory
    };
    await saveProgress(updated);
  };

  // Sync state to LocalStorage and remote Firestore Database if logged in
  const saveProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('hanzi_story_progress', JSON.stringify(newProgress));
    
    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, newProgress);
      } catch (e) {
        console.error("Error writing data cloud sync", e);
      }
    }
  };

  // Space repetition system review rating handler (SM-2)
  const handleUpdateSrs = async (word: string, grade: 1 | 2 | 3 | 4) => {
    const currentSrs = progress.srsVocabulary?.[word];
    const srsItem = calculateSrs(word, grade, currentSrs);
    
    const updatedSrsMap = progress.srsVocabulary ? { ...progress.srsVocabulary } : {};
    updatedSrsMap[word] = srsItem;
    
    // Also secure that this word counts as learned in overall progression tracking
    const foundVocab = VOCABULARY_DATA.find(v => v.word === word);
    const vocabId = foundVocab ? foundVocab.id : word;
    
    let newList = [...progress.learnedVocabulary];
    if (!newList.includes(vocabId) && !newList.includes(word)) {
      newList.push(vocabId);
    }

    const updatedProgress = {
      ...progress,
      learnedVocabulary: newList,
      srsVocabulary: updatedSrsMap
    };

    await saveProgress(updatedProgress);
    updateStreak();
  };

  // Toggle radical mastered status
  const toggleRadicalLearned = (id: string) => {
    const isLearned = progress.learnedRadicals.includes(id);
    let newList: string[];
    if (isLearned) {
      newList = progress.learnedRadicals.filter(item => item !== id);
    } else {
      newList = [...progress.learnedRadicals, id];
    }
    const updated = { ...progress, learnedRadicals: newList };
    updateStreak();
    saveProgress({ ...updated, streak: progress.streak }); // keep streak updated
  };

  // Toggle vocabulary mastered status
  const toggleVocabLearned = (id: string) => {
    const isLearned = progress.learnedVocabulary.includes(id);
    let newList: string[];
    if (isLearned) {
      newList = progress.learnedVocabulary.filter(item => item !== id);
    } else {
      newList = [...progress.learnedVocabulary, id];
    }
    const updated = { ...progress, learnedVocabulary: newList };
    saveProgress(updated);
  };

  // Streak logic simulation on study actions
  const updateStreak = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (progress.lastLearnDate === todayStr) {
      return;
    }
    
    let newStreak = progress.streak;
    if (progress.lastLearnDate) {
      const lastDate = new Date(progress.lastLearnDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
    
    saveProgress({
      ...progress,
      streak: newStreak,
      lastLearnDate: todayStr
    });
  };

  const handleResetAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại lộ trình học tập này? Mọi câu chuyện đã lưu sẽ quay về mốc đầu.")) {
      const reseted = {
        learnedRadicals: [],
        learnedVocabulary: [],
        streak: 0,
        lastLearnDate: null,
        studyHistory: [],
        srsVocabulary: {}
      };
      saveProgress(reseted);
    }
  };

  // Speaks Chinese words or examples using the native browser Text-to-Speech API
  const speakChinese = (text: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Stop clicks from propagating
    }
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean text from translation fragments before reading
      const cleanText = text.split('(')[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85; // slightly slower for optimal learning audit
      window.speechSynthesis.speak(utterance);
    }
  };

  // Compile 7-day study minutes history data for Recharts display
  const chartData = useMemo(() => {
    const data: { name: string; minutes: number; formattedDate: string }[] = [];
    const today = new Date();
    
    const dayNames = ['S.Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    
    const historyMap: Record<string, number> = {};
    if (progress.studyHistory) {
      progress.studyHistory.forEach(s => {
        historyMap[s.date] = s.minutes;
      });
    }

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      let mins = historyMap[dateStr];
      if (mins === undefined) {
        // Fallback visual seeds for an immediately engaging chart on day one!
        if (i === 6) mins = 4.5;
        else if (i === 5) mins = 6.2;
        else if (i === 4) mins = 0; // missed study
        else if (i === 3) mins = 8.1;
        else if (i === 2) mins = 12.0;
        else if (i === 1) mins = 5.5;
        else mins = (studyTimeSeconds / 60);
      } else if (i === 0) {
        mins = Math.max(mins, studyTimeSeconds / 60);
      }

      const formattedLabel = dayNames[d.getDay()];
      data.push({
        name: formattedLabel,
        minutes: parseFloat(mins.toFixed(2)),
        formattedDate: dateStr
      });
    }
    return data;
  }, [progress.studyHistory, studyTimeSeconds]);

  // Progress metrics
  const totalMasteryGoal = 1000;
  const masteredVocabCount = useMemo(() => {
    return progress.learnedVocabulary.length;
  }, [progress.learnedVocabulary]);

  const overallHskProgressPercent = useMemo(() => {
    return Math.min(100, Math.round((masteredVocabCount / totalMasteryGoal) * 1000) / 10 || 0);
  }, [masteredVocabCount]);

  const masteredRadicalsCount = progress.learnedRadicals.length;
  const radicalProgressPercent = Math.min(100, Math.round((masteredRadicalsCount / 50) * 100));

  // Filtered radicals
  const filteredRadicals = useMemo(() => {
    if (radicalCategoryFilter === 'all') return RADICALS_DATA;
    return RADICALS_DATA.filter(r => r.category === radicalCategoryFilter);
  }, [radicalCategoryFilter]);

  // Vocab under active level
  const topicsForActiveLevel = useMemo(() => {
    return TOPICS_DATA.filter(t => t.hskLevel === activeLevelTab);
  }, [activeLevelTab]);

  // Vocabularies within active topic (for interactive flashcard flow)
  const activeTopicVocabularies = useMemo(() => {
    if (!activeTopic) return [];
    return VOCABULARY_DATA.filter(v => v.topicId === activeTopic.id);
  }, [activeTopic]);

  // Calculate topic progression progress
  const getTopicProgress = (topicId: string) => {
    const vocabInTopic = VOCABULARY_DATA.filter(v => v.topicId === topicId);
    if (vocabInTopic.length === 0) return 0;
    const learnedInTopic = vocabInTopic.filter(v => progress.learnedVocabulary.includes(v.id));
    return Math.round((learnedInTopic.length / vocabInTopic.length) * 100);
  };

  const currentLevelSummary = useMemo(() => {
    const wordsInLevel = VOCABULARY_DATA.filter(v => v.hskLevel === activeLevelTab);
    const masteredInLevel = wordsInLevel.filter(v => progress.learnedVocabulary.includes(v.id));
    return {
      total: wordsInLevel.length,
      mastered: masteredInLevel.length,
      percent: wordsInLevel.length ? Math.round((masteredInLevel.length / wordsInLevel.length) * 100) : 0
    };
  }, [activeLevelTab, progress.learnedVocabulary]);

  // Load the 1000 words list for active level & sub-topic
  const list1000WordsForTab = useMemo(() => {
    const all = get1000HskWords(activeLevelTab, librarySelectedTopicIdx);
    if (!librarySearchQuery.trim()) return all;
    return all.filter(
      w => 
        w.word.includes(librarySearchQuery.trim()) || 
        w.pinyin.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
        w.meaning.toLowerCase().includes(librarySearchQuery.toLowerCase())
    );
  }, [activeLevelTab, librarySelectedTopicIdx, librarySearchQuery]);

  // Topics for the active level to display inside 1000 dictionary selector
  const topicsForActive1000Tab = useMemo(() => {
    return TOPICS_DATA.filter(t => t.hskLevel === activeLevelTab);
  }, [activeLevelTab]);

  // Handle start topic lesson
  const startTopicLesson = (topic: Topic) => {
    setActiveTopic(topic);
    setLessonWordIndex(0);
    setQuizMode(false);
    setQuizCompleted(false);
    setSelectedQuizAnswer(null);
    setQuizScore(0);
  };

  // Complete Word in Lesson
  const markCurrentWordMastered = (vocabId: string) => {
    if (!progress.learnedVocabulary.includes(vocabId)) {
      toggleVocabLearned(vocabId);
    }
    updateStreak();
    
    // Proceed to next
    if (lessonWordIndex < activeTopicVocabularies.length - 1) {
      setLessonWordIndex(prev => prev + 1);
      setShowExampleTranslation(false);
    } else {
      // Trigger short topic evaluation quiz to review
      setQuizMode(true);
      setQuizCompleted(false);
      setLessonWordIndex(0);
    }
  };

  // Find radical detail to display dynamically
  const findRadicalByChar = (char: string): Radical | undefined => {
    return RADICALS_DATA.find(r => r.character.includes(char) || char.includes(r.character));
  };

  // Execute word search lookup
  const handleSearch = (e?: React.FormEvent, manualQuery?: string) => {
    if (e) e.preventDefault();
    const query = manualQuery || searchQuery;
    if (!query.trim()) return;
    const result = getVocabularyDetail(query.trim());
    setSearchResult(result);
    // If searched for, let's open search view
    if (!manualQuery) {
      setCurrentView('search');
    }
  };

  // Generate dynamic quiz options for a vocabulary word
  const quizQuestions = useMemo(() => {
    if (!activeTopicVocabularies.length) return [];
    
    return activeTopicVocabularies.map((vocab) => {
      const distractors = VOCABULARY_DATA
        .filter(v => v.id !== vocab.id)
        .map(v => v.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
      const options = [...distractors, vocab.meaning].sort(() => 0.5 - Math.random());
      
      return {
        word: vocab.word,
        pinyin: vocab.pinyin,
        correctAnswer: vocab.meaning,
        options: options
      };
    });
  }, [activeTopicVocabularies]);

  const handleQuizAnswerSubmit = (option: string) => {
    setSelectedQuizAnswer(option);
    const correct = option === quizQuestions[lessonWordIndex].correctAnswer;
    if (correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedQuizAnswer(null);
    if (lessonWordIndex < quizQuestions.length - 1) {
      setLessonWordIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      // Give some mastery rewards to user's vocabulary list
      const updatedVocabList = [...progress.learnedVocabulary];
      activeTopicVocabularies.forEach(v => {
        if (!updatedVocabList.includes(v.id)) {
          updatedVocabList.push(v.id);
        }
      });
      saveProgress({
        ...progress,
        learnedVocabulary: updatedVocabList
      });
      updateStreak();
    }
  };

  // Helper theme icons for topics
  const getTopicIcon = (order: number) => {
    switch (order) {
      case 1: return <Users className="w-5 h-5 text-blue-600" />;
      case 2: return <User className="w-5 h-5 text-indigo-500" />;
      case 3: return <Heart className="w-5 h-5 text-rose-500" />;
      case 4: return <Clock className="w-5 h-5 text-amber-500" />;
      case 5: return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 6: return <ShoppingBag className="w-5 h-5 text-emerald-500" />;
      default: return <BookOpen className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTopic(null); setCurrentView('dashboard'); }}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100">
              <span className="text-xl font-bold font-serif">汉</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">Hanzi Story</h1>
              <p className="text-[10px] text-slate-500 tracking-wider uppercase font-mono">Bẻ khóa 1000 từ vựng HSK 1-3 & Bộ Thủ</p>
            </div>
          </div>

          {/* Quick Stats Header & Account Options */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Live Timer Widget */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50/50 rounded-full border border-blue-150 text-slate-600 font-mono text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Phiên học: {Math.floor(studyTimeSeconds / 60)}p {studyTimeSeconds % 60}s</span>
            </div>

            {/* Streak Widget */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 rounded-full border border-rose-100 text-rose-600">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span className="text-xs font-bold font-mono">{progress.streak} ngày</span>
            </div>

            {/* Target 1000 level progress */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] text-slate-400 font-bold uppercase font-mono">HSK 1-3 Tiến độ</span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {masteredVocabCount} / 1000 từ
              </span>
            </div>

            {/* User Account Controls */}
            {currentUser ? (
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-extrabold uppercase shrink-0">
                  {currentUser.email ? currentUser.email[0] : 'U'}
                </div>
                <span className="hidden md:inline-block text-[11px] font-bold text-slate-700 max-w-[90px] truncate" title={currentUser.email || ''}>
                  {currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => signOut(auth)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Đăng xuất khỏi tài khoản"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                title="Đăng nhập hoặc Đăng ký để đồng bộ trực tuyến"
              >
                <LogIn className="w-3 px-0.5" />
                <span>Đồng bộ</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDE BAR NAVIGATION */}
        {!activeTopic && (
          <aside className="lg:col-span-1 flex flex-col space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">Thực đơn</p>
              
              <button 
                onClick={() => { setCurrentView('dashboard'); }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-5 h-5 text-blue-500" />
                <span>Trang Chủ</span>
              </button>

              <button 
                onClick={() => { setCurrentView('roadmap'); }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'roadmap' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-5 h-5 text-indigo-500" />
                <span>Lộ trình HSK 1-3 (1000 Từ)</span>
              </button>

              <button 
                onClick={() => { setCurrentView('radicals'); }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'radicals' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span>50 Bộ Thủ Cơ Bản</span>
              </button>

              <button 
                onClick={() => { setCurrentView('search'); }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'search' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Search className="w-5 h-5 text-violet-500" />
                <span>Tra nghĩa & Phân tách</span>
              </button>

              <button 
                onClick={() => { setCurrentView('review'); }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'review' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Award className="w-5 h-5 text-amber-500" />
                <span>Ôn Tập Từ Vựng</span>
              </button>
            </div>

            {/* Quick Progression Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/20">
                  Mục tiêu lớn
                </span>
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-sm font-bold">Chinh phục 1000 từ</h3>
              <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
                Nắm vững chữ Hán từ bộ thủ nền tảng cổ xưa tới câu ví dụ thực chiến!
              </p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Tiến trình hoàn thành:</span>
                  <span className="text-white font-bold">{overallHskProgressPercent}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${overallHskProgressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-right text-slate-400">
                  Đã thuộc {masteredVocabCount} / 1000 từ HSK 1-3
                </p>
              </div>
            </div>

            <button 
              onClick={handleResetAll}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại lộ trình</span>
            </button>
          </aside>
        )}

        {/* MAIN INTERACTIVE CORE CONTENT CONTAINER */}
        <main className={`lg:col-span-3 ${activeTopic ? 'lg:col-span-4' : ''} flex flex-col space-y-6 min-h-[70vh]`}>
          
          <AnimatePresence mode="wait">
            {!activeTopic ? (
              <>
                {/* 1. DASHBOARD VIEW */}
                {currentView === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg shadow-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="text-[11px] font-bold tracking-wider uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                          Phương pháp bóc tách bộ thủ liên tưởng
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Học từ vựng từ bản chất gốc chữ Hán</h2>
                        <p className="text-sm text-indigo-100 max-w-md">
                          Đi sâu thâu tóm 50 bộ thủ cổ sơ, liên kết câu chuyện, rồi áp dụng thực chiến lộ trình 1000 từ vựng.
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => { setCurrentView('roadmap'); }}
                        className="px-6 py-3 bg-white text-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-transform font-bold text-sm rounded-full flex items-center space-x-2 shadow-lg shadow-blue-900/10"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Học Lộ Trình HSK</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* STAT 1: Streak Card */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                          <Flame className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Học liên tục</p>
                          <h4 className="text-xl font-bold text-slate-800 font-mono mt-0.5">{progress.streak} Ngày</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Thời gian tích lũy hằng ngày!</p>
                        </div>
                      </div>

                      {/* STAT 2: Radicals Card */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Bộ thủ đã thuộc</p>
                          <div className="flex items-baseline justify-between mt-0.5">
                            <h4 className="text-xl font-bold text-slate-800 font-mono">{masteredRadicalsCount} / 50</h4>
                            <span className="text-[10px] font-bold text-emerald-600">{radicalProgressPercent}%</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-emerald-500 h-full" style={{ width: `${radicalProgressPercent}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* STAT 3: Goal HSK Words progress */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Đã mastered từ</p>
                          <div className="flex items-baseline justify-between mt-0.5">
                            <h4 className="text-xl font-bold text-slate-800 font-mono">{masteredVocabCount} từ</h4>
                            <span className="text-[10px] text-indigo-500 font-semibold">Mục tiêu 1000</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(masteredVocabCount/1000)*100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BIỂU ĐỒ HOẠT ĐỘNG HỌC TẬP CÁ NHÂN */}
                    <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-4 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                              <Activity className="w-4 h-4" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-800">Biểu Đồ Thời Gian Ôn Luyện (Hằng Ngày)</h3>
                          </div>
                          <p className="text-xs text-slate-450 text-slate-400">Thời lượng rèn luyện lặp lại ngắt quãng & bóc tách chữ Hán cá nhân</p>
                        </div>

                        {/* Account status widget */}
                        <div className="px-3.5 py-1.5 bg-slate-50 border border-slate-150 rounded-2xl flex items-center gap-2 shrink-0 self-start sm:self-auto">
                          <span className={`w-2 h-2 rounded-full ${currentUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                            {currentUser ? `Đồng bộ trực tuyến: ${currentUser.email?.split('@')[0]}` : 'Offline khách (Chưa lưu cloud)'}
                          </span>
                        </div>
                      </div>

                      {/* Summary Metrics Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Tổng thời gian hôm nay</span>
                          <span className="text-lg font-black text-slate-800 font-mono mt-0.5 block">
                            {((progress.studyHistory?.find(s => s.date === new Date().toISOString().split('T')[0])?.minutes || 0) + (studyTimeSeconds / 60)).toFixed(1)} phút
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Chuỗi ngày bền bỉ</span>
                          <span className="text-lg font-black text-rose-600 font-mono mt-0.5 block">
                            🔥 {progress.streak} ngày liên tục
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ghi nhớ theo ngày</span>
                          <span className="text-lg font-black text-indigo-600 font-mono mt-0.5 block">
                            {Object.keys(progress.srsVocabulary || {}).length} từ xếp lịch
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Đồng bộ cloud</span>
                          <span className="text-lg font-black text-emerald-600 font-sans mt-0.5 block flex items-center gap-1">
                            {currentUser ? '✓ Đã kích hoạt' : '✗ Bản cục bộ'}
                          </span>
                        </div>
                      </div>

                      {/* Custom styled responsive chart using Recharts */}
                      <div className="h-[210px] w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis 
                              dataKey="name" 
                              stroke="#94a3b8" 
                              fontSize={10} 
                              fontWeight={600}
                              tickLine={false} 
                              axisLine={false} 
                            />
                            <YAxis 
                              stroke="#94a3b8" 
                              fontSize={10} 
                              fontWeight={600}
                              tickLine={false} 
                              axisLine={false} 
                              allowDecimals={true}
                              unit="m"
                            />
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-[11px] font-sans shadow-lg border border-slate-800 text-left space-y-0.5">
                                      <p className="font-bold text-[10px] text-slate-300">{data.formattedDate}</p>
                                      <p className="font-extrabold text-indigo-300">⏱️ {data.minutes} phút ôn luyện</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="minutes" 
                              stroke="#4f46e5" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorMinutes)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="p-3.5 bg-indigo-50/40 rounded-2xl border border-indigo-150 flex items-center justify-between text-xs font-semibold text-indigo-700">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
                          <span>Học bóc tách & ôn tập lặp lại ngắt quãng để tự động vẽ đầy biểu đồ này!</span>
                        </div>
                        {!currentUser && (
                          <button
                            onClick={() => setAuthModalOpen(true)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold shadow-sm cursor-pointer transition-all"
                          >
                            Đăng nhập lưu tài khoản
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Method Overview & Guides */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-base font-bold text-slate-900">Phương pháp khắc họa học sâu chữ Hán</h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Chữ Hán là chữ tượng hình nghệ thuật cao. Thay vì học vẹt máy móc, Hanzi Story bóc tách cấu trúc thành các bộ thủ nền cốt để ghi nhớ sâu sắc qua câu chuyện:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2.5">1</div>
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Học 50 Bộ Thủ Thu hẹp</h5>
                          <p className="text-[11px] text-slate-500">Thu hẹp các biến thể giống nhau vào chung một ô ngắm nhìn, tránh tốn sức học trùng.</p>
                        </div>

                        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-2.5">2</div>
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Mẹo Loa Nghe Phát Âm</h5>
                          <p className="text-[11px] text-slate-500">Mọi chữ vựng, từ nghép hay câu ví dụ đều có loa nghe đi nghe lại chuẩn ngôn giọng xứ.</p>
                        </div>

                        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-2.5">3</div>
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Thư Viện 1000 Từ HSK</h5>
                          <p className="text-[11px] text-slate-500">Tra cứu nhanh, xem trước móng nền tảng bạt ngàn từ vựng HSK 1, 2, 3 phân bài học khoa học.</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access Roadmap Shortcut */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Layers className="w-5 h-5 text-indigo-500" />
                          Tiếp tục học lộ trình HSK 1
                        </span>
                        <button 
                          onClick={() => { setRoadmapViewTab('topics'); setCurrentView('roadmap'); }}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center"
                        >
                          Xem tất cả <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        {TOPICS_DATA.slice(0, 3).map((topic) => {
                          const percent = getTopicProgress(topic.id);
                          return (
                            <div 
                              key={topic.id}
                              onClick={() => { startTopicLesson(topic); }}
                              className="group p-4 bg-slate-50/65 hover:bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-blue-100/60 rounded-xl text-blue-700">
                                  {getTopicIcon(topic.order)}
                                </div>
                                <div className="text-left">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                      {topic.title}
                                    </h4>
                                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">HSK 1</span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{topic.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <div className="text-right">
                                  <span className="text-xs font-mono font-bold text-slate-700">{percent}%</span>
                                  <div className="w-16 bg-slate-200 h-1 rounded-full overflow-hidden mt-1">
                                    <div className="bg-blue-600 h-full" style={{ width: `${percent}%` }}></div>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. RADICALS VIEW (50 bộ thủ) */}
                {currentView === 'radicals' && (
                  <motion.div
                    key="radicals"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-left">
                        <h2 className="text-xl font-bold text-slate-900">Thư viện 50 Bộ Thủ Cơ Bản</h2>
                        <p className="text-xs text-slate-500">Móng nền tảng kiên cố, bóc tách cơ chất từ ngữ Hán thư thốt.</p>
                      </div>
                      
                      {/* Filter category bar */}
                      <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
                        {['all', 'nature', 'human', 'action', 'object', 'lifestyle'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setRadicalCategoryFilter(cat); }}
                            className={`text-[11px] font-semibold px-2 px-2.5 py-1 rounded-lg transition-colors capitalize ${
                              radicalCategoryFilter === cat 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            {cat === 'all' ? 'Tất cả' :
                             cat === 'nature' ? 'Tự nhiên' :
                             cat === 'human' ? 'Con người' :
                             cat === 'action' ? 'Hành động' :
                             cat === 'object' ? 'Đồ vật' : 'Đời sống'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {filteredRadicals.map((radical) => {
                        const isLearned = progress.learnedRadicals.includes(radical.id);
                        return (
                          <div
                            key={radical.id}
                            onClick={() => { setSelectedRadical(radical); }}
                            className={`group bg-white p-4 pt-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col items-center text-center ${
                              isLearned 
                                ? 'border-emerald-200 shadow-sm shadow-emerald-50 bg-emerald-50/20' 
                                : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                            }`}
                          >
                            {/* Checkmark badge */}
                            {isLearned && (
                              <span className="absolute top-2.5 right-2-.5 right-2.5 bg-emerald-500 text-white rounded-full p-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[4px]" />
                              </span>
                            )}

                            {/* Radical Drawing Illustration */}
                            <div className="mb-3 transform group-hover:scale-105 transition-transform">
                              <RadicalIllustration character={radical.character} category={radical.category} emoji={radical.emojiIllustration} />
                            </div>

                            {/* Radical Character (Big and bold) */}
                            <span className="text-3xl font-semibold text-slate-800 font-serif mb-1">
                              {getRadicalDisplay(radical.character)}
                            </span>
                            
                            <span className="text-[10px] text-slate-400 font-bold font-mono tracking-wider uppercase flex items-center gap-1">
                              {radical.pinyin}
                              <button 
                                onClick={(e) => speakChinese(radical.character.split('/')[0].trim(), e)}
                                className="p-0.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                                title="Nghe phát âm bộ thủ"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </span>
                            
                            <h4 className="text-xs font-bold text-slate-900 mt-1">
                              Bộ {radical.vietnameseName}
                            </h4>
                            
                            <p className="text-[11px] text-slate-500 mt-0.5 italic line-clamp-1">
                              ({radical.meaning})
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* 3. ROADMAP HSK VIEW */}
                {currentView === 'roadmap' && (
                  <motion.div
                    key="roadmap"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-left">
                          <h2 className="text-xl font-bold text-slate-900">Lộ Trình Học HSK 1-3 Bài Bản</h2>
                          <p className="text-xs text-slate-500 mt-0.5">Mái chèo bạt ngàn 1000 từ vựng cốt lõi phân chia theo giáo trình.</p>
                        </div>

                        {/* Level Switch Tabs */}
                        <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
                          {[1, 2, 3].map((lv) => (
                            <button
                              key={lv}
                              onClick={() => { setActiveLevelTab(lv as 1 | 2 | 3); }}
                              className={`text-xs px-4 py-2 font-bold rounded-lg transition-all ${
                                activeLevelTab === lv 
                                  ? 'bg-blue-600 text-white shadow' 
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                              }`}
                            >
                              HSK {lv}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* View mode switcher */}
                      <div className="flex border-b border-slate-200 mt-6">
                        <button
                          onClick={() => setRoadmapViewTab('topics')}
                          className={`py-2 px-4 text-xs font-bold focus:outline-none border-b-2 transition-colors ${
                            roadmapViewTab === 'topics'
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Bài học theo chủ đề ({topicsForActiveLevel.length} bài)
                        </button>
                        <button
                          onClick={() => setRoadmapViewTab('library1000')}
                          className={`py-2 px-4 text-xs font-bold focus:outline-none border-b-2 transition-colors ${
                            roadmapViewTab === 'library1000'
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Xem nhanh thư viện 1000 từ HSK {activeLevelTab}
                        </button>
                      </div>
                    </div>

                    {/* MODE A: Topics Roadmap */}
                    {roadmapViewTab === 'topics' && (
                      <div className="space-y-4">
                        {topicsForActiveLevel.map((topic, idx) => {
                          const progressPercent = getTopicProgress(topic.id);
                          const isFinished = progressPercent === 100;

                          return (
                            <div
                              key={topic.id}
                              className={`bg-white rounded-2xl border transition-all ${
                                isFinished ? 'border-emerald-200' : 'border-slate-200'
                              } overflow-hidden shadow-sm hover:shadow-md text-left`}
                            >
                              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start space-x-4">
                                  <div className={`p-3 rounded-2xl ${
                                    isFinished ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                                  }`}>
                                    {getTopicIcon(topic.order)}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer" onClick={() => startTopicLesson(topic)}>
                                        Bài {idx + 1}: {topic.title}
                                      </h3>
                                      <span className="text-[10px] px-2 py-0.5 font-bold font-serif bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                                        {topic.vietnameseTitle}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-normal max-w-xl">
                                      {topic.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4 md:self-center ml-0 md:ml-auto">
                                  <div className="flex flex-col items-end min-w-[70px]">
                                    <span className="text-xs font-semibold text-slate-500">Hoàn thành</span>
                                    <span className="text-sm font-bold font-mono text-slate-800">{progressPercent}%</span>
                                    <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                                      <div 
                                        className={`h-full ${isFinished ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                        style={{ width: `${progressPercent}%` }}
                                      ></div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => startTopicLesson(topic)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                                      isFinished 
                                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                    }`}
                                  >
                                    <span>{progressPercent > 0 ? 'Học tiếp' : 'Học bài'}</span>
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* MODE B: 1000 Words preview library dictionary */}
                    {roadmapViewTab === 'library1000' && (
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-left">
                        
                        {/* Selector and Search Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phân lọc theo bài học</label>
                            <select
                              value={librarySelectedTopicIdx}
                              onChange={(e) => setLibrarySelectedTopicIdx(Number(e.target.value))}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 px-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                            >
                              {topicsForActive1000Tab.map((topic, i) => (
                                <option key={topic.id} value={topic.order}>
                                  Bài {i + 1}: {topic.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tìm kiếm nhanh trong 1000 từ</label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Gõ từ viết Hán tự, Pinyin hoặc nghĩa Việt..."
                                value={librarySearchQuery}
                                onChange={(e) => setLibrarySearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                              />
                              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                            </div>
                          </div>
                        </div>

                        {/* Words grid table */}
                        <div className="border border-slate-100 rounded-xl overflow-hidden">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                                <th className="p-3 pl-4">Chữ Hán</th>
                                <th className="p-3">Phiên âm</th>
                                <th className="p-3">Nghĩa tiếng Việt</th>
                                <th className="p-3 text-center">Phổ âm</th>
                                <th className="p-3 text-right pr-4">Bóc tách / Sổ học</th>
                              </tr>
                            </thead>
                            <tbody>
                              {list1000WordsForTab.length > 0 ? (
                                list1000WordsForTab.map((wordItem, idx) => {
                                  const isLearnedWord = progress.learnedVocabulary.includes(wordItem.word) || progress.learnedVocabulary.some(v => v.includes(wordItem.word));
                                  return (
                                    <tr 
                                      key={idx}
                                      onClick={() => setSelectedVocabDetail(getVocabularyDetail(wordItem.word))}
                                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer group text-xs text-slate-700"
                                    >
                                      {/* Word */}
                                      <td className="p-3 pl-4 font-serif text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {wordItem.word}
                                      </td>
                                      {/* Pinyin */}
                                      <td className="p-3 font-mono text-blue-600 font-bold">
                                        {wordItem.pinyin}
                                      </td>
                                      {/* Meaning */}
                                      <td className="p-3 text-slate-600 font-medium max-w-[200px] truncate" title={wordItem.meaning}>
                                        {wordItem.meaning}
                                      </td>
                                      {/* Audio player */}
                                      <td className="p-3 text-center">
                                        <button
                                          onClick={(e) => speakChinese(wordItem.word, e)}
                                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors inline-flex items-center justify-center"
                                          title="Nhấn để nghe phát âm, click nhiều lần để luyện nghe"
                                        >
                                          <Volume2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                      {/* Actions */}
                                      <td className="p-3 text-right pr-4" onClick={(e) => e.stopPropagation()}>
                                        <button
                                          onClick={() => {
                                            toggleVocabLearned(wordItem.word);
                                            updateStreak();
                                          }}
                                          className={`p-1 px-2.5 rounded-lg text-[10px] font-bold ${
                                            isLearnedWord
                                              ? 'bg-emerald-100 text-emerald-800'
                                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                          }`}
                                        >
                                          {isLearnedWord ? 'Đã thuộc' : 'Thuộc chữ'}
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                                    Không tìm thấy dữ liệu từ thỏa mãn lọc gõ. Hãy thử nhập từ ngữ khác xem!
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <p className="text-[10px] text-slate-400 italic pl-1 text-center">
                          Mẹo vàng: Hãy click trực tiếp một hàng bất kỳ để thực hiện phân rã bóc tách bộ thủ, xem câu chuyện nhớ chữ!
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. SEARCH / PARSER VIEW */}
                {currentView === 'search' && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="text-left">
                        <h2 className="text-xl font-bold text-slate-900">Tra nghĩa & Phân tách chữ Hán tự tức thì</h2>
                        <p className="text-xs text-slate-500">Móc nối tra cứu, giải phẫu cấu trúc ngữ nghĩa câu chuyện lôi cuốn.</p>
                      </div>

                      <form onSubmit={handleSearch} className="flex gap-2.5">
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            placeholder="Ví dụ gõ chữ: 你, 好, 谁, 准, 忘, 想..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            maxLength={10}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500"
                          />
                          <SearchIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                        </div>
                        <button 
                          type="submit"
                          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                        >
                          Phân Tách Từ
                        </button>
                      </form>
                    </div>

                    {searchResult ? (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-left">
                        {/* Word Presentation */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                          <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center text-5xl font-semibold border border-slate-200 text-slate-800 font-serif relative">
                            {searchResult.word}
                            <button
                              onClick={() => speakChinese(searchResult.word)}
                              className="absolute bottom-2 right-2 p-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full transition-colors shadow-xs"
                              title="Thử nghe giọng đọc chữ"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="space-y-1 text-center sm:text-left flex-1">
                            <span className="text-2xl font-bold text-blue-700 font-mono tracking-wider flex items-center justify-center sm:justify-start gap-1">
                              {searchResult.pinyin}
                              <button 
                                onClick={() => speakChinese(searchResult.pinyin)}
                                className="p-1 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                                title="Phát âm Pinyin"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </span>
                            <h3 className="text-lg font-bold text-slate-900">
                              Nghĩa: {searchResult.meaning}
                            </h3>
                            <span className="inline-block text-[10px] px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                              HSK Level {searchResult.hskLevel}
                            </span>
                          </div>
                        </div>

                        {/* Radical Breakdown */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            Bộ thủ cấu thành chi tiết
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {searchResult.radicals.map((radChar, i) => {
                              const foundRad = findRadicalByChar(radChar);
                              return (
                                <button
                                  key={i}
                                  onClick={() => foundRad && setSelectedRadical(foundRad)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-500 rounded-full text-slate-700 hover:text-blue-700 text-xs transition-all shadow-sm"
                                >
                                  <span className="font-serif font-bold text-base text-indigo-600">{radChar}</span>
                                  {foundRad && (
                                    <span className="text-[10px] text-slate-400 font-semibold">({foundRad.vietnameseName})</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-[11px] text-slate-400 italic">Mẹo: Click vào bong bóng để giải cấu trúc nguyên tố bộ thủ.</p>
                        </div>

                        {/* Story */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            Câu chuyện dệt chữ nhớ lâu
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                            {searchResult.story}
                          </p>
                        </div>

                        {/* Example with Audio Play option */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                          <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cú pháp ví dụ đàm thoại</h4>
                            <button
                              onClick={() => speakChinese(searchResult.exampleSentence)}
                              className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center space-x-1"
                              title="Nghe giọng nói đàm thoại"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Nghe mẫu thoại</span>
                            </button>
                          </div>
                          <p className="text-lg font-serif text-slate-800 font-bold">{searchResult.exampleSentence}</p>
                          <p className="text-xs text-blue-600 font-mono italic">{searchResult.examplePinyin}</p>
                          <p className="text-xs text-slate-600 font-medium">{searchResult.exampleMeaning}</p>
                        </div>

                        {/* Notebook toggle action */}
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-xs text-slate-400 italic">Lưu tích trữ vào học bạ học?</span>
                          
                          <button
                            onClick={() => {
                              toggleVocabLearned(searchResult.word);
                              updateStreak();
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                              progress.learnedVocabulary.includes(searchResult.word) || progress.learnedVocabulary.some(v => v.includes(searchResult.word))
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {progress.learnedVocabulary.includes(searchResult.word) || progress.learnedVocabulary.some(v => v.includes(searchResult.word)) ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã Mastered</span>
                              </>
                            ) : (
                              <span>Đánh dấu đã thuộc chữ</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl">
                        <HelpCircle className="w-8 h-8 mx-auto mb-2.5 opacity-60 text-slate-350" />
                        <p className="text-xs font-semibold">Tra cứu bóc tách bất kỳ chữ viết tiếng Hán nào phía trên nhé!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 5. VOCABULARY REVIEW VIEW */}
                {currentView === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <VocabularyReview 
                      learnedWordIds={progress.learnedVocabulary}
                      allVocabularies={VOCABULARY_DATA}
                      onToggleWordLearned={(id) => {
                        toggleVocabLearned(id);
                      }}
                      srsVocabulary={progress.srsVocabulary || {}}
                      onUpdateSrs={handleUpdateSrs}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              // --- ACTIVE TOPIC FLASHCARD SESSION ---
              <motion.div
                key="active-lesson"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto w-full space-y-6 text-left"
              >
                {/* Lesson Header Nav */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => { setActiveTopic(null); }}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-bold font-sans">Thoát bài học</span>
                  </button>

                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-400 tracking-wider">HSK {activeLevelTab}</span>
                    <h3 className="text-sm font-bold text-slate-900">{activeTopic.title}</h3>
                  </div>

                  <span className="text-xs font-bold text-slate-500 font-mono">
                    {quizMode ? 'Quiz ôn tập' : `${lessonWordIndex + 1} / ${activeTopicVocabularies.length}`}
                  </span>
                </div>

                {/* Progress status bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ 
                      width: `${
                        quizMode 
                          ? ((lessonWordIndex + 1) / quizQuestions.length) * 100 
                          : ((lessonWordIndex + 1) / activeTopicVocabularies.length) * 100
                      }%` 
                    }}
                  />
                </div>

                {/* Quiz screen template */}
                {quizMode ? (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
                    {/* Quiz finished layout */}
                    {quizCompleted ? (
                      <div className="text-center py-6 space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold animate-bounce">
                          ✓
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Hoàn thành bài ôn tập thế chất!</h3>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                          Chúc mừng bạn đã xuất sắc vượt qua bài rèn luyện {activeTopic.title}, khắc ghi sâu sắc cốt vựng vào trí thông tuệ!
                        </p>
                        
                        <div className="p-4 bg-slate-50 rounded-2xl max-w-xs mx-auto border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Số câu chuẩn xác</span>
                          <span className="text-2xl font-black text-blue-600 font-mono block mt-1">
                            {quizScore} / {quizQuestions.length} câu
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTopic(null);
                          }}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm inline-block"
                        >
                          Trở về Lộ trình
                        </button>
                      </div>
                    ) : (
                      // Interactive question
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest block">Chọn nghĩa Việt chuẩn của từ</span>
                          
                          <div className="text-6xl font-bold text-slate-800 font-serif my-4 flex items-center justify-center gap-2">
                            {quizQuestions[lessonWordIndex].word}
                            <button
                              onClick={() => speakChinese(quizQuestions[lessonWordIndex].word)}
                              className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-xs"
                              title="Nghe giọng phát âm mẫu"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                          <span className="text-xl font-bold text-slate-400 font-mono tracking-wider">
                            {quizQuestions[lessonWordIndex].pinyin}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {quizQuestions[lessonWordIndex].options.map((option, idx) => {
                            const isAnswered = selectedQuizAnswer !== null;
                            const isCorrectOpt = option === quizQuestions[lessonWordIndex].correctAnswer;
                            const isSelectedOpt = option === selectedQuizAnswer;

                            let optBtnStyle = 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/10 text-slate-700';
                            if (isAnswered) {
                              if (isCorrectOpt) {
                                optBtnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold';
                              } else if (isSelectedOpt) {
                                optBtnStyle = 'bg-rose-50 border-rose-400 text-rose-800';
                              } else {
                                optBtnStyle = 'opacity-40 border-slate-150';
                              }
                            }

                            return (
                              <button
                                key={idx}
                                disabled={isAnswered}
                                onClick={() => handleQuizAnswerSubmit(option)}
                                className={`p-4 rounded-xl text-xs font-bold border text-left transition-colors flex items-center justify-between ${optBtnStyle}`}
                              >
                                <span>{option}</span>
                                {isAnswered && isCorrectOpt && <span className="text-emerald-600 font-black">✓</span>}
                                {isAnswered && isSelectedOpt && !isCorrectOpt && <span className="text-rose-600 font-black">✗</span>}
                              </button>
                            );
                          })}
                        </div>

                        {selectedQuizAnswer && (
                          <button
                            onClick={nextQuizQuestion}
                            className="w-full py-3 bg-slate-950 hover:bg-slate-900 border text-white rounded-xl text-xs font-bold transition-all"
                          >
                            {lessonWordIndex === quizQuestions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  // Normal Word Presentation card
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
                    
                    {/* Active Word main detail */}
                    <div className="p-6 text-center border-b border-slate-100 flex flex-col items-center space-y-2.5">
                      <span className="text-[10px] font-black text-indigo-500 tracking-wider">HSK {activeLevelTab} - CHỦ ĐỀ CỐT LÕI</span>
                      
                      <span className="text-7xl font-semibold text-slate-900 font-serif py-4 flex items-center justify-center gap-3">
                        {activeTopicVocabularies[lessonWordIndex]?.word}
                        <button
                          onClick={() => speakChinese(activeTopicVocabularies[lessonWordIndex]?.word)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition-colors shadow-xs"
                          title="Lắng nghe trực tiếp phát âm chuẩn"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </span>

                      <span className="text-2xl font-black text-blue-600 font-mono tracking-wide">
                        {activeTopicVocabularies[lessonWordIndex]?.pinyin}
                      </span>

                      <h4 className="text-lg font-black text-slate-800">
                        Nghĩa: {activeTopicVocabularies[lessonWordIndex]?.meaning}
                      </h4>
                    </div>

                    {/* Radicals parsing section */}
                    <div className="p-5 bg-slate-50/60 border-b border-slate-100 space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        Phân tích cấu trúc gốc bộ thủ
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {activeTopicVocabularies[lessonWordIndex]?.radicals.map((radChar, idx) => {
                          const foundRad = findRadicalByChar(radChar);
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (foundRad) {
                                  setSelectedRadicalInModal(foundRad);
                                }
                              }}
                              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-500 rounded-full text-slate-700 hover:text-indigo-600 text-xs font-bold transition-colors shadow-sm"
                            >
                              <span className="font-serif text-sm font-bold text-indigo-650 text-indigo-600">{radChar}</span>
                              {foundRad && (
                                <span className="text-[10px] text-slate-400 font-medium">({foundRad.vietnameseName})</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-slate-400 italic">
                        Mẹo: Tap vào bong bóng để giải mã ý niệm của bộ thủ cấu tạo chữ.
                      </p>
                    </div>

                    {/* Story explanation */}
                    <div className="p-6 space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                        Câu chuyện liên tưởng khơi dậy trí nhớ
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/45 p-4 rounded-2xl border border-blue-100">
                        {activeTopicVocabularies[lessonWordIndex]?.story}
                      </p>
                    </div>

                    {/* Dialogue sentence with visibility trigger and Speaker Trigger */}
                    <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                          Câu đàm thoại mẫu văn
                        </span>
                        
                        <button
                          onClick={() => speakChinese(activeTopicVocabularies[lessonWordIndex]?.exampleSentence)}
                          className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center space-x-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe phát âm</span>
                        </button>
                      </div>

                      <p className="text-base font-serif text-slate-900 tracking-wide font-bold">
                        {activeTopicVocabularies[lessonWordIndex]?.exampleSentence}
                      </p>
                      
                      <p className="text-xs text-blue-600 font-mono font-medium">
                        {activeTopicVocabularies[lessonWordIndex]?.examplePinyin}
                      </p>

                      <div className="pt-1.5">
                        {showExampleTranslation ? (
                          <div className="flex items-start justify-between bg-white px-3 py-2.5 rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              {activeTopicVocabularies[lessonWordIndex]?.exampleMeaning}
                            </p>
                            <button 
                              onClick={() => setShowExampleTranslation(false)}
                              className="text-[10px] text-slate-400 hover:text-slate-600 ml-2 font-bold"
                            >
                              Ẩn
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowExampleTranslation(true)}
                            className="text-xs text-indigo-600 font-bold hover:underline flex items-center space-x-1"
                          >
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              Xem nghĩa dịch tiếng Việt
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Control Bar Actions */}
                    <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                      <button
                        onClick={() => markCurrentWordMastered(activeTopicVocabularies[lessonWordIndex].id)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm transition-colors"
                      >
                        {lessonWordIndex === activeTopicVocabularies.length - 1 ? 'Làm Quiz ôn tập ' : 'Đã thuộc lòng, học tiếp'}
                      </button>
                    </div>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-slate-400 text-xs text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Hanzi Story. Khắc tạc 1000 từ vựng và 50 bộ thủ liên cốt sinh động.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-600">Thành quả HSK 1-3</span>
            <span>•</span>
            <span className="hover:text-slate-600">50 Bộ Thủ Độc Quyền</span>
          </div>
        </div>
      </footer>

      {/* -- SYSTEM LOGIN & SIGNUP OVERLAY -- */}
      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)} 
          onSuccess={(email) => {
            console.log("Sức mạnh đồng bộ tài khoản kích hoạt cho:", email);
          }} 
        />
      )}

      {/* -- DETAILS MODAL 1: Radical detail -- */}
      {selectedRadical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-xl relative animate-in fade-in zoom-in duration-200 text-left overflow-hidden">
            <button 
              onClick={() => { setSelectedRadical(null); }}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 active:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-all border border-slate-100 bg-white/90 backdrop-blur shadow-sm flex items-center justify-center"
              title="Đóng (Close)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 pr-5 space-y-5 scrollbar-thin">
              <div className="text-center space-y-1.5 pt-2">
                <div className="mx-auto w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl mb-1.5">
                  <RadicalIllustration character={selectedRadical.character} category={selectedRadical.category} emoji={selectedRadical.emojiIllustration} />
                </div>

                <span className="text-6xl font-semibold text-slate-800 font-serif block">{getRadicalDisplay(selectedRadical.character)}</span>
                <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center justify-center gap-1.5">
                  {selectedRadical.pinyin}
                  <button
                    onClick={(e) => speakChinese(selectedRadical.character.split('/')[0].trim(), e)}
                    className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                    title="Thử phát âm bộ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </span>
                <h2 className="text-lg font-black text-slate-904 text-slate-900">
                  Bộ {selectedRadical.vietnameseName} - ({selectedRadical.meaning})
                </h2>
              </div>

              {/* Semantic Use Explanation */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 space-y-1">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider">Phạm vi ngữ nghĩa của bộ này</span>
                <p className="text-xs text-slate-700 leading-normal font-semibold">
                  {selectedRadical.usageExplanation}
                </p>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-150 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Câu chuyện cổ giúp nhớ tức thì</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{selectedRadical.story}</p>
              </div>

              {/* Stroke Order visualizer */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">✍️ Quy tắc nét viết Ô kẻ mễ</span>
                <StrokeOrderVisualizer text={selectedRadical.character} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Chữ Hán ghép phổ biến chứa bộ này</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRadical.commonCharacters.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleSearch(undefined, item.character)}
                      className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-150 hover:border-blue-100 transition-colors cursor-pointer group"
                      title="Bấm vào để tra bóc tách chữ này"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-serif font-bold text-slate-850 group-hover:text-blue-700 transition-colors">{item.character}</span>
                          <span className="text-[11px] font-mono font-semibold text-slate-400">{item.pinyin}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{item.meaning}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(item.character);
                        }}
                        className="p-1.5 bg-white hover:bg-blue-100 text-slate-400 hover:text-blue-600 rounded-lg border border-slate-150 hover:border-blue-200 shadow-sm transition-all flex items-center justify-center shrink-0"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  onClick={() => {
                    toggleRadicalLearned(selectedRadical.id);
                    setSelectedRadical(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center transition-colors border ${
                    progress.learnedRadicals.includes(selectedRadical.id)
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700'
                  }`}
                >
                  {progress.learnedRadicals.includes(selectedRadical.id) ? 'Bỏ đánh dấu học bộ này' : 'Tôi Đã Thuộc Bộ Thủ Này'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -- DETAILS MODAL 2: Component radical detail from within vocab card -- */}
      {selectedRadicalInModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full max-h-[80vh] flex flex-col border border-slate-200 shadow-xl relative animate-in fade-in zoom-in duration-150 text-left overflow-hidden">
            <button 
              onClick={() => { setSelectedRadicalInModal(null); }}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 active:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-all border border-slate-100 bg-white/90 backdrop-blur shadow-sm flex items-center justify-center"
              title="Đóng (Close)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 pr-5 space-y-4 scrollbar-thin">
              <div className="text-center space-y-1 pt-2">
                <div className="mx-auto w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl mb-1">
                  <RadicalIllustration character={selectedRadicalInModal.character} category={selectedRadicalInModal.category} emoji={selectedRadicalInModal.emojiIllustration} />
                </div>
                <span className="text-5xl font-semibold text-slate-800 font-serif block">{getRadicalDisplay(selectedRadicalInModal.character)}</span>
                <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center justify-center gap-1">
                  {selectedRadicalInModal.pinyin}
                  <button
                    onClick={(e) => speakChinese(selectedRadicalInModal.character.split('/')[0].trim(), e)}
                    className="p-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Bộ {selectedRadicalInModal.vietnameseName} - ({selectedRadicalInModal.meaning})
                </h2>
              </div>

              {/* Semantic Use Explanation */}
              <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100/50 text-[11px] leading-normal font-semibold text-slate-700">
                {selectedRadicalInModal.usageExplanation}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-150 font-medium">
                {selectedRadicalInModal.story}
              </p>

              {/* Stroke Order visualizer */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">✍️ Quy tắc nét viết Ô kẻ mễ</span>
                <StrokeOrderVisualizer text={selectedRadicalInModal.character} />
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Chữ Hán ghép chứa bộ này</span>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedRadicalInModal.commonCharacters.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        handleSearch(undefined, item.character);
                        setSelectedRadicalInModal(null);
                      }}
                      className="flex items-center justify-between p-2 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-150 hover:border-blue-100 transition-colors cursor-pointer group"
                      title="Bấm vào để tra bóc tách chữ này"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-serif font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{item.character}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{item.pinyin}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{item.meaning}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(item.character);
                        }}
                        className="p-1 bg-white hover:bg-blue-100 text-slate-400 hover:text-blue-600 rounded-lg border border-slate-150 hover:border-blue-200 transition-all flex items-center justify-center shrink-0"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -- DETAILS MODAL 2: Vocabulary detail -- */}
      {selectedVocabDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-xl relative animate-in fade-in zoom-in duration-200 text-left overflow-hidden">
            <button 
              onClick={() => { setSelectedVocabDetail(null); }}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 active:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-all border border-slate-100 bg-white/90 backdrop-blur shadow-sm flex items-center justify-center"
              title="Đóng (Close)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 pr-5 space-y-5 scrollbar-thin">
              <div className="text-center space-y-1.5 pt-2">
                <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider block">Chi tiết Từ Vựng HSK {selectedVocabDetail.hskLevel}</span>
                <span className="text-2xl font-bold text-blue-700 font-mono tracking-wider flex items-center justify-center gap-1.5 mb-1">
                  {selectedVocabDetail.pinyin}
                  <button
                    onClick={(e) => { e.stopPropagation(); speakChinese(selectedVocabDetail.word); }}
                    className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                    title="Phát âm từ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Nghĩa: {selectedVocabDetail.meaning}
                </h2>
              </div>

              {/* Stroke Order/Grid Helper */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">✍️ Thứ tự nét viết Ô mễ (Calligraphy grid)</span>
                <StrokeOrderVisualizer text={selectedVocabDetail.word} />
              </div>

              {/* Radical Decomposition */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-150 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">🧩 Phân rã bóc tách bộ thủ cấu thành</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVocabDetail.radicals.map((radChar, i) => {
                    const cleanChar = radChar.split('/')[0].trim();
                    const foundRad = findRadicalByChar(cleanChar);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (foundRad) {
                            setSelectedRadicalInModal(foundRad);
                          }
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 rounded-full text-slate-700 hover:text-blue-750 font-medium text-xs transition-all shadow-xs"
                      >
                        <span className="font-serif font-bold text-sm text-indigo-600">{cleanChar}</span>
                        {foundRad ? (
                          <span className="text-[10px] text-slate-500 font-bold">
                            (Bộ {foundRad.vietnameseName})
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold">({radChar})</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400 italic">Mẹo: Click vào bong bóng bộ thủ để học độc lập ý nghĩa & lịch sử riêng bộ đó.</p>
              </div>

              {/* story */}
              <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/50 space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Câu chuyện dệt chữ nhớ lâu</span>
                <p className="text-xs text-slate-850 leading-relaxed font-semibold text-slate-800">
                  {selectedVocabDetail.story}
                </p>
              </div>

              {/* examples */}
              {selectedVocabDetail.exampleSentence && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-1 text-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cú pháp ví dụ đàm thoại</span>
                    <button
                      onClick={() => speakChinese(selectedVocabDetail.exampleSentence)}
                      className="p-1 px-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 transition-colors flex items-center space-x-1"
                      title="Phát âm câu ví dụ mẫu"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Nghe mẫu</span>
                    </button>
                  </div>
                  <p className="text-base font-serif font-bold text-slate-800 tracking-wide">{selectedVocabDetail.exampleSentence}</p>
                  <p className="text-[11px] font-mono font-semibold text-blue-600">{selectedVocabDetail.examplePinyin}</p>
                  <p className="text-xs font-semibold text-slate-500 italic mt-1">Dịch nghĩa: {selectedVocabDetail.exampleMeaning}</p>
                </div>
              )}

              {/* Actions study ledger */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Tự động hóa học trình HSK</span>
                <button
                  onClick={() => {
                    toggleVocabLearned(selectedVocabDetail.word);
                    updateStreak();
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    progress.learnedVocabulary.includes(selectedVocabDetail.word)
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  {progress.learnedVocabulary.includes(selectedVocabDetail.word) ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã thuộc từ này</span>
                    </>
                  ) : (
                    <span>Tôi Đã Thuộc Từ Này</span>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
