import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import Resources from './pages/Resources';
import Recommendations from './pages/Recommendations';
import MapViewPage from './components/map/MapView'; // We'll creating a specific page or component for this
import VolunteerTasks from './pages/VolunteerTasks';

// Placeholder components for pages we haven't built yet but need routes for
function PlaceholderPage({ title }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-2">Module under active development.</p>
    </div>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          !userRole ? <Login onLogin={setUserRole} /> : <Navigate to="/dashboard" replace />
        } />

        <Route path="/" element={<Navigate to={userRole ? "/dashboard" : "/login"} replace />} />

        {/* Protected Routes would be better structured with a Layout wrapper here but for simplicity we do it inside pages or here */}
        <Route path="/dashboard" element={
          userRole ? <Dashboard userRole={userRole} /> : <Navigate to="/login" />
        } />
        <Route path="/incidents" element={
          userRole ? <Incidents userRole={userRole} /> : <Navigate to="/login" />
        } />
        <Route path="/resources" element={
          userRole ? <Resources userRole={userRole} /> : <Navigate to="/login" />
        } />
        <Route path="/recommendations" element={
          userRole ? <Recommendations userRole={userRole} /> : <Navigate to="/login" />
        } />
        <Route path="/map" element={
          userRole ? <MapViewPage userRole={userRole} /> : <Navigate to="/login" />
        } />
        <Route path="/tasks" element={
          userRole ? <VolunteerTasks userRole={userRole} /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}
