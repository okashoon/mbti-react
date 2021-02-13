import React, {useEffect, useState} from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Results from './components/Results'
import quizStore from './Stores/QuizStore'
import { observer } from "mobx-react-lite"
import 'antd/dist/antd.css';


function App() {
  //normally we'd use a router and write our routes here


  useEffect(()=>{quizStore.loadQuestions()},[])
  let [route,setRoute] = useState("quiz")
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        
      {/* </header> */}
      {route == "quiz"?
        <Quiz routeTo={setRoute} quizStore={quizStore}/>:
        <Results routeTo={setRoute} quizStore={quizStore}/>
      }
    </div>
  );
}

export default observer(App);
