import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import "./Menu.scss";

const sectionIds = [
  "overview",
  "purchase",
  "why",
  "team",
  "roadmap",
  "reviews",
  "donations",
];

const MenuDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const sections = sectionIds
      .map((id: string) => {
        const element = document.getElementById(id)!;
        if (!element) {
          return 0;
        }
        return element.getBoundingClientRect().top - height / 2;
      })
      .filter((e) => e < 0);
    setScroll(Math.max(sections.length - 1, 0));
  }, [scroll, height]);

  useEffect(() => {
    var element = document.getElementById(`${sectionIds[scroll]}-header`);
    if (element) {
      const a = element.getBoundingClientRect()
      if (dotRef.current) {
        dotRef.current.style.left = `${a.left + a.width / 2}px`;
        dotRef.current.style.top = `${a.top + a.height}px`;
      }
    }
  }, [scroll, height, width]);

  return (
    <div id="header-dot" ref={dotRef} />
  )
}

const Menu = () => {
  return (
    <nav id="dik-nav" className="navbar navbar-expand-lg navbar-light">
      <div className="main-menu">
        <MenuDot />
        <div className="menu-container">
          <p className="nav-link mr-auto nft-header-link " id="overview-header">
            Overview
          </p>
          <p className="nav-link mr-auto nft-header-link " id="purchase-header">
            Purchase
          </p>
          <p className="nav-link mr-auto nft-header-link " id="why-header">
            Why
          </p>
          <p className="nav-link mr-auto nft-header-link " id="team-header">
            Team
          </p>
          <p className="nav-link mr-auto nft-header-link " id="roadmap-header">
            Roadmap
          </p>
          <p className="nav-link mr-auto nft-header-link " id="reviews-header">
            Reviews
          </p>
          <p
            className="nav-link mr-auto nft-header-link "
            id="donations-header"
          >
            Donations
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
