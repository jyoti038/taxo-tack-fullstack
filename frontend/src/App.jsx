import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h2 className="text-xl font-semibold">Welcome to eDNA Biodiversity Explorer</h2>
      </main>
    </div>
  );
}

export default App;
