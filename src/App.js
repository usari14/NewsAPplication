import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="" />} />
            <Route path="/business" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="business" />} />
            <Route path="/entertainment" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="entertainment" />} />
            <Route path="/health" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="health" />} />
            <Route path="/science" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="science" />} />
            <Route path="/sports" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="sports" />} />
            <Route path="/technology" element={<News apikey="516552e7b4f04f6c91a772fddc9d7ab1" pageSize={8} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
