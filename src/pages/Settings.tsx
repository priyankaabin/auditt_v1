
import React from 'react';
import { useThemeStore, getThemeColors, ThemeColor } from '../store/themeStore';
import { Palette, Type, Moon, Sun, Check } from 'lucide-react';

export default function Settings() {
  const { color, fontSize, darkMode, setColor, setFontSize, toggleDarkMode } = useThemeStore();
  const themeColors = getThemeColors(color);

  const colorOptions: { name: string; value: ThemeColor }[] = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
  ];

  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Appearance</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Customize how Family Creatives looks for you</p>
        </div>
        
        {/* Theme Color */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="font-medium dark:text-white">Theme Color</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colorOptions.map((option) => {
              const optionColors = getThemeColors(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`relative p-4 rounded-lg border transition-all dark:bg-gray-800 ${
                    color === option.value 
                      ? 'border-2 shadow-sm' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={{ borderColor: color === option.value ? optionColors.primary : '' }}
                >
                  <div 
                    className="w-full h-8 rounded mb-2"
                    style={{ backgroundColor: optionColors.primary }}
                  />
                  <span className="block text-sm text-center dark:text-white">{option.name}</span>
                  
                  {color === option.value && (
                    <div 
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-white dark:bg-gray-700"
                    >
                      <Check className="w-3 h-3" style={{ color: optionColors.primary }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
      
        
        {/* Dark Mode */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
              <h3 className="font-medium dark:text-white">Dark Mode</h3>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ backgroundColor: darkMode ? themeColors.primary : 'rgb(209 213 219)' }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-8">
            {darkMode 
              ? 'Switch to light mode for a brighter appearance' 
              : 'Switch to dark mode to reduce eye strain in low light'}
          </p>
        </div>
      </div>
    </div>
  );
}

export { Settings }
















