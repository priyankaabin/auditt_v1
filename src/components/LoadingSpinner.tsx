// import React from 'react';

// export const LoadingSpinner: React.FC = () => (
//   <div className="flex justify-center items-center py-4">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//   </div>
// );

import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoadingSpinner;

