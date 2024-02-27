import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { BlogIdeas, Timeline } from "./apps";

import "./mvp.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="blogideas" element={<BlogIdeas />} />
      </Routes>
    </BrowserRouter>
  );
}
