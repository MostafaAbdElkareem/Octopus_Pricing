import React from "react";
import "./resources/styles.scss";

import CssBaseline from '@mui/material/CssBaseline';
import Pricing from "./pages/pricing/components/Pricing";

function App() {
  return (
    <>
    <CssBaseline />
    {/* spacing */}
    <div className="space"></div>
      <Pricing/>
        </>
  );
}

export default App;
