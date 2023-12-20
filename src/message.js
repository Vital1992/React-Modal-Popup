import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Modal from './Modal'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LineChart from './chart'

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
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }, 2000)

    // To cleanup after previous run
    return () => {
      clearInterval(interval)
    }
  }, [])

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
  }

  return (
    <div>
      <span style={spanStyle}>This is a hidden and visible span!</span>
    </div>
  )
}

export default function MessageModule () {
  const [isOpen, setIsOpen] = useState(false)
  const [nums, setNums] = useState([])
  // const [magicNum, setMagicNum] = useState([])
  const [count, setCount] = useState(1)
  
  // Start of useMemo example:
  const increaseCounter = () => {
    setCount(count + 1)
  }

  const addRandom = () => {
    let randNum = parseInt(Math.random() * 1000, 10)
    setNums([...nums, randNum])
  }

  // useEffect(() => {
  //   setMagicNum(calculateMagicNumber(count))
  // }, [count])
  // If we use above useEffect to replace useMemo then "render" log will be executed after useEffect
  // because useEffect runs asynchronously  after render and then triggers another render,
  // while useMemo runs synchronously during rendering so "render" console will be printed once
  console.log("render")
  const magicNum = useMemo(() => calculateMagicNumber(count), [count]);
  // End of useMemo exmaple
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
      <Message />
      <div>
        <h1>Wave Chart Graph</h1>
        <LineChart />
      </div>
      <div>
        <div>
          Counter: {count} | Magic number: {magicNum} &nbsp;
          <button onClick={increaseCounter}>+</button>
        </div>
        <hr />
        <div>
          <ul>
            {nums.map((num, i) => (
              <li key={i}>{num}</li>
            ))}
          </ul>
          <button onClick={addRandom}>Add random</button>
        </div>
      </div>
    </>
  )
}

function calculateMagicNumber (n) {
  console.log('Costly calculation triggered.')
  let num = 1
  for (let i = 0; i < n + 1000000000; i++) {
    num += 123000
  }
  return parseInt(num - num * 0.22, 10)
}
