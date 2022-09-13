import './App.css';

const cookbook = {
  name: "Dima's recepies",
}

function App() {
  return (
    <div className="App">
      <h1 className="title">Book title: "{cookbook.name}"</h1>
    </div>
  );
}

export default App;
