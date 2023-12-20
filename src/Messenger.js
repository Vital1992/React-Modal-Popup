import React, { useState, useEffect } from 'react'

export default function Messenger () {
  let socket = new WebSocket('ws://localhost:8081/api/getMessage')

  const [input, setInput] = useState('')
  const [output, setOutput] = useState([])

  socket.onopen = function () {
    // output.innerHTML += "Status: Connected\n";
    // setOutput([...output, 'Status: Connected'])
  }

  function printOutput (userMsg) {
    socket.onmessage = function (e) {
      setOutput([...output, userMsg, `GPT: ${e.data}`])
      console.log(output)
      console.log(e.data)
    }
  }

  async function btnClick () {
    socket.send(input)
    const userMsg = `Me: ${input}`
    printOutput(userMsg)
    setInput('')
  }

  return (
    <div>
      <h1>Talk to Chat GPT</h1>
      <textarea id='output' value={output.join('\r\n')}></textarea>
      <h1>Enter message</h1>
      <input
        type='text'
        onChange={e => {
          setInput(e.target.value)
        }}
        value={input}
      ></input>
      <button onClick={btnClick}>Send message</button>
    </div>
  )
}
