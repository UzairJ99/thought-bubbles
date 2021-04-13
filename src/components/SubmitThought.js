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
import * as IMAGES from '../constants/images';
// back end
import {withFirebase} from './Firebase/index';
import * as ROUTES from '../constants/routes';
import {withRouter} from 'react-router-dom';

/*
This component allows a user to enter a new thought.
It walks them through a step by step process where each step is stored in the app's state.
Connects to Firebase to upload a new entry upon completion of the steps.
*/
function SubmitThought(props) {
  const [step, setStep] = React.useState("stepOne");
  /* holds current entry at the DOM level so that the value of submission is not overwritten when rendering
  different components */
  const [submission, setField] = React.useState({
    'thoughts': "",
    'emotion': "",
    'counterThought': ""
  });

  // emotions
  const emotionList = [IMAGES.sad, IMAGES.depressed, IMAGES.mad, IMAGES.stressed, IMAGES.happy];
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
    // default to sad, change based on selected emotion
    if (submission['emotion']==="") {
      submission['emotion']='sad' 
      setField(submission);
    }
    // when the user selects a happy emotion, there shouldn't be a counter to it
    if (submission['emotion']==='happy') {
      submission['counterThought']='N/A';
      setField(submission)
      setStep("finished");
    } else {
      setStep("stepThree");
    }
  }
  const saveCounter = () => {
    if (document.getElementById("counter-thought").value !== "") {
      submission['counterThought']=document.getElementById("counter-thought").value;
      setField(submission);
      setStep("finished");
    }
  }

  // add to database here
  const handleUpload = () => {
    // authUser object is kind of weird, contains the structure of authUser.authUser.otherProperties
    let user = props.authUser.authUser.email;
    props.firebase.doUpload(submission, user)
    .then(() => {
      console.log('successfully uploaded to database.');
      props.history.push(ROUTES.WELCOME);
    })
    .catch(error => {
      console.log(error);
    })
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
            <Link to={ROUTES.WELCOME}>
              <Button id="backBtn" variant="primary">Cancel</Button>
            </Link>
          </Card.Body>
        )
      case "stepThree":
        return (
          // this step can be skipped if the user selected the happy emotion
          <Card.Body>
            <h2><strong>What's something positive you thought of today?</strong></h2>
            <p>Something positive that helps you defeat this negative feeling OR something reassuring</p>
            <textarea id="counter-thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveCounter() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 3/3</p>
            <Link to={ROUTES.WELCOME}>
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
            <Link to={ROUTES.WELCOME}>
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
            <Link to={ROUTES.WELCOME}>
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

const AddThought = withRouter(withFirebase(SubmitThought));

export default SubmitThought;
export {AddThought};