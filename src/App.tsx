import './App.css';
import { MyRouts } from './components/layout/MyRouts';
import { Navbar } from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MyRouts />
    </div>
  );
}

export default App;
