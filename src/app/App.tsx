import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="card">
        <header>
          <Link to="/users">Users</Link> <br/><br/>
          <Link to="/counters">Counters</Link>
        </header>
        <Outlet />
      </div>
    </>
  );
}

export default App;
