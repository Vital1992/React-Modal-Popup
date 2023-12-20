import React, { useState, useEffect } from 'react'

const TEXT_AREA_STYLE = {
  height: '400px',
  width: '90%',
  resize: "none",
  padding: "15px"
}

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export default function Messenger () {
  let socket = new WebSocket('ws://localhost:8081/api/getMessage')

  const [input, setInput] = useState('')
  const [output, setOutput] = useState([])
  const [socketStatus, setSocketStatus] = useState()

  useEffect(() => {
    scroll()
  }, [output])

  socket.onopen = function () {
      setSocketStatus(socket.readyState)
  }

  function scroll(){
    const htmlOutput = document.getElementById("output")
    htmlOutput.scrollTop = htmlOutput.scrollHeight;
  }

  function printOutput (userMsg) {
    if (socketStatus === 1) {
      socket.onmessage = function (e) {
        setOutput([...output, userMsg, `GPT: ${e.data}`])
      }
    } else {
      setOutput([...output, userMsg, `GPT: genereic response`])
    }
  }

  async function btnClick () {
    if (socketStatus === 1) {
      socket.send(input)
    }
    const userMsg = `Me: ${input}`
    printOutput(userMsg)
    setInput('')
  }

  return (
    <div style={CONTAINER_STYLE}>
      <h1>Talk to Chat GPT</h1>
      <textarea style={TEXT_AREA_STYLE} id='output' value={output.join('\r\n')}></textarea>
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
