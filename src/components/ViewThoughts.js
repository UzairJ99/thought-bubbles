import React, {useEffect} from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/SearchMyMind.css';
// components
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import LogoHeader from './LogoHeader';
// images
import * as IMAGES from '../constants/images';
// back end
import {withFirebase} from './Firebase/index';
import * as ROUTES from '../constants/routes';
import {withRouter} from 'react-router-dom';

/*
This component renders search results from previous entries of thoughts.
Connects to Firebase to pull requested data.
Can be filtered using text or emotion.
State of application is based on search bar entry.
Thoughts can also be deleted from here (still need to implement this).
*/
const ViewThoughts = (props) => {
  // search term
  const [searchWord, setSearch] = React.useState("");
  const [authUser, setAuthUser] = React.useState(props.authUser);
  const initialList = [
    {
      thoughts: '',
      emotion: '',
      counterThought: ''
    }
  ];
  const [thoughtList, setThoughtList] = React.useState(initialList);
  
  // check for change in user - force log out if user becomes null
  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser({ authUser })
        : setAuthUser({ authUser: null });
    });

    if (authUser === null) {
      props.history.push(ROUTES.SIGNIN);
    } else {
      // only pull data on component mount and if the user is logged in
      getThoughts();
    }
  }, []);

  const user = authUser ? props.authUser.authUser.email : null;

  // pull data from database
  const getThoughts = () => {
    props.firebase.getThoughts(user)
    .then((query) => {
      let data = [];
      query.forEach((doc) => {
        data.push(doc.data());
      })
      console.log(data);
      setThoughtList(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  

  /*
  dictionary for mapping emotions to emojis for display at top corner of each thought bubble.
  Will be smaller emoji versions of the addThought panel.
  */
  const emojis = {
    sad: IMAGES.sad,
    mad: IMAGES.mad,
    depressed: IMAGES.depressed,
    happy: IMAGES.happy,
    stressed: IMAGES.stressed
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
          // conditions for searching
          const cond1 = bubble.emotion.includes(searchWord);
          const cond2 = bubble.thoughts.includes(searchWord);
          const cond3 = bubble.counterThought.includes(searchWord);

          if (cond1 || cond2 || cond3 || (searchWord === "")) {
            return bubble;
          } else return null; // might take out
        }).map((bubble)=>
          <Card id="thoughtBubble">
            {/* emoji for top left corner to depict thought bubble */}
            <img 
                src={emojis[bubble.emotion]} 
                style={{width:'64px', float:'left', marginLeft:'-32px', marginTop:'-32px', zIndex: 1}}>
            </img>
            {/* heading for emotion card */}
            <h4 style={{marginTop: '-32px'}}>
              {bubble.emotion}
            </h4>
            <p></p>
            {/* need to add delete functionality here */}
            <h5 style={{textAlign:'left', marginLeft: '20px'}}><span role='img'>🤔</span> Thought</h5>
            <p style={{textAlign:'left', marginLeft: '20px'}}> {bubble.thoughts}</p>
            <h5 style={{textAlign:'left', marginLeft: '20px'}}><span role='img'>😄</span> Counter</h5>
            <p style={{textAlign:'left', marginLeft: '20px'}}> {bubble.counterThought}</p>
          </Card>
        )
      }
      </div>
    </header>
  )
};

const SearchMyMind = withRouter(withFirebase(ViewThoughts));

export default ViewThoughts;
export {SearchMyMind}