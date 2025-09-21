import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import './App.css'
import BoxForm from './components/ShippingBoxForm';
import BoxList from './components/ShippingBoxTable';
import { getBoxes } from './services/storageService';

function App() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  // Load boxes when component mounts
  useEffect(() => {
    loadBoxes();
  }, []);

  // Function to load boxes from localStorage
  const loadBoxes = () => {
    const savedBoxes = getBoxes();
    setBoxes(savedBoxes);
  };

  // Handle successful box save
  const handleBoxSave = () => {
    loadBoxes(); 
    navigate('/list');
  };

  return (
    <div style={{ 
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<BoxForm onSave={handleBoxSave} />} />
          <Route path="/list" element={<BoxList boxes={boxes} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
