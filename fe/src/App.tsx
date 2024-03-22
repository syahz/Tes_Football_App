/** @format */

import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/home/Home";
import Match from "./pages/match/Match";
import Standings from "./pages/standings/Standings";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="flex items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match" element={<Match />} />
            <Route path="/standings" element={<Standings />} />
          </Routes>
        </div>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
