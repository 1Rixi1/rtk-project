import "./App.css";
import UsersList from "./modules/users/users-list.tsx";
import { Counter } from "./modules/counters/counter.tsx";

function App() {
  return (
    <>
      <div className="card">
        <Counter counterId="first" />
        <Counter counterId="second" />
        <br />
        <br />
        <br />
        <UsersList />
      </div>
    </>
  );
}

export default App;
