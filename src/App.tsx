import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export interface Settings {
  logoOpacity: number;
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
      containerRef.current.style.opacity = "" + settings.logoOpacity;
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

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResizeEvent = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleResizeEvent);
    return () => {
      return window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  return windowSize;
};

const defaultSettings = {
  logoOpacity: 1,
  leavesScale: 1,
  overlayOpacity: -1,
  lineTranslate: 0,
  lineHeight: 0,
} as Settings;

function App() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { height } = useWindowSize();

  const handleScrollEvent = () => {
    setScrollY(Math.max(window.scrollY, 0));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    const halfHeight = height / 1.5;
    setSettings({
      logoOpacity: Math.max(1 - scrollY / halfHeight, 0),
      leavesScale: Math.min(scrollY / halfHeight + 1, 1.75),
      overlayOpacity: Math.min((scrollY - halfHeight) / halfHeight, 1),
      lineHeight: Math.max(Math.min((scrollY - halfHeight) / halfHeight, 1), 0),
      lineTranslate: Math.max(scrollY - 1.5 * height, 0),
    });
  }, [scrollY, height]);

  return (
    <div>
      <div className="dik-banner-2d">
        <MainScene settings={settings} />
        <div
          className="banner-overlay"
          style={{ opacity: settings.overlayOpacity }}
        />
        <div
          className={
            "scroll-line " + (settings.lineTranslate > 0 ? "active" : "")
          }
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
