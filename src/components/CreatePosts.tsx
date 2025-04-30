
import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Image, Video, Music, X, Send } from 'lucide-react';
import { Avatar } from './Avatar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ProfileService } from '../services';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface CreatePostProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio';
  }) => void;
  avatarUrl?: string;
  userEmail?: string;
  tier?: string;
  points?: number;
  onPostCreated?: () => void;
}

const MEDIA_CONFIG = {
  image: {
    accept: 'image/*',
    maxSize: 10 * 1024 * 1024, // 10MB
    label: 'Photo',
    icon: Image,
    errorMessage: 'Please select an image file (max 10MB)',
    description: 'Supports JPG, PNG, GIF up to 10MB'
  },
  video: {
    accept: 'video/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    label: 'Video',
    icon: Video,
    errorMessage: 'Please select a video file (max 50MB)',
    description: 'Supports MP4, WebM up to 50MB'
  },
  audio: {
    accept: 'audio/*',
    maxSize: 100 * 1024 * 1024, // 20MB
    label: 'Audio',
    icon: Music,
    errorMessage: 'Please select an audio file (max 100MB)',
    description: 'Supports MP3, WAV up to 100MB'
  },
};

export const CreatePost: React.FC<CreatePostProps> = ({
  onClose,
  onSubmit,
  avatarUrl,
  userEmail,
  tier,
  points,
  onPostCreated 
}) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video' | 'audio' | null>(null);
  const profileName = localStorage.getItem('profileName');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  
  
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const token = localStorage.getItem("authToken");
  //     const userId = localStorage.getItem("userId");
  
  //     if (!token || !userId) {
  //       setLoading(false);
  //       return;
  //     }
  
  //     try {
  //       const { data } = await api.get(`/auth/profile/${userId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  
  //       setProfile(data);
        
  //       // Store total_likes in localStorage
  //       if (data.total_likes !== undefined) {
  //         localStorage.setItem("totalLikes", data.total_likes.toString());
  //       }
  
  //       // Retrieve total_likes from localStorage and call calculatePoints API
  //       const storedLikes = localStorage.getItem("totalLikes");
  //       if (storedLikes) {
  //         await calculatePoints(storedLikes);
  //       }
  
  //     } catch (err) {
  //       if (err.response?.status === 401) {
  //         console.log("Token expired! Logging out...");
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("totalLikes");
  
  //         setTimeout(() => {
  //           window.location.href = "/signin";
  //         }, 0);
  //       } else {
  //         console.error("Error fetching profile:", err);
  //         setError('Failed to load profile. Please try again later.');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchProfile();
  // }, []);
  
  // // Function to call calculatePoints API
  // const calculatePoints = async (totalLikes) => {
  //   try {
  //     const response = await api.get(`/calculatepoints?total_likes=${totalLikes}`);
  //     console.log("Points Calculation Response:", response.data);
  //   } catch (error) {
  //     console.error("Error calling calculatePoints API:", error);
  //   }
  // };
  

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const token = localStorage.getItem("authToken");
  //     const userId = localStorage.getItem("userId");

  //     if (!token || !userId) {
  //       setLoading(false);
  //       return; // Stop execution if token or userId is missing
  //     }

  //     try {
  //       const { data } = await api.get(`/auth/profile/${userId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setProfile(data);
  //     } catch (err) {
  //       if (err.response?.status === 401) {
  //         console.log("Token expired! Logging out...");
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userId"); // Remove userId too
  
  //         setTimeout(() => {
  //           window.location.href = "/signin";
  //         }, 0);
  //       } else {
  //         console.error("Error fetching profile:", err);
  //         setError('Failed to load profile. Please try again later.');
  //       }
  //     } finally {
      
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);



  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
        return;
      }

      try {
        const response = await api.get('/auth/categories', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
          setCategory(response.data[0]?.id || '');
        }
      

       } catch (error) {
        if (error.response?.status === 401) {
          console.log("Token expired! Logging out...");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId"); // Ensure userId is also removed
          
          setTimeout(() => {
            window.location.href = "/signin";
          }, 0);
        } else {
          console.error('Failed to fetch categories:', error);
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError('');
  
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
  
    if (!userId || !token) {
      setError('Authentication required');
      setIsUploading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', description);
      formData.append('category', category);
      if (mediaFile) {
        formData.append('media', mediaFile);
      }
  
      const response = await api.post(
        `/auth/post/${userId}?category_id=${category}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        toast.success('Post created successfully!');
  
        // Create the notification data
        const notificationData = {
          user_id: userId,
          category_id: category,
          title: title || "Untitled Post",
          content: description || "No content",
        };
  
        try {
          // Call the notification API
          const notificationResponse = await api.post(
            '/auth/notifications/add',
            notificationData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (notificationResponse.status >= 200 && notificationResponse.status < 300) {
            console.log('Notification added successfully');
          } else {
            throw new Error('Failed to add notification');
          }
        } catch (notifError) {
          console.error('Error adding notification:', notifError);
        }
  
        // Trigger a refresh if needed
        if (onPostCreated) {
          onPostCreated();
        }
  
        onClose();
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error: any) {
      console.error('Error creating post or adding notification:', error);
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };
  



  



  



  const handleFileSelect = (type: 'image' | 'video' | 'audio') => {
    if (!fileInputRef.current) return;
    setMediaType(type);
    setSelectedMediaType(type);
    fileInputRef.current.accept = MEDIA_CONFIG[type].accept;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mediaType) return;

    const config = MEDIA_CONFIG[mediaType];

    // Validate file type
    if (!file.type.startsWith(mediaType + '/')) {
      setError(config.errorMessage);
      return;
    }

    // Validate file size
    if (file.size > config.maxSize) {
      setError(`File size should be less than ${config.maxSize / (1024 * 1024)}MB`);
      return;
    }

    setMediaFile(file);
    setError('');

    // Create preview for image and video
    if (mediaType !== 'audio') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For audio, we'll just show the file name
      setMediaPreview(file.name);
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    setSelectedMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderMediaPreview = () => {
    if (!mediaPreview) return null;

    return (
      <div className="relative mt-4 bg-gray-50 rounded-lg p-4">
        {mediaType === 'image' ? (
          <div className="relative">
            <img 
              src={mediaPreview} 
              alt="Preview" 
              className="w-full max-h-[300px] object-cover rounded-lg"
            />
          </div>
        ) : mediaType === 'video' ? (
          <div className="relative">
            <video 
              src={mediaPreview} 
              controls 
              className="w-full max-h-[300px] rounded-lg"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2">
            <Music className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">{mediaFile?.name}</span>
          </div>
        )}
        <button
          type="button"
          onClick={removeMedia}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <Toaster position="top-right" />
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-3 mb-6">
          
            <Avatar
              src={avatarUrl}
              seed={profile?.username}
              size="md"
              tier={tier}
              points={points}
            />
            {/* <div className="font-medium">{userEmail?.split('@')[0]}</div> */}
            <div className="font-medium">{profileName }</div>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: themeColors.primary }}
                required
              />
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: themeColors.primary }}
                disabled={loadingCategories}
              >
                {loadingCategories ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px]"
                style={{ focusRing: themeColors.primary }}
                required
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            {renderMediaPreview()}

            <div className="space-y-2">
              <div className="flex gap-2">
                {Object.entries(MEDIA_CONFIG).map(([type, config]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleFileSelect(type as 'image' | 'video' | 'audio')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      selectedMediaType === type
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    disabled={isUploading}
                    onMouseEnter={() => setSelectedMediaType(type as 'image' | 'video' | 'audio')}
                    onMouseLeave={() => !mediaType && setSelectedMediaType(null)}
                  >
                    <config.icon className="w-5 h-5" />
                    <span>{config.label}</span>
                  </button>
                ))}
              </div>
              
              {selectedMediaType && (
                <div className="text-sm text-gray-600 pl-2 animate-fade-in">
                  {MEDIA_CONFIG[selectedMediaType].description}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 px-6 py-2 text-white rounded-lg disabled:opacity-50"
              style={{ backgroundColor: themeColors.primary }}
            >
              <Send className="w-4 h-4" />
              {isUploading ? 'Creating Post...' : 'Share Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};