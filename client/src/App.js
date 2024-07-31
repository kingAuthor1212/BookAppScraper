// import './App.css';
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from  "./pages/Update";
import Request from "./pages/Request"
import "./style.css";
import  {
  BrowserRouter, Routes, Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/request" element={<Request/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
  