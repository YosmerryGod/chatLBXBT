import { renderNavbar } from './components/navbar.js';
import { renderNavbarMobile } from './components/navbarMobile.js';
import { renderHeroMobile} from './components/heroMobile.js';
import { renderHeroSection } from './components/hero.js';
import { applyGlobalStyle } from './components/globalStyle.js';
import { applyGlobalStyleMobile } from './components/globalStyleMobile.js';

function isMobileView() {
  return window.innerHeight > window.innerWidth;
}

window.onload = () => {

  if (isMobileView()) {
    renderHeroMobile();
    renderNavbarMobile();
    applyGlobalStyleMobile();
  } else {
    renderHeroSection();
    renderNavbar()
    applyGlobalStyle();
  }
};
