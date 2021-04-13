import React from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/SearchMyMind.css';
// components
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import LogoHeader from './LogoHeader';

/*
This component renders search results from previous entries of thoughts.
Connects to Firebase to pull requested data.
Can be fitered using text or emotion.
State of application is based on search bar entry.
Thoughts can also be deleted from here (still need to implement this).
*/
const SearchMyMind = () => {
  // search term
  const [searchWord, setSearch] = React.useState("");

  // sample data - replace with real data from user
  const thoughtList = [
    {
      emotion: 'sad',
      thought: 'blah blah blah blah blah',
      counter: 'i dunno'
    },
    {
      emotion: 'happy',
      thought: 'wwwoooooahhhhhhhhh',
      counter: 'hahhahah'
    }
  ];

  /*
  dictionary for mapping emotions to emojis for display at top corner of each thought bubble.
  Will be smaller emoji versions of the addThought panel.
  */
  const emojis = {
    sad: '', // replace value with image like { Sad } from import
    angry: '',
    anxious: '',
    envious: '',
    stressed: ''
  }

  return (
    <header className="App-header">
      <LogoHeader cloudType='group1'/>
      <h1>Search My Mind</h1>
      <InputGroup className="mb-3" id="searchBar">
        <FormControl
          id="searchBox"
          placeholder="Search for a thought by emotion or keyword"
          aria-label="Search Field"
          aria-describedby="search-field"
          onChange={()=> {
            // update search state
            let newSearch = document.getElementById("searchBox").value;
            setSearch(newSearch);
          }}
        />
      </InputGroup>

      <div id="thoughtsPanel">
      {
        // display filtered results
        thoughtList.filter((bubble) => {
          if (bubble.emotion.includes(searchWord) || (searchWord === "")) {
            return bubble;
          } else return null; // might take out
        }).map((bubble)=>
          <Card id="thoughtBubble">
            <h4>
              {bubble.emotion}
            </h4>
            {/* need to add delete functionality here */}
            <h5 style={{textAlign:'left', marginLeft: '20px'}}><span role='img'>🤔</span> Thought</h5>
            <p style={{textAlign:'left', marginLeft: '20px'}}> {bubble.thought}</p>
            <h5 style={{textAlign:'left', marginLeft: '20px'}}><span role='img'>😄</span> Counter</h5>
            <p style={{textAlign:'left', marginLeft: '20px'}}> {bubble.counter}</p>
          </Card>
        )
      }
      </div>
    </header>
  )
};

export default SearchMyMind;