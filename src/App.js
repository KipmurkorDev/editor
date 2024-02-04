import TextEditor from "./Components/Editor/TextEditor";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import "./app.css";
function App() {
  return (
    <div className="app">
      <NavBar />
      <TextEditor />
      <Footer />
    </div>
  );
}

export default App;
