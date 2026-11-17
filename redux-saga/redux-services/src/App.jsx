import { BrowserRouter, Routes, Route } from "react-router-dom";

import ServicesPage from "./pages/ServicesPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServicesPage />} />

        <Route path="/:id/details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
