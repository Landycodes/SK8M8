import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TrickRoulette from "./Pages/TrickRoulette";
import Footer from "./Pages/components/Footer";

function App() {
  return (
    <main>
      <Router basename="/SK8M8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TrickRoulette />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
