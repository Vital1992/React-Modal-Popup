import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LineChart from './chart';

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

function Message () {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }, 2000);

    // To cleanup after previous run
    return () => {
      clearInterval(interval);
    };
  }, []);

// // This one will work too:
// useEffect(() => {
//   const interval = setInterval(() => {
//     setIsVisible(!isVisible);
//   }, 1000);

//   return () => {
//     clearInterval(interval);
//   };
// });

  const spanStyle = {
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'visibility 0.2s ease-in-out'
  };

  return(
    <div>
      <span style={spanStyle}>
        This is a hidden and visible span!
      </span>
    </div>
)}


export default function MessageModule() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
      <Message/>
      <div>
      <h1>Wave Chart Graph</h1>
      <LineChart />
    </div>
    </>
  )
}
