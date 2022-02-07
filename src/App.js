import logo from "./logo.svg";
import "./App.css";
import BeerCards from "./components/BeerCards";

function App() {
    return (
        <div className="App">
            <header> Beer Info </header>
            <main>
                <BeerCards />
            </main>
            <footer>Made by Billy Duraney</footer>
        </div>
    );
}

export default App;
