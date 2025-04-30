// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Check, X, Plus, Trash2 } from 'lucide-react';

// interface Tier {
//   level: number;
//   tier_name: string;
//   min_likes: number;
//   max_likes: number;
//   tier_color: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// const defaultNewTier: Tier = {
//   level: 0,
//   tier_name: '',
//   min_likes: 0,
//   max_likes: 0,
//   tier_color: '#000000',
// };

// export default function TierManagement() {
//   const [tiers, setTiers] = useState<Tier[]>([]);
//   const [error, setError] = useState<string>('');
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editForm, setEditForm] = useState<Tier | null>(null);
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [newTier, setNewTier] = useState<Tier>(defaultNewTier);
//   const navigate = useNavigate();

//   const fetchTiers = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/tiers", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setTiers(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching tiers:", error);
//       setError("Failed to fetch tiers");
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchTiers();
//   }, [fetchTiers]);

//   const handleEdit = (tier: Tier) => {
//     setEditingId(tier.level);
//     setEditForm({ ...tier });
//   };

//   const handleSaveEdit = async () => {
//     if (!editForm) return;
    
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.put(`/auth/tiers/${editForm.level}`, 
//         editForm,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingId(null);
//       setEditForm(null);
//       fetchTiers();
//     } catch (error) {
//       console.error('Error updating tier:', error);
//       setError('Failed to update tier');
//     }
//   };

//   const handleAddNew = async () => {
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.post('/auth/tiers', 
//         newTier,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setIsAddingNew(false);
//       setNewTier(defaultNewTier);
//       fetchTiers();
//     } catch (error) {
//       console.error('Error adding tier:', error);
//       setError('Failed to add tier');
//     }
//   };

// //   const handleDelete = async (level: number) => {
// //     if (!window.confirm('Are you sure you want to delete this tier?')) {
// //       return;
// //     }

// //     const token = localStorage.getItem("authToken");
// //     try {
// //       await api.delete(`/auth/tiers/${level}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       fetchTiers();
// //     } catch (error) {
// //       console.error('Error deleting tier:', error);
// //       setError('Failed to delete tier');
// //     }
// //   };

// const handleDelete = async (level: number) => {
//     if (!window.confirm('Are you sure you want to delete this tier?')) {
//       return;
//     }
  
//     const token = localStorage.getItem("authToken");
//     try {
//       const response = await api.delete(`/auth/tiers/${level}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
  
//       if (response.status === 200) {
//         setTiers(tiers.filter(tier => tier.level !== level));
//       }
//     } catch (error: any) {
//       console.error('Error deleting tier:', error);
//       setError(error.response?.data?.detail || 'Failed to delete tier');
//     }
//   };
  

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-900">Tier & Points Management</h2>
//         <button
//           onClick={() => setIsAddingNew(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Tier
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Likes</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Likes</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {isAddingNew && (
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <input
//                       type="number"
//                       value={newTier.level}
//                       onChange={(e) => setNewTier(prev => ({ ...prev, level: parseInt(e.target.value) }))}
//                       className="w-20 px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <input
//                       type="text"
//                       value={newTier.tier_name}
//                       onChange={(e) => setNewTier(prev => ({ ...prev, tier_name: e.target.value }))}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <input
//                       type="number"
//                       value={newTier.min_likes}
//                       onChange={(e) => setNewTier(prev => ({ ...prev, min_likes: parseInt(e.target.value) }))}
//                       className="w-24 px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <input
//                       type="number"
//                       value={newTier.max_likes}
//                       onChange={(e) => setNewTier(prev => ({ ...prev, max_likes: parseInt(e.target.value) }))}
//                       className="w-24 px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <input
//                       type="color"
//                       value={newTier.tier_color}
//                       onChange={(e) => setNewTier(prev => ({ ...prev, tier_color: e.target.value }))}
//                       className="w-24 px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleAddNew}
//                         className="p-2 text-green-600 hover:text-green-700"
//                       >
//                         <Check className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setIsAddingNew(false);
//                           setNewTier(defaultNewTier);
//                         }}
//                         className="p-2 text-red-600 hover:text-red-700"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               {tiers.map((tier) => (
//                 <tr key={tier.level}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <input
//                         type="number"
//                         value={editForm?.level}
//                         onChange={(e) => setEditForm(prev => prev ? {...prev, level: parseInt(e.target.value)} : null)}
//                         className="w-20 px-2 py-1 border rounded"
//                       />
//                     ) : (
//                       tier.level
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <input
//                         type="text"
//                         value={editForm?.tier_name}
//                         onChange={(e) => setEditForm(prev => prev ? {...prev, tier_name: e.target.value} : null)}
//                         className="w-full px-2 py-1 border rounded"
//                       />
//                     ) : (
//                       tier.tier_name
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <input
//                         type="number"
//                         value={editForm?.min_likes}
//                         onChange={(e) => setEditForm(prev => prev ? {...prev, min_likes: parseInt(e.target.value)} : null)}
//                         className="w-24 px-2 py-1 border rounded"
//                       />
//                     ) : (
//                       tier.min_likes
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <input
//                         type="number"
//                         value={editForm?.max_likes}
//                         onChange={(e) => setEditForm(prev => prev ? {...prev, max_likes: parseInt(e.target.value)} : null)}
//                         className="w-24 px-2 py-1 border rounded"
//                       />
//                     ) : (
//                       tier.max_likes
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <input
//                         type="color"
//                         value={editForm?.tier_color}
//                         onChange={(e) => setEditForm(prev => prev ? {...prev, tier_color: e.target.value} : null)}
//                         className="w-24 px-2 py-1 border rounded"
//                       />
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <div 
//                           className="w-6 h-6 rounded-full" 
//                           style={{ backgroundColor: tier.tier_color }}
//                         />
//                         {tier.tier_color}
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {editingId === tier.level ? (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleSaveEdit}
//                           className="p-2 text-green-600 hover:text-green-700"
//                         >
//                           <Check className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingId(null);
//                             setEditForm(null);
//                           }}
//                           className="p-2 text-red-600 hover:text-red-700"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(tier)}
//                           className="p-2 text-blue-600 hover:text-blue-700"
//                         >
//                           <Pencil className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(tier.level)}
//                           className="p-2 text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Tier {
  level: number;
  tier_name: string;
  min_likes: number;
  max_likes: number;
  tier_color: string;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

const defaultNewTier: Tier = {
  level: 0,
  tier_name: '',
  min_likes: 0,
  max_likes: 0,
  tier_color: '#000000',
};

export default function TierManagement() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Tier | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTier, setNewTier] = useState<Tier>(defaultNewTier);
  const navigate = useNavigate();

  const fetchTiers = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await api.get("/auth/tiers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setTiers(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching tiers:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
      toast.error("Failed to fetch tiers");
    }
  }, [navigate]);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  const handleEdit = (tier: Tier) => {
    setEditingId(tier.level);
    setEditForm({ ...tier });
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    
    const token = localStorage.getItem("authToken");
    try {
      await api.put(`/auth/tiers/${editForm.level}`, 
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditForm(null);
      await fetchTiers();
      toast.success("Tier updated successfully");
    } catch (error) {
      console.error('Error updating tier:', error);
      toast.error('Failed to update tier');
    }
  };

  const handleAddNew = async () => {
    if (!newTier.tier_name.trim()) {
      toast.error("Tier name cannot be empty");
      return;
    }

    if (newTier.min_likes >= newTier.max_likes) {
      toast.error("Maximum likes must be greater than minimum likes");
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      await api.post('/auth/tiers', 
        newTier,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAddingNew(false);
      setNewTier(defaultNewTier);
      await fetchTiers();
      toast.success("Tier added successfully");
    } catch (error) {
      console.error('Error adding tier:', error);
      toast.error('Failed to add tier');
    }
  };

  const handleDelete = async (level: number) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium">Are you sure you want to delete this tier?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteTier(level);
            }}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const deleteTier = async (level: number) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.delete(`/auth/tiers/${level}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setTiers(tiers.filter(tier => tier.level !== level));
        toast.success("Tier deleted successfully");
      }
    } catch (error: any) {
      console.error('Error deleting tier:', error);
      toast.error(error.response?.data?.detail || 'Failed to delete tier');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Tier & Points Management</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {/* Add New Tier */}
          Add

        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Likes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Likes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isAddingNew && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="number"
                      value={newTier.level}
                      onChange={(e) => setNewTier(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="text"
                      value={newTier.tier_name}
                      onChange={(e) => setNewTier(prev => ({ ...prev, tier_name: e.target.value }))}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="number"
                      value={newTier.min_likes}
                      onChange={(e) => setNewTier(prev => ({ ...prev, min_likes: parseInt(e.target.value) }))}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="number"
                      value={newTier.max_likes}
                      onChange={(e) => setNewTier(prev => ({ ...prev, max_likes: parseInt(e.target.value) }))}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="color"
                      value={newTier.tier_color}
                      onChange={(e) => setNewTier(prev => ({ ...prev, tier_color: e.target.value }))}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddNew}
                        className="p-2 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingNew(false);
                          setNewTier(defaultNewTier);
                        }}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {tiers.map((tier) => (
                <tr key={tier.level}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <input
                        type="number"
                        value={editForm?.level}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, level: parseInt(e.target.value)} : null)}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    ) : (
                      tier.level
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <input
                        type="text"
                        value={editForm?.tier_name}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, tier_name: e.target.value} : null)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      tier.tier_name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <input
                        type="number"
                        value={editForm?.min_likes}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, min_likes: parseInt(e.target.value)} : null)}
                        className="w-24 px-2 py-1 border rounded"
                      />
                    ) : (
                      tier.min_likes
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <input
                        type="number"
                        value={editForm?.max_likes}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, max_likes: parseInt(e.target.value)} : null)}
                        className="w-24 px-2 py-1 border rounded"
                      />
                    ) : (
                      tier.max_likes
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <input
                        type="color"
                        value={editForm?.tier_color}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, tier_color: e.target.value} : null)}
                        className="w-24 px-2 py-1 border rounded"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: tier.tier_color }}
                        />
                        {tier.tier_color}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === tier.level ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 text-green-600 hover:text-green-700"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm(null);
                          }}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(tier)}
                          className="p-2 text-blue-600 hover:text-blue-700"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tier.level)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}