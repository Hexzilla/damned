import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import "./Home.scss";
import MainScene from "./MainScene";
import Menu from "./Menu";
import { Settings } from "./types";

const defaultSettings = {
  logoOpacity: 1,
  leavesScale: 1,
  overlayOpacity: -1,
  lineTranslate: 0,
  lineHeight: 0,
} as Settings;

function Home() {
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
      <Menu />
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
    </div>
  );
}

export default Home;
