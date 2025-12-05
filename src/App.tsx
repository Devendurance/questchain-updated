import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Quests } from './pages/Quests';
import { QuestDetail } from './pages/QuestDetail';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { ForProjects } from './pages/ForProjects';
import { useWalletStore } from './store/useWalletStore';
import { useQuestStore } from './store/useQuestStore';

function App() {
  const { address, isConnected } = useWalletStore();
  const { setCurrentUser } = useQuestStore();

  useEffect(() => {
    if (isConnected && address) {
      setCurrentUser(address);
    }
  }, [isConnected, address, setCurrentUser]);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/quest/:id" element={<QuestDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/for-projects" element={<ForProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
