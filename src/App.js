import logo from './logo.svg';
import './App.css';
import AddItem from './components/AddItem'
import List from './components/List'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
       <AddItem/>
        <List/>
       
      </header>
    </div>
  );
}

export default App;
