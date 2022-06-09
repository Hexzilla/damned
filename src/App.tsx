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
  const logoRef = useRef<HTMLImageElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null); //t
  const leaveRef = useRef<HTMLImageElement>(null); //d

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.style.opacity = "" + settings.logoOpacity;
    }
    if (bannerRef.current) {
      bannerRef.current.style.transform = `scale(${
        1 + (settings.leavesScale - 1) / 4
      })`;
    }
    if (leaveRef.current) {
      const translate = -(100 * settings.leavesScale - 100);
      leaveRef.current.style.transform = `scale(${settings.leavesScale}) translate3d(0, ${translate}px, 0)`;
    }
  }, [settings]);

  return (
    <div className="banner-container">
      <img
        id="logo"
        src="/images/branding/dik-dik-logo-optimized.webp"
        alt="Logo"
        ref={logoRef}
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
        ref={leaveRef}
      />
    </div>
  );
};

function getWindowSize() { //G
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const useWindowSize = () => { //S
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
  const [scroll, setScroll] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { height } = useWindowSize();

  const handleScrollEvent = () => {
    setScroll(Math.max(window.scrollY, 0));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    const h = height / 1.5;
    setSettings({
      logoOpacity: Math.max(1 - scroll / h, 0),
      leavesScale: Math.min(scroll / h + 1, 1.75),
      overlayOpacity: Math.min((scroll - h) / h, 1),
      lineHeight: Math.max(Math.min((scroll - h) / h, 1), 0),
      lineTranslate: Math.max(scroll - 1.5 * height, 0),
    });
  }, [scroll, height]);

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
      <div style={{minHeight: '1000px'}}>Hello World</div>
    </div>
  );
}

export default App;
