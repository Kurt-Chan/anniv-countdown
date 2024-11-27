import { Routes, Route } from 'react-router-dom';
import './App.css'
// import CountdownPage from './pages/CountdownPage';
import AnnivPage from './pages/AnnivPage';
// import WhoAreYou from './pages/WhoAreYou';

function App() {

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route index element={<AnnivPage />} />
      </Routes>
    </>
  )
}

export default App
