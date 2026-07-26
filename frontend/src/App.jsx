import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages publiques
import Home          from './pages/Home/Home';
import ArtisanList   from './pages/ArtisanList/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail/ArtisanDetail';
import NotFound      from './pages/NotFound/NotFound';

// Pages légales
import MentionsLegales     from './pages/Legal/MentionsLegales';
import DonneesPersonnelles from './pages/Legal/DonneesPersonnelles';
import Accessibilite       from './pages/Legal/Accessibilite';
import Cookies             from './pages/Legal/Cookies';

// Admin
import AdminLogin      from './pages/Admin/AdminLogin';
import AdminLayout     from './pages/Admin/AdminLayout';
import AdminDashboard  from './pages/Admin/AdminDashboard';
import AdminArtisans   from './pages/Admin/AdminArtisans';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminSpecialites from './pages/Admin/AdminSpecialites';
import AdminMessages   from './pages/Admin/AdminMessages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main id="main-content" className="flex-grow-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* ── Pages publiques avec Header/Footer ── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/artisans" element={<PublicLayout><ArtisanList /></PublicLayout>} />
        <Route path="/artisans/:id" element={<PublicLayout><ArtisanDetail /></PublicLayout>} />

        {/* ── Pages légales ── */}
        <Route path="/mentions-legales"      element={<PublicLayout><MentionsLegales /></PublicLayout>} />
        <Route path="/donnees-personnelles"  element={<PublicLayout><DonneesPersonnelles /></PublicLayout>} />
        <Route path="/accessibilite"         element={<PublicLayout><Accessibilite /></PublicLayout>} />
        <Route path="/cookies"               element={<PublicLayout><Cookies /></PublicLayout>} />

        {/* ── Login admin (sans layout public) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Espace admin protégé ── */}
        <Route path="/admin" element={
          <ProtectedRoute><AdminLayout /></ProtectedRoute>
        }>
          <Route index       element={<AdminDashboard />} />
          <Route path="artisans"    element={<AdminArtisans />} />
          <Route path="categories"  element={<AdminCategories />} />
          <Route path="specialites" element={<AdminSpecialites />} />
          <Route path="messages"    element={<AdminMessages />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
