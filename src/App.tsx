import React, { useEffect, useRef } from "react";
import "./App.css";

export interface Settings {
  logoOpacity: string;
  leavesScale: number;
  overlayOpacity: number;
  lineTranslate: number;
  lineHeight: number;
}

export interface MainSceneProp {
  settings: Settings;
}

const MainScene: React.FC<MainSceneProp> = ({ settings }: MainSceneProp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null); //t

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = settings.logoOpacity;
    }
    if (bannerRef.current) {
      bannerRef.current.style.transform = `scale(${
        1 + (settings.leavesScale - 1) / 4
      })`;
    }
    /*if (d.current) {
      const translate = -(100 * settings.leavesScale - 100);
      d.current.style.transform = `scale(${settings.leavesScale}) translate3d(0, ${translate}px, 0)`;
    }*/
  }, [settings]);

  return (
    <div className="banner-container" ref={containerRef}>
      <img
        id="logo"
        src="/images/branding/dik-dik-logo-optimized.webp"
        alt="Logo"
      />
      <img
        id="habitat"
        src="/images/branding/habitat-static.webp"
        alt="Banner"
        ref={bannerRef}
      />
      <img
        id="leaves-entrance"
        src="/images/branding/leaves-entrance-cropped.png"
        alt="Leaves Entrance"
        data-xblocker="passed"
      />
    </div>
  );
};

const settings = {
  logoOpacity: "1",
  leavesScale: 1,
  overlayOpacity: -1,
  lineTranslate: 0,
  lineHeight: 0,
} as Settings;

function App() {
  return (
    <div>
      <div className="dik-banner-2d">
        <MainScene settings={settings} />
        <div
          className="banner-overlay"
          style={{ opacity: settings.overlayOpacity }}
        />
        <div
          className="scroll-line "
          style={{
            transform: `translate3d(-50%, ${-settings.lineTranslate}px, 0)`,
            height: `${200 * settings.lineHeight}px`,
          }}
        />
      </div>
    </div>
  );
}

export default App;
