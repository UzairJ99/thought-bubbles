// dependencies
import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import WelcomePage from './WelcomePage';
import AddThought from './AddThought';

function App() {
  const [page, setPage] = React.useState("welcomePage");

  const handleAddThought = () => {
    setPage("addThought");
  }

  // determine which component to load
  const renderPage = (page) => {
    switch(page) {
      case "welcomePage":
        return <WelcomePage onAddThought={()=>{handleAddThought()}} />;
      case "addThought":
        return <AddThought />;
      default:
        return <WelcomePage onAddThought={()=>{handleAddThought()}} />;
    }
  }

  return (
    <div className="App">
      {renderPage(page)} 
    </div>
  );
}

export default App;
