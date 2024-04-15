import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './pages/sign';
import { LoginPage } from './pages/login';
import { CategoriesPage } from './pages/interest';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/interest" element={<CategoriesPage />} />
      </Routes>
    </>
  );
}

export default App
