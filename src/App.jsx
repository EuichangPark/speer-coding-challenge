import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Pages
import ActivityDetail from "./app/pages/ActivityDetail.jsx";
import ActivityFeed from "./app/pages/ActivityFeed.jsx";

import theme from "./app/theme/index.js";
const defaultTheme = createTheme(theme);

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={<ActivityFeed />} />
          <Route path="/detail/:id" element={<ActivityDetail />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
