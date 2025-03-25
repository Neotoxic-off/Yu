import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

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

export default function Home() {
  // State to track whether the modules are enabled or disabled
  const [isModuleEnabled, setIsModuleEnabled] = useState({
    paidContent: true,
    endPromotion: true,
    shorts: true,
    shortEmbeded: true,
    feedBar: true,
    videoPreview: true,
    sign: true,
    searchVoice: true,
    tabsContent: true
  });

  const handleToggle = (module) => {
    setIsModuleEnabled(prevState => ({
      ...prevState,
      [module]: !prevState[module]
    }));
  };

  // Using useEffect to run the DOM manipulation code when the component mounts
  useEffect(() => {
    // Create the mutation observer to run the removal logic only if the module is enabled
    const observer = new MutationObserver(() => {
      if (isModuleEnabled.paidContent) removePaidContent();
      if (isModuleEnabled.endPromotion) removeEndPromotion();
      if (isModuleEnabled.shorts) removeShorts();
      if (isModuleEnabled.shortEmbeded) removeShortEmbeded();
      if (isModuleEnabled.feedBar) removeFeedBar();
      if (isModuleEnabled.videoPreview) removeVideoPreview();
      if (isModuleEnabled.sign) sign();
      if (isModuleEnabled.searchVoice) removeSearchVoice();
      if (isModuleEnabled.tabsContent) removeTabsContent();
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
  }, [isModuleEnabled]); // Effect will run when `isModuleEnabled` changes

  return (
    <div>
      {/* HeroUi Button */}
      <Button>This is a test</Button>

      {/* Toggling Modules */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.paidContent}
            onChange={() => handleToggle('paidContent')}
          />
          Enable/Disable Paid Content Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.endPromotion}
            onChange={() => handleToggle('endPromotion')}
          />
          Enable/Disable End Promotion Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.shorts}
            onChange={() => handleToggle('shorts')}
          />
          Enable/Disable Shorts Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.shortEmbeded}
            onChange={() => handleToggle('shortEmbeded')}
          />
          Enable/Disable Embedded Shorts Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.feedBar}
            onChange={() => handleToggle('feedBar')}
          />
          Enable/Disable Feed Bar Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.videoPreview}
            onChange={() => handleToggle('videoPreview')}
          />
          Enable/Disable Video Preview Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.sign}
            onChange={() => handleToggle('sign')}
          />
          Enable/Disable Sign Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.searchVoice}
            onChange={() => handleToggle('searchVoice')}
          />
          Enable/Disable Search Voice Removal
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isModuleEnabled.tabsContent}
            onChange={() => handleToggle('tabsContent')}
          />
          Enable/Disable Tabs Content Removal
        </label>
      </div>
    </div>
  );
}
