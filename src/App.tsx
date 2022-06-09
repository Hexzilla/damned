import React, { useEffect, useRef } from "react";
import "./App.css";

export interface MainSceneProp {
  logoOpacity: string;
  leavesScale: number;
}

const MainScene: React.FC<MainSceneProp> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null); //t

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = props.logoOpacity;
    }
    if (bannerRef.current) {
      bannerRef.current.style.transform = `scale(${
        1 + (props.leavesScale - 1) / 4
      })`;
    }
    /*if (d.current) {
      const translate = -(100 * settings.leavesScale - 100);
      d.current.style.transform = `scale(${settings.leavesScale}) translate3d(0, ${translate}px, 0)`;
    }*/
  }, [props]);

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

function App() {
  return (
    <div>
      <div className="dik-banner-2d">
        <MainScene logoOpacity='1' leavesScale={1} />
        <div className="banner-overlay"></div>
        <div className="scroll-line "></div>
      </div>
    </div>
  );
}

export default App;
