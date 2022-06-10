import { useEffect, useRef } from "react";
import { Settings } from "./types";

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

export default MainScene;