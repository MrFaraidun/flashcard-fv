import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Navbar from "./navbar";
import { routes } from "./routes";
import { UserProvider } from "./components/UserContext"; // Import UserProvider


// Component for handling routing
const AppRoutes = () => useRoutes(routes);

const App = () => (
  <UserProvider> {/* Wrap your app with UserProvider */}
    <Router>
      {/* Navbar will be rendered across all pages */}
      <Navbar />

      <div className="w-full min-h-screen pt-16 overflow-auto">
        {/* Render all routes here */}
        <AppRoutes />
      </div>
    </Router>
  </UserProvider>
);

export default App;