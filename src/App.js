import './App.css';
import GameMainPage from './Component/GameMainPage';

function App() {
  return (
    <>
      <div className="App">
      <h1>Lets Play Rock Paper Scissor Game</h1>
      <GameMainPage></GameMainPage>
    </div>
    <footer style={{textAlign:"center",marginTop:"25px"}}>
    <h4>Created By <a style={{textDecoration:"none",cursor:"pointer"}} href='https://manthanjadhav1809.github.io/Manthan_Jadhav_Portfolio/'>Manthan Jadhav</a></h4>
  </footer>
    </>
  );
}

export default App;
