"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  removeShorts,
  removeShortEmbeded,
  removePaidContent,
  removeEndPromotion,
  removeFeedBar,
  removeVideoPreview,
  removeSearchVoice,
  removeTabsContent
} from "@/modules/remove-elements";

// Define the type for module keys
type ModuleKey = keyof typeof defaultModuleState;

// Default state for modules
const defaultModuleState = {
  paidContent: true,
  endPromotion: true,
  shorts: true,
  shortEmbeded: true,
  feedBar: true,
  videoPreview: true,
  searchVoice: true,
  tabsContent: true
} as const;

// Module configuration type
interface ModuleConfig {
  key: ModuleKey;
  label: string;
  description: string;
}

export default function YouTubeCleaner() {
  // State to track whether the modules are enabled or disabled
  const [isModuleEnabled, setIsModuleEnabled] = useState(defaultModuleState);

  // Memoized module configurations to prevent unnecessary re-renders
  const moduleConfigs: ModuleConfig[] = useMemo(() => [
    { 
      key: 'paidContent', 
      label: 'Paid Content', 
      description: 'Remove sponsored or paid video content' 
    },
    { 
      key: 'endPromotion', 
      label: 'End Promotion', 
      description: 'Remove end-screen promotions' 
    },
    { 
      key: 'shorts', 
      label: 'Shorts', 
      description: 'Remove YouTube Shorts from feed' 
    },
    { 
      key: 'shortEmbeded', 
      label: 'Embedded Shorts', 
      description: 'Remove embedded Short videos' 
    },
    { 
      key: 'feedBar', 
      label: 'Feed Bar', 
      description: 'Remove additional feed navigation elements' 
    },
    { 
      key: 'videoPreview', 
      label: 'Video Previews', 
      description: 'Remove automatic video previews' 
    },
    { 
      key: 'searchVoice', 
      label: 'Search Voice', 
      description: 'Remove voice search functionality' 
    },
    { 
      key: 'tabsContent', 
      label: 'Tabs Content', 
      description: 'Remove additional content tabs' 
    }
  ], []);

  // Memoized toggle handler to prevent unnecessary re-renders
  const handleToggle = useCallback((module: ModuleKey) => {
    setIsModuleEnabled(prevState => ({
      ...prevState,
      [module]: !prevState[module]
    }));
  }, []);

  // Effect for mutation observation with performance optimization
  useEffect(() => {
    const cleanupFunctions = [
      { condition: isModuleEnabled.paidContent, func: removePaidContent },
      { condition: isModuleEnabled.endPromotion, func: removeEndPromotion },
      { condition: isModuleEnabled.shorts, func: removeShorts },
      { condition: isModuleEnabled.shortEmbeded, func: removeShortEmbeded },
      { condition: isModuleEnabled.feedBar, func: removeFeedBar },
      { condition: isModuleEnabled.videoPreview, func: removeVideoPreview },
      { condition: isModuleEnabled.searchVoice, func: removeSearchVoice },
      { condition: isModuleEnabled.tabsContent, func: removeTabsContent }
    ];

    const observer = new MutationObserver(() => {
      cleanupFunctions.forEach(({ condition, func }) => {
        if (condition) func();
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [isModuleEnabled]);

  return (
    <div className="container mx-auto p-6 bg-background text-foreground">
      <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground brightness-110">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">YouTube Cleaner</CardTitle>
          <CardDescription className="text-muted-foreground">
            🔓 YouTube Unlocker: Keep YouTube Simple for Firefox
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4 bg-border" />
        <CardContent>
          <TooltipProvider>
            <div className="space-y-4">
              {moduleConfigs.map((module) => (
                <div 
                  key={module.key} 
                  className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex flex-col items-start">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="font-medium text-foreground">{module.label}</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover text-popover-foreground">
                        {module.description}
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xs text-muted-foreground text-left">{module.description}</p>
                  </div>
                  <Switch
                    checked={isModuleEnabled[module.key]}
                    onCheckedChange={() => handleToggle(module.key)}
                  />
                </div>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
