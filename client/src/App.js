import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import GameDetails from "./GameDetails/GameDetails";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <StartScreen />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/games/:idVideoGame">
        <GameDetails />
      </Route>
    </div>
  );
}

export default App;
