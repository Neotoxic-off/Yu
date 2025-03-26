import React, { useState, useEffect, useRef } from 'react';
import { Switch } from "@heroui/switch";
import { 
  removeShorts,
  removeSearchVoice,
  removeTabsContent,
  removeVideoPreview,
  removeShortEmbeded,
  removePaidContent,
  removeEndPromotion,
  removeFeedBar
} from '../modules.ts';

const YouTubeModifier: React.FC = () => {
  // State for individual module toggles
  const [moduleStates, setModuleStates] = useState({
    paidContent: true,
    endPromotion: true,
    shorts: true,
    shortEmbeded: true,
    feedBar: true,
    videoPreview: true,
    searchVoice: true,
    tabsContent: true
  });

  const observerRef = useRef<MutationObserver | null>(null);

  // Function to apply modifications based on current module states
  const applyModifications = () => {
    if (moduleStates.paidContent) removePaidContent();
    if (moduleStates.endPromotion) removeEndPromotion();
    if (moduleStates.shorts) removeShorts();
    if (moduleStates.shortEmbeded) removeShortEmbeded();
    if (moduleStates.feedBar) removeFeedBar();
    if (moduleStates.videoPreview) removeVideoPreview();
    if (moduleStates.searchVoice) removeSearchVoice();
    if (moduleStates.tabsContent) removeTabsContent();
  };

  // Effect to set up or remove the MutationObserver
  useEffect(() => {
    const isAnyModuleEnabled = Object.values(moduleStates).some(state => state);

    if (isAnyModuleEnabled) {
      const observer = new MutationObserver(() => {
        applyModifications();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      observerRef.current = observer;
      applyModifications();
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [moduleStates]);

  // Function to toggle individual module state
  const toggleModule = (moduleName: keyof typeof moduleStates) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  // Modules configuration
  const modules = [
    { name: 'paidContent', label: 'Remove Paid Content' },
    { name: 'endPromotion', label: 'Remove End Promotion' },
    { name: 'shorts', label: 'Remove Shorts' },
    { name: 'shortEmbeded', label: 'Remove Short Embedded' },
    { name: 'feedBar', label: 'Remove Feed Bar' },
    { name: 'videoPreview', label: 'Remove Video Preview' },
    { name: 'searchVoice', label: 'Remove Search Voice' },
    { name: 'tabsContent', label: 'Remove Tabs Content' }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white/90">Yu</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">
            {Object.values(moduleStates).filter(Boolean).length}/{Object.keys(moduleStates).length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map(({ name, label }) => (
          <div 
            key={name}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 flex items-center justify-start space-x-4 transition-all duration-300 hover:bg-white/20"
          >
            <Switch
              isSelected={moduleStates[name as keyof typeof moduleStates]}
              onValueChange={() => toggleModule(name as keyof typeof moduleStates)}
              color="secondary"
              size="sm"
            />
            <span className="text-sm text-white/90 truncate">{label}</span> {/* Text is kept on one line */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeModifier;
