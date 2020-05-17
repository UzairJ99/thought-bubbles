import React from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/SearchMyMind.css';
// components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchMyMind = () => {
  const thoughtList = [];

  return (
    <header className="App-header">
      <h1 className="heading"><strong>Thought Bubbles</strong></h1>
      <h1>Search My Mind</h1>
      <InputGroup className="mb-3" id="searchBar">
        <FormControl
          id="searchBox"
          placeholder="Search for a thought by emotion or keyword"
          aria-label="Search Field"
          aria-describedby="search-field"
        />
      </InputGroup>

      <Card id="thoughtsPanel">
      {/* thought cards go here */}
      </Card>
    </header>
  )
};

export default SearchMyMind;