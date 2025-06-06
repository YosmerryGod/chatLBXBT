import { renderNavbar } from './components/navbar.js';
import { renderHeroSection } from './components/hero.js';
import { applyGlobalStyle } from './components/globalStyle.js';

window.onload = () => {
  renderNavbar();
  renderHeroSection();
  applyGlobalStyle();
};
