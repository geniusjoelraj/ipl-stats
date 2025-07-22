import Login from "./Login";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";

fetch('http://localhost:5000/api')
  .then(res => res.json())
  .then(data => console.log(data));
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

