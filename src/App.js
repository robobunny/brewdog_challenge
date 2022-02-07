import "./App.css";
import BeerCards from "./components/BeerCards";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Beer Info</h1>
      </header>
      <main>
        <BeerCards />
      </main>
      <footer>
        <h2>Made by Billy Duraney</h2>
      </footer>
    </div>
  );
}

export default App;
