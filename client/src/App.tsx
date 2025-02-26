import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import TabView from './views/TabView';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <TabView />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 