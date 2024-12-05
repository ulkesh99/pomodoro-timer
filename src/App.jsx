import { useEffect, useState } from 'react'
import './App.css'
import Logo from './components/Logo'
// import Settings from './components/Settings'
import SettingsPanel from './components/SettingsPanel'
import Spotifyalbum from './components/Spotifyalbum'
import Timer from './components/Timer'

function App() {

  const [times, setTimes] = useState({
    pomodoro: 20,
    shortBreak : 5,
    longBreak : 15,
  })


  const [soundSettings, setSoundSettings] = useState({
    soundEnabled: JSON.parse(localStorage.getItem('soundEnabled')) || true,
    volume: parseFloat(localStorage.getItem('volume')) || 0.5, // Default 50%
    notifyTune: localStorage.getItem('notifyTune') || 'default',
  });

  //load time from localStorage on mount

  useEffect(() => {
    const savedPomodoro = parseInt(localStorage.getItem('pomodoro')) || 20;
    const savedShortBreak = parseInt(localStorage.getItem('shortBreak')) || 5;
    const savedLongBreak = parseInt(localStorage.getItem('longBreak')) || 10;

    setTimes({
      pomodoro: savedPomodoro,
      shortBreak: savedShortBreak,
      longBreak: savedLongBreak,
    });
  }, []);

  //Function to update the times from SettingsPanel

  const updateTimes = (newTimes) => {
    setTimes(newTimes);
  }


  return (
    <>
      <div className='logo relative h-screen w-screen bg-orange-100'>
        <Logo />

        <div className='flex flex-col justify-center items-center h-full'>
        <Timer times={times} />
        </div>

        <SettingsPanel times={times} updateTimes={updateTimes} />

        <Spotifyalbum />
        
      </div>
      
      

    </>
      
  )
}

export default App
