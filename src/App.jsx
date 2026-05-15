import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Notes from "./Pages/NotesList";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NoteDetails from "./Pages/NoteDetails";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddNotes from "./Pages/AddNotes";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />{" "}
          <Route path="notes/new" element={<AddNotes />} />{" "}
          <Route path="notes/:id" element={<NoteDetails />} />{" "}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
