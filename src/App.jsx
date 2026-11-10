import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { SmoothScrollProvider } from './context/SmoothScroll';
import { PageTransitionProvider } from './context/PageTransition';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import CVPage from './pages/CVPage';
import NotFound from './pages/NotFound';

// Use hash routing for static hosts without SPA rewrites
// (build with VITE_HASH_ROUTER=true). Clean URLs otherwise.
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

/** Page content is keyed by language so every animation re-splits cleanly on switch. */
function Content() {
  const { lang } = useLang();
  return (
    <>
      <main id="main" key={lang} tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer key={`footer-${lang}`} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <Preloader />
            <Navbar />
            <Content />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </LanguageProvider>
    </Router>
  );
}
