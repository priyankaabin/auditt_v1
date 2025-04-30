// import React from 'react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';

// interface VideoStatusTabsProps {
//   activeStatus: 'pending' | 'approved' | 'rejected';
//   onStatusChange: (status: 'pending' | 'approved' | 'rejected') => void;
//   counts: {
//     pending: number;
//     approved: number;
//     rejected: number;
//   };
// }

// export const VideoStatusTabs: React.FC<VideoStatusTabsProps> = ({
//   activeStatus,
//   onStatusChange,
//   counts
// }) => {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);

//   return (
//     <div className="mb-6">
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//           <button
//             onClick={() => onStatusChange('pending')}
//             className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
//               ${activeStatus === 'pending'
//                 ? 'border-yellow-500 text-yellow-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//           >
//             Pending
//             {counts.pending > 0 && (
//               <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
//                 ${activeStatus === 'pending' 
//                   ? 'bg-yellow-100 text-yellow-600'
//                   : 'bg-gray-100 text-gray-900'}`}
//               >
//                 {counts.pending}
//               </span>
//             )}
//           </button>

//           <button
//             onClick={() => onStatusChange('approved')}
//             className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
//               ${activeStatus === 'approved'
//                 ? 'border-green-500 text-green-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//           >
//             Approved
//             {counts.approved > 0 && (
//               <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
//                 ${activeStatus === 'approved'
//                   ? 'bg-green-100 text-green-600'
//                   : 'bg-gray-100 text-gray-900'}`}
//               >
//                 {counts.approved}
//               </span>
//             )}
//           </button>

//           <button
//             onClick={() => onStatusChange('rejected')}
//             className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
//               ${activeStatus === 'rejected'
//                 ? 'border-red-500 text-red-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//           >
//             Rejected
//             {counts.rejected > 0 && (
//               <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
//                 ${activeStatus === 'rejected'
//                   ? 'bg-red-100 text-red-600'
//                   : 'bg-gray-100 text-gray-900'}`}
//               >
//                 {counts.rejected}
//               </span>
//             )}
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// };








import React from 'react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface VideoStatusTabsProps {
  activeStatus: 'pending' | 'approved' | 'rejected';
  onStatusChange: (status: 'pending' | 'approved' | 'rejected') => void;
  counts: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export const VideoStatusTabs: React.FC<VideoStatusTabsProps> = ({
  activeStatus,
  onStatusChange,
  counts
}) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => onStatusChange('pending')}
            className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeStatus === 'pending'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Clock className="w-5 h-5 sm:hidden" />
            <span className="hidden sm:inline">Pending</span>
            {counts.pending > 0 && (
              <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
                ${activeStatus === 'pending' 
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-900'}`}
              >
                {counts.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => onStatusChange('approved')}
            className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeStatus === 'approved'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <CheckCircle className="w-5 h-5 sm:hidden" />
            <span className="hidden sm:inline">Approved</span>
            {counts.approved > 0 && (
              <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
                ${activeStatus === 'approved'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-900'}`}
              >
                {counts.approved}
              </span>
            )}
          </button>

          <button
            onClick={() => onStatusChange('rejected')}
            className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeStatus === 'rejected'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <XCircle className="w-5 h-5 sm:hidden" />
            <span className="hidden sm:inline">Rejected</span>
            {counts.rejected > 0 && (
              <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium
                ${activeStatus === 'rejected'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-900'}`}
              >
                {counts.rejected}
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  );
};