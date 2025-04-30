
import React, { useState } from "react";
import { X, Image as ImageIcon, Palette, Check } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Default gradient to use when API fails or returns no data
export const DEFAULT_GRADIENT = {
  name: "Purple",
  value: "from-purple-500 via-blue-500 to-orange-500"
};

interface BannerEditorProps {
  currentBanner: string;
  currentBannerImage?: string | null;
  onClose: () => void;
  onSelect: (gradient: { name: string; value: string }) => void;
}

const gradients = [
  { name: "Ocean", value: "from-blue-500 to-cyan-500" },
  { name: "Sunset", value: "from-orange-500 to-pink-500" },
  { name: "Forest", value: "from-green-500 to-emerald-500" },
  { name: "Royal", value: "from-purple-500 to-indigo-500" },
  { name: "Spring", value: "from-green-400 to-yellow-400" },
  { name: "Aurora", value: "from-teal-400 to-purple-500" },
  { name: "Desert", value: "from-yellow-400 to-orange-500" },
  { name: "Purple", value: "from-purple-500 via-blue-500 to-orange-500" },
];

export function BannerEditor({ currentBanner, currentBannerImage, onClose, onSelect }: BannerEditorProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"gradient" | "image">(currentBannerImage ? "image" : "gradient");
  const [selectedBanner, setSelectedBanner] = useState<string>(currentBanner || DEFAULT_GRADIENT.value);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGradientSelect = (gradient: { name: string; value: string }) => {
    setSelectedBanner(gradient.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
  
      if (!token || !userId) {
        navigate("/signin");
        return;
      }
  
      const selectedGradient = gradients.find((g) => g.value === selectedBanner) || DEFAULT_GRADIENT;
  
      const formData = new FormData();
      formData.append("gradient_name", selectedGradient.name);
  
      const response = await api.post(`/auth/banner?user_id=${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        onSelect(selectedGradient);
        onClose();
        toast.success("Banner updated successfully");
      }
    } catch (error: any) {
      console.error("Error saving banner:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/signin");
      }
      // Use default gradient on error
      onSelect(DEFAULT_GRADIENT);
      setError("Failed to save banner");
      toast.error("Failed to update banner");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Choose Banner Style</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("gradient")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "gradient" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Palette className="w-4 h-4" />
          Gradient
        </button>
      </div>

      {activeTab === "gradient" && (
        <div className="grid grid-cols-2 gap-4">
          {gradients.map((gradient) => (
            <button
              key={gradient.name}
              onClick={() => handleGradientSelect(gradient)}
              className={`relative overflow-hidden rounded-lg transition-transform hover:scale-105 ${
                selectedBanner === gradient.value ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className={`h-24 w-full bg-gradient-to-r ${gradient.value}`} />
              <span className="absolute bottom-2 left-2 text-white text-sm font-medium">{gradient.name}</span>
              {selectedBanner === gradient.value && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-blue-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}