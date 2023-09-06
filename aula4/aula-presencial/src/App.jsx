import { useState } from "react";
import "./App.css";
import { api } from "./utils/api";

function validate() {
  return true;
}

function App() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();

    // chamar api
    api.post("users/login");
  }

  function handleChange(key, value) {
    setUser((usr) => ({ ...usr, [key]: value }));
  }

  return (
    <main>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inp2">Email:</label>
        <input
          className="text-black"
          type="text"
          id="inp2"
          value={user.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <br />
        <br />
        <br />
        <label htmlFor="inp3">Senha:</label>
        <input
          className="text-black"
          type="password"
          id="inp3"
          value={user.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <br />
        <br />
        <button className="py-2 px-3 bg-white text-black rounded">Login</button>
      </form>
    </main>
  );
}

export default App;
