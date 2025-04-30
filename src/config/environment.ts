// Environment variables
export const environment = {
  api: {
    // baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005/api'
     baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/'
  }
};

// Avatar options
export const AVATAR_OPTIONS = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral'
];

// Banner templates
export const BANNER_TEMPLATES = [
  'from-purple-500 via-blue-500 to-orange-500',
  'from-pink-500 via-red-500 to-yellow-500',
  'from-green-500 via-teal-500 to-blue-500',
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-yellow-500 via-orange-500 to-red-500',
  'from-blue-500 via-cyan-500 to-green-500',
  'from-rose-400 via-fuchsia-500 to-indigo-500',
  'from-emerald-500 via-teal-500 to-sky-500',
  'from-amber-500 via-orange-500 to-rose-500',
  'from-violet-500 via-purple-500 to-fuchsia-500'
];

// User tiers
export const USER_TIERS = {
  bronze: {
    name: 'Bronze',
    color: '#CD7F32',
    icon: '👑',
    pointsRequired: 0
  },
  silver: {
    name: 'Silver',
    color: '#C0C0C0',
    icon: '👑',
    pointsRequired: 200
  },
  gold: {
    name: 'Gold',
    color: '#FFD700',
    icon: '👑',
    pointsRequired: 400
  },
  diamond: {
    name: 'Diamond',
    color: '#B9F2FF',
    icon: '💎',
    pointsRequired: 600
  }
};

// Gamification settings
export const DEFAULT_GAMIFICATION_SETTINGS = {
  likePoints: 1,
  commentPoints: 1,
  postPoints: 2,
  videoPoints: 5,
  levelThresholds: [
    { level: 1, points: 0, tier: 'bronze' },
    { level: 2, points: 50, tier: 'bronze' },
    { level: 3, points: 100, tier: 'bronze' },
    { level: 4, points: 200, tier: 'silver' },
    { level: 5, points: 300, tier: 'silver' },
    { level: 6, points: 350, tier: 'silver' },
    { level: 7, points: 400, tier: 'gold' },
    { level: 8, points: 450, tier: 'gold' },
    { level: 9, points: 500, tier: 'gold' },
    { level: 10, points: 600, tier: 'diamond' }
  ]
};