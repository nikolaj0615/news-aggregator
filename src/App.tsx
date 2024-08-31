import React from 'react';
import './App.css';
import NewsAggregator from "./components/NewsAggregator";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/Navbar";


function App() {
  return (
      <Router>
          <div className="container">
              <NavBar />
              <Routes>
                  <Route path="/" element={<NewsAggregator category="all" />} />
                  <Route path="/sports" element={<NewsAggregator category="sports" />} />
                  <Route path="/fashion" element={<NewsAggregator category="fashion" />} />
                  <Route path="/business" element={<NewsAggregator category="business" />} />
                  <Route path="/health" element={<NewsAggregator category="health" />} />
                  <Route path="/technology" element={<NewsAggregator category="technology" />} />
                  <Route path="/politics" element={<NewsAggregator category="politics" />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
