import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AllRoutes from "./routes/Route";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";
import { checkServer } from "./services/authService";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  const getServerHealth = async () => {
    const res = await checkServer();
    if (res.status === 200) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServerHealth();
  }, []);

  if (loading) return <Loading />;

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
