import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Country from "./Components/Country";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* ✅ Correct Home route */}
        <Route
          path="/"
          element={
            <>
              <Filter />
              <Countries />
            </>
          }
        />
        {/* ✅ Fixed route path to match the navigation */}
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
