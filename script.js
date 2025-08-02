import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { renderHeroSection } from './components/hero.js';

window.onload = () => {
  renderTopbar();
  renderSidebar();
  
  renderHeroSection();
};