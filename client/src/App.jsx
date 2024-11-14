import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AllRoutes from "./routes/Route";
import Navbar from "./components/NavBar";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AllRoutes />
        <ToastProvider />
      </AuthProvider>
    </Router>
  );
}

export default App;
