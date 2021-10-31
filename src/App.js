
import './App.css';
import AddItem from './components/AddItem'
import List from './components/List'
import Version from './components/Version'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
       <AddItem/>
        <List/>
        <Version/>
      </header>
    </div>
  );
}

export default App;
