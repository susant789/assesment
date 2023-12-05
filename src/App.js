import { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AppProvider } from "./Context";

function App() {
  const mainref = useRef(null);

  return (
    <div className="App">
      <AppProvider>
        <Header scrollMain={mainref} />
        <Main mainref={mainref} />
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
