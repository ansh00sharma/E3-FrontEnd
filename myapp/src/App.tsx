import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import * as Pages from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Pages.LandingPage />} path="/"/>
        <Route element={<Pages.LoginPage />} path="/login"/>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
