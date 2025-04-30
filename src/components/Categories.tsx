// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';

// interface Category {
//   id: number;
//   name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string>('');
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editName, setEditName] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const navigate = useNavigate();

//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleEdit = (category: Category) => {
//     setEditingId(category.id);
//     setEditName(category.name);
//   };

//   const handleSaveEdit = async (id: number) => {
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.put(`/auth/categories/${id}`, 
//         { name: editName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingId(null);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error updating category:', error);
//       setError('Failed to update category');
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.delete(`/auth/categories/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchCategories();
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       setError('Failed to delete category');
//     }
//   };

//   const handleAddNew = async () => {
//     if (!newCategory.trim()) return;
    
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.post('/auth/categories', 
//         { name: newCategory },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewCategory('');
//       setIsAddingNew(false);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error adding category:', error);
//       setError('Failed to add category');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-900">Categories Management</h2>
//         <button
//           onClick={() => setIsAddingNew(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           Add Category
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {isAddingNew && (
//             <li className="p-4 flex items-center justify-between">
//               <input
//                 type="text"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter category name"
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleAddNew}
//                   className="p-2 text-green-600 hover:text-green-700"
//                 >
//                   <Check className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setIsAddingNew(false)}
//                   className="p-2 text-red-600 hover:text-red-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </li>
//           )}
          
//           {categories.map((category) => (
//             <li key={category.id} className="p-4 flex items-center justify-between">
//               {editingId === category.id ? (
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   autoFocus
//                 />
//               ) : (
//                 <span className="text-gray-900">{category.name}</span>
//               )}
              
//               <div className="flex gap-2">
//                 {editingId === category.id ? (
//                   <>
//                     <button
//                       onClick={() => handleSaveEdit(category.id)}
//                       className="p-2 text-green-600 hover:text-green-700"
//                     >
//                       <Check className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="p-2 text-red-600 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(category)}
//                       className="p-2 text-blue-600 hover:text-blue-700"
//                     >
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(category.id)}
//                       className="p-2 text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';

// interface Category {
//   id: number;
//   name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string>('');
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editName, setEditName] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const navigate = useNavigate();

//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleEdit = (category: Category) => {
//     setEditingId(category.id);
//     setEditName(category.name);
//   };

//   const handleSaveEdit = async (id: number) => {
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.put(`/auth/categories/${id}`, 
//         { name: editName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingId(null);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error updating category:', error);
//       setError('Failed to update category');
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.delete(`/auth/categories/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchCategories();
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       setError('Failed to delete category');
//     }
//   };

//   const handleAddNew = async () => {
//     if (!newCategory.trim()) return;
    
//     const token = localStorage.getItem("authToken");
//     try {
//       await api.post('/auth/categories', 
//         { name: newCategory },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewCategory('');
//       setIsAddingNew(false);
//       fetchCategories();
//     } catch (error) {
//       console.error('Error adding category:', error);
//       setError('Failed to add category');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-900">Categories Management</h2>
//         <button
//           onClick={() => setIsAddingNew(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           Add Category
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {isAddingNew && (
//             <li className="p-4 flex items-center justify-between">
//               <input
//                 type="text"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter category name"
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleAddNew}
//                   className="p-2 text-green-600 hover:text-green-700"
//                 >
//                   <Check className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setIsAddingNew(false)}
//                   className="p-2 text-red-600 hover:text-red-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </li>
//           )}
          
//           {categories.map((category) => (
//             <li key={category.id} className="p-4 flex items-center justify-between">
//               {editingId === category.id ? (
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   autoFocus
//                 />
//               ) : (
//                 <span className="text-gray-900">{category.name}</span>
//               )}
              
//               <div className="flex gap-2">
//                 {editingId === category.id ? (
//                   <>
//                     <button
//                       onClick={() => handleSaveEdit(category.id)}
//                       className="p-2 text-green-600 hover:text-green-700"
//                     >
//                       <Check className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="p-2 text-red-600 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(category)}
//                       className="p-2 text-blue-600 hover:text-blue-700"
//                     >
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(category.id)}
//                       className="p-2 text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Category {
  id: number;
  name: string;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      const response = await api.get("/auth/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setCategories(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
      toast.error("Failed to fetch categories");
    }
  }, [navigate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = async (id: number) => {
    const token = localStorage.getItem("authToken");
    try {
      await api.put(`/auth/categories/${id}`, 
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      await fetchCategories();
      toast.success("Category updated successfully");
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  const handleDelete = async (id: number) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium">Are you sure you want to delete this category?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteCategory(id);
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

  const deleteCategory = async (id: number) => {
    const token = localStorage.getItem("authToken");
    try {
      await api.delete(`/auth/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleAddNew = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    const token = localStorage.getItem("authToken");
    try {
      await api.post('/auth/categories', 
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewCategory('');
      setIsAddingNew(false);
      await fetchCategories();
      toast.success("Category added successfully");
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Categories Management</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {/* Add Category */}
          Add 
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {isAddingNew && (
            <li className="p-4 flex items-center justify-between">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddNew}
                  className="p-2 text-green-600 hover:text-green-700"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </li>
          )}
          
          {categories.map((category) => (
            <li key={category.id} className="p-4 flex items-center justify-between">
              {editingId === category.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span className="text-gray-900">{category.name}</span>
              )}
              
              <div className="flex gap-2">
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="p-2 text-green-600 hover:text-green-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-600 hover:text-blue-700"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
