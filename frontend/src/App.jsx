import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <div data-theme="coffee">
      <Toaster />
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/create" element={<CreatePage />} />
        <Route path = "/taskflow/:id" element={<EditPage />} />
      </Routes>
    </div>
  )
}

export default App