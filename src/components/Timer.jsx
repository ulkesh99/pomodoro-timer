import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRedo, faPause } from '@fortawesome/free-solid-svg-icons';

function Timer({ times }) {
  const [time, setTime] = useState(times.pomodoro * 60);
  const [timerState, setTimerState] = useState('stopped'); // 'running', 'paused', 'stopped'
  const intervalRef = useRef(null);

  const playSound = (sound) => {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.play();
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    return `${min} : ${sec}`;
  };

  const handleStart = () => setTimerState('running');
  const handlePause = () => setTimerState('paused');
  const handleReset = () => setTime(times.pomodoro * 60);

  const handleTimerChange = (newTime) => {
    playSound("click");
    setTime(newTime * 60);
    setTimerState('stopped'); // Reset timer state when a new timer is selected
  };

  useEffect(() => {
    if (timerState === 'running' && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      playSound('relaxed');
      setTimerState('stopped');
    }
    return () => clearInterval(intervalRef.current);
  }, [timerState, time]);

  useEffect(() => {
    setTime(times.pomodoro * 60);
  }, [times]);

  return (
    <>
      <div className='flex flex-row'>
        <button 
          onClick={() => handleTimerChange(times.pomodoro)} 
          className='text-lg m-4 font-timer text-black uppercase py-2.5 px-5 rounded-lg border-2 border-[#f5751c] bg-orange-100 shadow-[3px_3px_#f5751c] cursor-pointer my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5'>
          Pomodoro
        </button>
        <button 
          onClick={() => handleTimerChange(times.shortBreak)} 
          className='text-lg m-4 font-timer text-black uppercase py-2.5 px-5 rounded-lg border-2 border-[#f5751c] bg-orange-100 shadow-[3px_3px_#f5751c] cursor-pointer my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5'>
          Short Break
        </button>
        <button 
          onClick={() => handleTimerChange(times.longBreak)} 
          className='text-lg m-4 font-timer text-black uppercase py-2.5 px-5 rounded-lg border-2 border-[#f5751c] bg-orange-100 shadow-[3px_3px_#f5751c] cursor-pointer my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5'>
          Long Break
        </button>
      </div>

      <div>
        <h1 className='text-9xl text-orange-500 font-timer'>{formatTime()}</h1><br />
      </div>

      <div className='flex flex-row'>
        <button
          onClick={() => {
            if (timerState === 'stopped' || timerState === 'paused') handleStart();
            else handlePause();
            playSound('click');
          }}
          disabled={time === 0}
          className="m-2 py-2.5 px-4 bg-orange-100 text-orange-500 rounded-full border-2 border-[#f5751c] shadow-[3px_3px_#f5751c] transition cursor-pointer my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={timerState === 'paused' ? 'Resume timer' : 'Pause timer'}
        >
          {timerState === 'running' ? (
            <FontAwesomeIcon icon={faPause} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faPlay} size="lg" />
          )}
        </button>
        <button
          onClick={() => {
            playSound('click');
            handleReset();
          }}
          className='m-2 py-2.5 px-4 bg-orange-100 text-orange-500 rounded-full border-2 border-[#f5751c] shadow-[3px_3px_#f5751c] transition cursor-pointer my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5'
          aria-label="Reset timer"
        >
          <FontAwesomeIcon icon={faRedo} size='lg' />
        </button>
      </div>
    </>
  );
}

export default Timer;
