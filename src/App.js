import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AppProvider } from "./Context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Header />
        <Main />
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
