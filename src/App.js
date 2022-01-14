import React from 'react';
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <Section />
      <Footer />
    </div>
  );
}

export default App;
