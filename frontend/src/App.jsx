import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ArtisanList from './pages/ArtisanList/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail/ArtisanDetail';
import NotFound from './pages/NotFound/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-grow-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<ArtisanList />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
