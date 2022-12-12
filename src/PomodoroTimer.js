import './PomodoroTimer.css';
import React, { Component } from 'react';
import sessionAlarmSound from "./audio-files/percussion7.wav";
import breakAlarmSound from './audio-files/percussion1.mp3';
var myInterval;
class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sessionTimeInSeconds: 25*60,
      breakTimeInSeconds: 5*60,
      breakMessage: '',
      sessionMessage: '',
      sessionMinutes: 25,
      sessionSeconds: '00',
      breakMinutes: '05',
      breakSeconds: '00',
      intervalType: 'session',
      cycleCount: 1,
      staticSessionInSeconds: 25*60,
      staticBreakInSeconds: 5*60,
      isRunning: false,
      cycleSet: 1
     };
  };

  restartCycle = () =>{
    if(this.state.intervalType === 'cycle' && this.state.cycleCount + 1 <= this.state.cycleSet){
      this.setState({
        cycleCount: this.state.cycleCount + 1,
        sessionTimeInSeconds: this.state.staticSessionInSeconds,
        breakTimeInSeconds: this.state.staticBreakInSeconds,
        sessionMessage: '',
        breakMessage: '',
        intervalType: 'session'
      })
    }
    else if(this.state.cycleCount + 1 > this.state.cycleSet){
      this.pause();
      this.setState({
        sessionMessage: 'To exceed cycle #' + this.state.cycleCount +', adjust the cycle setting!'
      })
    }
    else {
      this.pause();
      this.setState({
        sessionMessage: 'There is a bug in restart cycle method'
      })
    }
  }
  startStop = () =>{
    if(this.state.isRunning === true){
      this.pause();
      this.setState({
        isRunning: false
      })
    }
    else if(this.state.isRunning === false){
      this.start();
      this.setState({
        isRunning: true
      })
    }
  }
  start = () =>{
    myInterval = setInterval(() => {
      if(this.state.intervalType === 'session'){
        // >= 10 : >= 10
        if(parseInt(this.state.sessionTimeInSeconds)-1 >= 600 && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 >= 10){
          this.setState({
            sessionTimeInSeconds: this.state.sessionTimeInSeconds - 1,
            sessionMinutes: parseInt((parseInt(this.state.sessionTimeInSeconds)-1) / 60),
            sessionSeconds: (parseInt(this.state.sessionTimeInSeconds) -1) % 60,
            breakMessage: '',
            sessionMessage: ''
          })
        }
        // < 10 : >= 10
        else if(parseInt(this.state.sessionTimeInSeconds)-1 < 600 && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 >=10){
          this.setState({
            sessionTimeInSeconds: this.state.sessionTimeInSeconds - 1,
            sessionMinutes: '0' + parseInt((parseInt(this.state.sessionTimeInSeconds)-1) / 60),
            sessionSeconds: (parseInt(parseInt(this.state.sessionTimeInSeconds)-1) % 60),
            breakMessage: '',
            sessionMessage: ''
          })          
        }
        // >= 10 : < 10
        else if(parseInt(this.state.sessionTimeInSeconds)-1 >= 600
         && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 < 10 
         && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 >= 0){
          this.setState({
            sessionTimeInSeconds: this.state.sessionTimeInSeconds - 1,
            sessionMinutes: parseInt((parseInt(this.state.sessionTimeInSeconds)-1) / 60),
            sessionSeconds: '0' + parseInt(parseInt(this.state.sessionTimeInSeconds)-1) % 60,
            breakMessage: '',
            sessionMessage: ''
          })
        }
        // < 10 : (0-9)
        else if(parseInt(this.state.sessionTimeInSeconds)-1 < 600 
        && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 < 10 
        && (parseInt(this.state.sessionTimeInSeconds)-1) % 60 >= 0 
        && parseInt(this.state.sessionTimeInSeconds)> 1){
          this.setState({
            sessionTimeInSeconds: this.state.sessionTimeInSeconds -1,
            sessionMinutes: '0' + parseInt((parseInt(this.state.sessionTimeInSeconds)-1) / 60),
            sessionSeconds: '0' + parseInt(parseInt(this.state.sessionTimeInSeconds)-1) % 60,
            breakMessage: '',
            sessionMessage: ''
          })
        }
        else if(this.state.sessionTimeInSeconds === 1){
          this.setState({
            sessionTimeInSeconds: 0,
            sessionMinutes: '00',
            sessionSeconds: '00',
            intervalType: 'break',
            sessionMessage: 'Session Completed',
          })
        }
      }   
      else if(this.state.intervalType === 'break'){
      // >= 10 : >= 10
        if(parseInt(this.state.breakTimeInSeconds)-1 >= 600 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 >= 10){
          this.setState({
            breakTimeInSeconds: this.state.breakTimeInSeconds - 1,
            breakMinutes: parseInt((parseInt(this.state.breakTimeInSeconds)-1) / 60),
            breakSeconds: ((parseInt(this.state.breakTimeInSeconds) -1) % 60),
            sessionMessage: '',
            breakMessage: ''
          })
        }
        // < 10 : >= 10
        else if(parseInt(this.state.breakTimeInSeconds)-1 < 600 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 >=10){
          this.setState({
          breakTimeInSeconds: this.state.breakTimeInSeconds - 1,
          breakMinutes: '0' + parseInt((parseInt(this.state.breakTimeInSeconds)-1) / 60),
          breakSeconds: (parseInt(parseInt(this.state.breakTimeInSeconds)-1) % 60),
          sessionMessage: '',
          breakMessage: ''
          })          
        }
        // >= 10 : < 10
        else if(parseInt(this.state.breakTimeInSeconds)-1 >= 600 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 < 10 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 >= 0){
          this.setState({
            breakTimeInSeconds: this.state.breakTimeInSeconds - 1,
            breakMinutes: parseInt((parseInt(this.state.breakTimeInSeconds)-1) / 60),
            breakSeconds: '0' + parseInt(parseInt(this.state.breakTimeInSeconds)-1) % 60,
            sessionMessage: '',
            breakMessage: ''
          })
        } 
        // < 10 : < 10
        else if(parseInt(this.state.breakTimeInSeconds)-1 < 600 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 < 10 
        && (parseInt(this.state.breakTimeInSeconds)-1) % 60 >= 0 
        && parseInt(this.state.breakTimeInSeconds)-1 > 0){
          this.setState({
            breakTimeInSeconds: this.state.breakTimeInSeconds -1,
            breakMinutes: '0' + parseInt((parseInt(this.state.breakTimeInSeconds)-1) / 60),
            breakSeconds: '0' + parseInt(parseInt(this.state.breakTimeInSeconds)-1) % 60,
            sessionMessage: '',
            breakMessage: ''
          })
        }
        else if(parseInt(this.state.breakTimeInSeconds)-1 === 0 
        && this.state.sessionTimeInSeconds === 0){
          this.setState({
            breakTimeInSeconds: this.state.breakTimeInSeconds -1,
            intervalType: 'cycle',
            breakMessage: 'Break Completed',
            breakMinutes: '00',
            breakSeconds: '00',
          })
        }
      } 
      else if(this.state.intervalType === 'cycle'){
        this.restartCycle();
      }
    }, 1000);
  };

  pause = () =>{
    clearInterval(myInterval)
  };

  reset = () =>{
    this.setState({
      sessionTimeInSeconds: 25*60,
      breakTimeInSeconds: 5*60,
      breakMessage: '',
      sessionMessage: '',
      sessionMinutes: 25,
      sessionSeconds: '00',
      breakMinutes: '05',
      breakSeconds: '00',
      intervalType: 'session',
      cycleCount: 1,
      staticSessionInSeconds: 25*60,
      staticBreakInSeconds: 5*60,
      isRunning: false,
      cycleSet: 1
    })
    this.pause();
    document.getElementsByClassName('sessionAlarm')[0].load();
    document.getElementsByClassName('breakAlarm')[0].load();
  }
  sessionUp = () =>{
    if(parseInt(this.state.sessionMinutes) + 1 >= 10 
    && parseInt(this.state.sessionMinutes)+ 1 < 61){
      this.setState({
        sessionMinutes: parseInt(this.state.sessionMinutes) + 1,
        sessionTimeInSeconds: (parseInt(this.state.sessionMinutes) + 1)* 60,
        sessionMessage: '',
        staticSessionInSeconds: (parseInt(this.state.sessionMinutes) + 1)* 60
      })
    }
    else if(parseInt(this.state.sessionMinutes) + 1 > 0 
    && parseInt(this.state.sessionMinutes) + 1 < 10){
      this.setState({
        sessionMinutes: ('0' + (parseInt(this.state.sessionMinutes) + 1).toString()),
        sessionTimeInSeconds: (parseInt(this.state.sessionMinutes) + 1) * 60,
        sessionMessage: '',
        staticSessionInSeconds: (parseInt(this.state.sessionMinutes) + 1) * 60
      })
    }
  else this.setState({
    sessionMessage: 'The maximum session time is 60 minutes!'
  })
  };
  sessionDown = () =>{
    if(parseInt(this.state.sessionMinutes) -1 > 0 
    && parseInt(this.state.sessionMinutes) -1 < 10){
      this.setState({
        sessionMinutes: '0' + ((parseInt(this.state.sessionMinutes) - 1).toString()),
        sessionTimeInSeconds: (parseInt(this.state.sessionMinutes) - 1) * 60,
        sessionMessage: '',
        staticSessionInSeconds: (parseInt(this.state.sessionMinutes) - 1) * 60
      })
    }
    else if(parseInt(this.state.sessionMinutes)-1 >= 10 
    && parseInt(this.state.sessionMinutes)-1 < 60){
      this.setState({
        sessionMinutes: parseInt(this.state.sessionMinutes) - 1,
        sessionTimeInSeconds: (parseInt(this.state.sessionMinutes) -1) * 60,
        sessionMessage: '',
        staticSessionInSeconds: (parseInt(this.state.sessionMinutes) -1) * 60
      })
    }
    else this.setState({
      sessionMessage: 'The minimum session time is 1 minute!'
    })
  };

  breakUp = () =>{
    if(parseInt(this.state.breakMinutes) + 1 >= 10 && parseInt(this.state.breakMinutes) + 1 < 61){
      this.setState({
        breakMinutes: parseInt(this.state.breakMinutes) + 1,
        breakTimeInSeconds: (parseInt(this.state.breakMinutes) + 1) * 60,
        breakMessage: '' ,
        staticBreakInSeconds: (parseInt(this.state.breakMinutes) + 1) * 60     
      })
    }
    else if(parseInt(this.state.breakMinutes) + 1 > 0 && parseInt(this.state.breakMinutes) + 1 < 10){
      this.setState({
        breakMinutes: '0' + ((parseInt(this.state.breakMinutes) + 1).toString()),
        breakTimeInSeconds: (parseInt(this.state.breakMinutes) + 1) * 60,
        breakMessage: '',
        staticBreakInSeconds: (parseInt(this.state.breakMinutes) + 1) * 60
      })
    }
    else this.setState({
      breakMessage: 'The maximum break time is 60 minutes!'
    });
  };

  breakDown = () =>{
    if(parseInt(this.state.breakMinutes) -1 >= 10 && parseInt(this.state.breakMinutes) -1 < 60){
      this.setState({
        breakMinutes: parseInt(this.state.breakMinutes) -1,
        breakTimeInSeconds: (parseInt(this.state.breakMinutes) -1) * 60,
        breakMessage: '',
        staticBreakInSeconds: (parseInt(this.state.breakMinutes) -1) * 60
      })
    } 
    else if(parseInt(this.state.breakMinutes) -1 > 0 && parseInt(this.state.breakMinutes) -1 < 10){
      this.setState({
        breakMinutes: '0' + ((parseInt(this.state.breakMinutes)-1).toString()),
        breakTimeInSeconds: (parseInt(this.state.breakMinutes)-1) * 60,
        breakMessage: '',
        staticBreakInSeconds: (parseInt(this.state.breakMinutes)-1) * 60
      })
    }
    else this.setState({
      breakMessage: 'The minimum break time is 1 minute!'
    })
  }; 
  cycleUp = () =>{
    if(this.state.cycleSet <= 9 && this.state.cycleSet > 0){
      this.setState({
        cycleSet: this.state.cycleSet + 1
      })
    }
    else return
  };
  cycleDown = () =>{
    if(this.state.cycleSet <=10 && this.state.cycleSet > 1){
      this.setState({
        cycleSet: this.state.cycleSet -1
      })
    }
    else return
  }
  componentDidUpdate() {
    console.log(this.state.sessionTimeInSeconds, this.state.breakTimeInSeconds, this.state.cycleCount, this.state.sessionMessage, this.state.breakMessage);
    if(this.state.sessionMessage === 'Session Completed'){
      const sessionAudio = document.getElementsByClassName('sessionAlarm')[0];
      sessionAudio.play();
    }
    else if(this.state.breakMessage === 'Break Completed'){
      const breakAudio = document.getElementsByClassName('breakAlarm')[0];
      breakAudio.play();
    } 
  }
  render() {
    if(this.state.intervalType === 'session'){
    return ( <>
    <div className='container'>
      <h1>Pomodoro Clock</h1>
      <div className='settings'>Settings:</div>
      <div className='cycle-container'> 
      <div className='cycle_style'>Cycle(s): {this.state.cycleSet}</div>
      <div className='button-container'>
        <button onClick={this.cycleUp} className='upCycle'>+</button>
        <button onClick={this.cycleDown} className ='downCycle'>-</button>  
      </div>
      </div>
      
      <div className='session-container'>
        <div className='session-box'>Session: {parseInt(this.state.staticSessionInSeconds / 60)} Minutes</div>
        <div className='button-container'>
        <button onClick={this.sessionUp} className='sessionUp'>+</button>
        <button onClick={this.sessionDown} className='sessionDown'>-</button>
      </div>
      </div>
      <div className='break-container'>
      <div className='break-box'>Break: {parseInt(this.state.staticBreakInSeconds / 60)} Minutes</div>
      <div className='button-container'>
      <button onClick={this.breakUp} className='breakUp'>+</button>
      <button onClick={this.breakDown} className='breakDown'>-</button>
      </div>
      </div>
{/* Conditional piece */}
      <div className='session-screen'>{this.state.sessionMinutes} : {this.state.sessionSeconds}</div>
      <div>{this.state.sessionMessage}</div>
      <div>{this.state.breakMessage}</div>
{/* Conditional piece */}
      <span>
      <button onClick={this.startStop} className='startStop'>Start / Stop</button>
      <button onClick={this.reset} className='reset'>Reset</button>
      </span>

    </div>
    <footer>Developed by Jeff McCormick</footer>
    <audio className='breakAlarm'><source src= {breakAlarmSound}></source></audio>
    <audio className='sessionAlarm'><source src= {sessionAlarmSound}></source></audio>
    </> );
  }
  else if(this.state.intervalType === 'cycle' || this.state.intervalType === 'break'){
    return (
      <>
    <div className='container'>
      <h1>Pomodoro Clock</h1>
      <div className='settings'>Settings:</div>
      <div className='cycle-container'>
      <div className='cycle_style'>Cycle(s): {this.state.cycleSet}</div>
      <div className='button-container'>
        <button onClick={this.cycleUp} className='upCycle'>+</button>
        <button onClick={this.cycleDown} className ='downCycle'>-</button>  
      </div>
      </div>
      
      <div className='session-container'>
        <div className='session-box'>Session: {parseInt(this.state.staticSessionInSeconds / 60)} Minutes</div>
        <div className='button-container'>
        <button onClick={this.sessionUp} className='sessionUp'>+</button>
        <button onClick={this.sessionDown} className='sessionDown'>-</button>
      </div>
      </div>
      <div className='break-container'>
      <div className='break-box'>Break: {parseInt(this.state.staticBreakInSeconds / 60)} Minutes</div>
      <div className='button-container'>
      <button onClick={this.breakUp} className='breakUp'>+</button>
      <button onClick={this.breakDown} className='breakDown'>-</button>
      </div>
      </div>
      
{/* Conditional Piece */}
      <div className='break-screen'>{this.state.breakMinutes} : {this.state.breakSeconds}</div>
      <div>{this.state.sessionMessage}</div>
      <div>{this.state.breakMessage}</div>
{/* Conditional Piece */}
      <span>
      <button onClick={this.startStop} className='startStop'>Start / Stop</button>
      <button onClick={this.reset} className='reset'>Reset</button>
      </span>
    
    </div>
    <footer>Developed by Jeff McCormick</footer>
    <audio className='breakAlarm'><source src= {breakAlarmSound}></source></audio>
    <audio className='sessionAlarm'><source src= {sessionAlarmSound}></source></audio>
      </>
    )
  }
}
}
 
export default PomodoroTimer ;