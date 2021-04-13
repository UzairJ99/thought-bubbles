import React from 'react';
import {Link} from "react-router-dom";
// components
import LogoHeader from './LogoHeader';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
import '../stylesheets/AddThought.css';
// images
import sad from '../images/emotion faces/sad face.png';
import depressed from '../images/emotion faces/depressed face.png';
import mad from '../images/emotion faces/mad.png';
import stressed from '../images/emotion faces/stressed.png';
import happy from '../images/emotion faces/Happy face.png';
import cloudGroup1 from '../images/clouds/cloud group .png';

/*
This component allows a user to enter a new thought.
It walks them through a step by step process where each step is stored in the app's state.
Connects to Firebase to upload a new entry upon completion of the steps.
*/
function AddThought(props) {
  const [step, setStep] = React.useState("stepOne");
  /* holds current entry at the DOM level so that the value of submission is not overwritten when rendering
  different components */
  const [submission, setField] = React.useState({
    'thoughts': "",
    'emotion': "",
    'counterThought': ""
  });

  // emotions
  const emotionList = [sad, depressed, mad, stressed, happy];
  const emotionStringList = ['sad', 'depressed', 'mad', 'stressed', 'happy'];

  /*
  below functions are for saving different user inputs depending on the step.
  each one modifies the state of the application as well as the input field before uploading to the
  database.
  */
 
  // save the information to the submission object
  const saveThought = () => {
    if (document.getElementById("thought").value !== "") {
      submission['thoughts']=document.getElementById("thought").value;
      setField(submission);
      setStep("stepTwo");
    }
  }
  const saveEmotion = () => {
    if (submission['emotion']==="") {
      submission['emotion']='sad' // default to sad, change based on selected emotion
      setField(submission);
    }
    setStep("stepThree");
  }
  const saveCounter = () => {
    if (document.getElementById("counter-thought").value !== "") {
      submission['counterThought']=document.getElementById("counter-thought").value;
      setField(submission);
      setStep("finished");
    }
  }

  const handleUpload = () => {
    // add to database here
    console.log(submission);
  }

  const selectEmotion = (emotion) => {
    for (let emoticon = 0; emoticon < emotionList.length; emoticon++) {
      if (emotionList[emoticon] == emotion) {
        document.getElementById(emotion).style.opacity = 1;
        // change state of submission to reflect selected emotion
        submission['emotion']=emotionStringList[emoticon];
      } else {
        document.getElementById(emotionList[emoticon]).style.opacity = 0.5;
      }
    }
    setField(submission);
  }

  /*
  determine which step component to load
  might be able to refactor this later on to create seperate component jsx files for each step.
  */
  const renderStep = (step) => {
    switch(step) {
      case "stepTwo":
        return (
          <Card.Body>
            <h2><strong>How Did That Make You Feel?</strong></h2>
            <div id="emotionPanel" style={{display: 'flex', flexWrap: 'wrap'}}>
              {emotionList.map((emotion)=>
              <img alt='emoji' className='emoticon' id={emotion} src={emotion} width='140px' onClick={()=>selectEmotion(emotion)}></img>
              )}
            </div>
            <Button id="nextBtn" onClick={()=>{ saveEmotion() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 2/3</p>
            <Link to='/menu'>
              <Button id="backBtn" variant="primary">Cancel</Button>
            </Link>
          </Card.Body>
        )
      case "stepThree":
        return (
          <Card.Body>
            <h2><strong>What's something positive you thought of today?</strong></h2>
            <p>Something positive that helps you defeat this negative feeling OR something reassuring</p>
            <textarea id="counter-thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveCounter() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 3/3</p>
            <Link to='/menu'>
              <Button id="backBtn" variant="primary">Cancel</Button>
            </Link>
          </Card.Body>
        )
      case "finished":
        return (
          <Card.Body>
            <h2><strong><i style={{marginRight: '10px'}} className="far fa-check-circle"></i>Thought Complete</strong></h2>
            <br></br>
            <p>You can find this thought again in the Search My Mind page.</p>
            <br></br>
            <Link to='/menu'>
              <Button id="finishBtn" onClick={()=>handleUpload()} variant="primary">Finish</Button>
            </Link>
          </Card.Body>
        )
      default:
        return (
          <Card.Body>
            <h2><strong>Add a New Thought</strong></h2>
            <textarea id="thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveThought() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 1/3</p>
            <Link to='/menu'>
              <Button id="backBtn" variant="primary">Cancel</Button>
            </Link>
          </Card.Body>
        )
    }
  }

  return (
    <header className="App-header">
      <LogoHeader cloudType='group1' />
      <div style={{display: 'flex', flexWrap: 'wrap', contentAlign: 'center', zIndex: 2}}>
        <Card id="thoughtCard">
          {renderStep(step)}
        </Card>
      </div>
    </header>
  )
}

export default AddThought;