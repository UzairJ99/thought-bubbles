// dependencies
import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import WelcomePage from './WelcomePage';
import AddThought from './AddThought';

function App() {
  const [page, setPage] = React.useState("welcomePage");

  // go to add thought page
  const handleAddThought = () => {
    setPage("addThought");
  }

  // go back to welcome page
  const handleBack = () => {
    setPage("welcomePage");
  }

  // determine which component to load
  const renderPage = (page) => {
    switch(page) {
      case "welcomePage":
        return <WelcomePage 
                  onAddThought={()=>{handleAddThought()}}
                  onBack={()=>{handleBack()}}
                />;
      case "addThought":
        return <AddThought onBack={()=>{handleBack()}} />;
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
