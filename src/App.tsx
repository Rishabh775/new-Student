import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-950  flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <Router>
          <AppRouter />
        </Router>
      </div>
    </div>
  );
}

export default App;
