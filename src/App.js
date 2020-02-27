//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(0);
  const [timer, setTimer] = useState('12:00');

  useEffect(() => {
    let duration = 720, minutes, seconds;
    //let tempDuration;
    let timeCount = null;

    document.querySelector('.reset').addEventListener('click', () => {
        duration = 720;
        setTimer('12:00');
        //console.log(duration);
        clearInterval(timeCount);
    });

    document.querySelector('.stop').addEventListener('click', () => {
        //tempDuration = duration;
        clearInterval(timeCount);
    });

    document.querySelector('.start').addEventListener('click', () => {
        timeCount = setInterval(() => {
            
            minutes = parseInt(duration / 60, 10);
            seconds = parseInt(duration % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            duration--;
            setTimer(minutes.toString()+':'+seconds.toString());
            
            if (duration < 0) {
                setTimer('00:00');
            }
    
        }, 1000);
    });

    return () => clearInterval(timeCount);
  }, []);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{timer}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow down={down} quarter={quarter} toGo={toGo} ballOn={ballOn}/>
      </section>
      <section className="buttons">
        <div className="timerButtons">
            <p className="headtag">Timer</p>
            <button className="start">Start</button>
            <button className="stop">Stop</button>
            <button className="reset">Reset</button>
        </div>
        <div className="quarterS">
            <p className="headtag">Quarter</p>
            <button onClick={ (e) => { setQuarter(e.target.getAttribute('data-q')) }} data-q="1">1</button>
            <button onClick={ (e) => { setQuarter(e.target.getAttribute('data-q')) }} data-q="2">2</button>
            <button onClick={ (e) => { setQuarter(e.target.getAttribute('data-q')) }} data-q="3">3</button>
            <button onClick={ (e) => { setQuarter(e.target.getAttribute('data-q')) }} data-q="4">4</button>
        </div>
        <div className="downS">
            <p className="headtag">Down</p>
            <button onClick={ (e) => { setDown(e.target.getAttribute('data-d')) }} data-d="1">1</button>
            <button onClick={ (e) => { setDown(e.target.getAttribute('data-d')) }} data-d="2">2</button>
            <button onClick={ (e) => { setDown(e.target.getAttribute('data-d')) }} data-d="3">3</button>
            <button onClick={ (e) => { setDown(e.target.getAttribute('data-d')) }} data-d="4">4</button>
            <p className="headtag no-width">Ball on</p>
            <form>
                <input type="text" value={ballOn} 
                onChange={(e) => { setBallOn(e.target.value); }} 
                onBlur={(e) => { setBallOn(e.target.value); }} 
                    className="ball__on"/>
            </form>
            <p className="headtag no-width">To Go</p>
            <form>
                <input type="text" value={toGo} 
                onChange={(e) => { setToGo(e.target.value); }} 
                onBlur={(e) => { setToGo(e.target.value); }} 
                    className="to__go"/>
            </form>
        </div>
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <p className="headtag">Home</p>
          <button className="homeButtons__touchdown" onClick={ () => { setHomeScore(homeScore+6); }}>Touchdown</button>
          <button className="homeButtons__touchdown" onClick={ () => { setHomeScore(homeScore+3); }}>Field Goal+3</button>
          <button className="homeButtons__touchdown" onClick={ () => { setHomeScore(homeScore+2); }}>Field Goal+2</button>
          <button className="homeButtons__fieldGoal" onClick={ () => { setHomeScore(homeScore+1); }}>Field Goal+1</button>
          <button className="resetButtons" onClick={ () => { setHomeScore(0); }}>Reset</button>
        </div>
        <div className="awayButtons">
          <p className="headtag">Away</p>
          <button className="awayButtons__touchdown" onClick={ () => { setAwayScore(awayScore+6); }}>Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={ () => { setAwayScore(awayScore+3); }}>Field Goal+3</button>
          <button className="awayButtons__fieldGoal" onClick={ () => { setAwayScore(awayScore+2); }}>Field Goal+2</button>
          <button className="awayButtons__fieldGoal" onClick={ () => { setAwayScore(awayScore+1); }}>Field Goal+1</button>
          <button className="resetButtons" onClick={ () => { setAwayScore(0); }}>Reset</button>
        </div>
      </section>
    </div>
  );
}

export default App;