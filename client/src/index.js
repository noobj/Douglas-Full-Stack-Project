import ReactDOM from "react-dom/client";
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/Home";
import Records from "./components/Records";
import Contact from "./pages/contact";
import NoPage from "./pages/noPage";
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
    const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home setUserInfo={setUserInfo} userInfo={userInfo} />} />
          <Route path="records" element={<Records />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);