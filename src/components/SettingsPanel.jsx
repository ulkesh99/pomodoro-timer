import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faGear, faClock, faBell } from '@fortawesome/free-solid-svg-icons';

function SettingsPanel({ times, updateTimes }) {

    const initialTimes = {
        pomodoro: parseInt(localStorage.getItem('pomodoro')),
        shortBreak: parseInt(localStorage.getItem('shortBreak')),
        longBreak: parseInt(localStorage.getItem('longBreak')),
    };


    const notifyTunes = [
        { label: 'Bird', value: 'bird' },
        { label: 'Beep', value: 'beep' },
        { label: 'Chime', value: 'chime' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTimes, setNewTimes] = useState(initialTimes);

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTimes({ ...newTimes, [name]: parseInt(value) })
    }

    

    const saveChanges = () => {
        updateTimes(newTimes)
        localStorage.setItem('pomodoro', newTimes.pomodoro);
        localStorage.setItem('shortBreak', newTimes.shortBreak);
        localStorage.setItem('longBreak', newTimes.longBreak);

        closeModal();
    }

    return (
        <>
            <button onClick={openModal} className='absolute top-4 right-4 p-2  mr-2 text-orange-100 bg-[#f5751c] rounded-full  shadow hover:bg-orange-100 hover:text-[#f5751c] transition' title='settings'>
                <FontAwesomeIcon icon={faGear} size='2x' />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-orange-100 p-6 rounded shadow-lg w-96 h-72  overflow-hidden">
                        <div className='flex flex-row justify-between items-center'>
                            <h2 className='text-xl font-bold text-center font-timer uppercase'> Setting</h2>
                            <button
                                onClick={closeModal}
                                className='text-orange-400 bg-orange-100 p-1 rounded-full font-bold'
                            >
                                X
                            </button>
                        </div>
                        <hr className='border-orange-400 my-4' />

                        <div className="timer-header">
                            <p className='uppercase text-black'>
                                <FontAwesomeIcon icon={faClock} />
                                timer
                            </p>
                        </div>

                        <div className='timer'>
                            <h4 className='font-semibold mt-2'>Time (minutes)</h4>
                            <div className='timer-inputs flex flex-row justify-around '>
                                <label className='font-timer mt-1 text-sm ' htmlFor="pomodoro">Pomodoro <br />
                                    <input className='pomodoro mr-2 w-[62px] h-8 rounded-md border-orange-500' type="number" name='pomodoro' value={newTimes.pomodoro} onChange={handleChange} />
                                </label>
                                <label className='font-timer mt-1 text-sm ' htmlFor="">Short Break <br />
                                    <input className='mr-2 w-[62px] bg-orange h-8 rounded-md' type="number" name='shortBreak' value={newTimes.shortBreak} onChange={handleChange} />
                                </label>

                                <label className='font-timer mt-1 text-sm ' htmlFor="">Long Break<br />
                                    <input className='mr-2 w-[62px] h-8 rounded-md' type="number" name='longBreak' value={newTimes.longBreak} onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                        <hr className='border-orange-400 my-4' />

                        

                        <button onClick={saveChanges} className='bg-orange-400 p-2 rounded-lg'>
                            Save
                        </button>


                    </div>
                </div>
            )}
        </>
    )
}

export default SettingsPanel