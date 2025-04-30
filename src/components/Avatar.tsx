// import React from 'react';
// import { useProfileStore } from '../store/profileStore';
// import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';

// interface AvatarProps {
//   src?: string;
//   seed?: string;
//   size?: 'sm' | 'md' | 'lg' | 'xl';
//   className?: string;
//   tier?: string;
//   points?: number;
//   showTier?: boolean;
//   onClick?: () => void;
// }

// export const Avatar: React.FC<AvatarProps> = ({ 
//   src, 
//   seed, 
//   size = 'md', 
//   className = '',
//   tier = 'bronze',
//   points = 0,
//   showTier = true,
//   onClick
// }) => {
//   const { avatarUrl } = useProfileStore();
  
//   // Determine size class
//   const sizeClass = {
//     sm: 'w-8 h-8',
//     md: 'w-10 h-10',
//     lg: 'w-12 h-12',
//     xl: 'w-24 h-24'
//   }[size];
  
//   // Use provided src, or generate from seed, or use profile avatar
//   const imgSrc = src || (seed ? `https://api.dicebear.com/7.x/initials/svg?seed=${seed}` : avatarUrl);
  
//   // Get tier info
//   const tierInfo = USER_TIERS[tier as keyof typeof USER_TIERS] || USER_TIERS.bronze;
  
//   // Calculate user level based on points
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return thresholds[i].level;
//       }
//     }
//     return 1;
//   };
  
//   const userLevel = getUserLevel(points);
  
//   // Get crown color based on level
//   const getCrownColor = (level: number) => {
//     if (level >= 10) return '#B9F2FF'; // Diamond
//     if (level >= 7) return '#FFD700';  // Gold
//     if (level >= 4) return '#C0C0C0';  // Silver
//     return '#CD7F32';                  // Bronze
//   };
  
//   const crownColor = getCrownColor(userLevel);

//   return (
//     <div className="relative" onClick={onClick}>
//       <img
//         src={imgSrc}
//         alt="Avatar"
//         className={`rounded-full object-cover ${sizeClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.onerror = null;
//           target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=user';
//         }}
//       />
  
//       {/* Show crown only if user is Level 4 */}
//       {showTier && userLevel === 4 && (
//         <div 
//           className="absolute -top-1 -right-1 flex items-center justify-center text-xs"
//           title={`Level ${userLevel} (${tierInfo.name} Tier)`}
//         >
//           <span className="text-lg" style={{ color: crownColor }}>👑</span>
//         </div>
//       )}
//     </div>
//   );
  
  
  
// };





import React from 'react';
import { useProfileStore } from '../store/profileStore';
import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';

interface AvatarProps {
  src?: string;
  seed?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  tier?: string;
  points?: number;
  showTier?: boolean;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  seed, 
  size = 'md', 
  className = '',
  tier = 'bronze',
  points = 0,
  showTier = true,
  onClick
}) => {
  const { avatarUrl } = useProfileStore();
  
  // Determine size class
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-24 h-24'
  }[size];
  
  // Use provided src, or generate from seed, or use profile avatar
  const imgSrc = src || (seed ? `https://api.dicebear.com/7.x/initials/svg?seed=${seed}` : avatarUrl);
  
  // Get tier info
  const tierInfo = USER_TIERS[tier as keyof typeof USER_TIERS] || USER_TIERS.bronze;
  
  // Calculate user level based on points
  const getUserLevel = (points: number) => {
    const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (points >= thresholds[i].points) {
        return thresholds[i].level;
      }
    }
    return 1;
  };
  
  const userLevel = getUserLevel(points);
  
  // Get crown color based on level
  const getCrownColor = (level: number) => {
    if (level >= 10) return '#B9F2FF'; // Diamond
    if (level >= 7) return '#FFD700';  // Gold
    if (level >= 4) return '#C0C0C0';  // Silver
    return '#CD7F32';                  // Bronze
  };
  
  const crownColor = getCrownColor(userLevel);

  return (
    <div className="relative" onClick={onClick}>
      <img
        src={imgSrc}
        alt="Avatar"
        className={`rounded-full object-cover ${sizeClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=user';
        }}
      />
  
      {/* Show crown only if user is Level 4 */}
      {showTier && userLevel === 4 && (
        <div 
          className="absolute -top-1 -right-1 flex items-center justify-center text-xs"
          title={`Level ${userLevel} (${tierInfo.name} Tier)`}
        >
          <span className="text-lg" style={{ color: crownColor }}>👑</span>
        </div>
      )}
    </div>
  );
  
  
  
};