import React, { useState, useEffect } from 'react'

function RenderFromHere ({callback}) {
  return (
    callback('Render something from callback')
  )
}

export default function GetUsers() {

  const [data, setData] = useState([]);

  const [pageNum, setPageNum] = useState(1);

  async function getResponse (page = 1) {
    const url = `https://randomuser.me/api?=page=${page}`
    let toRender = ''

    try {
      const response = await fetch(url)
      toRender = response.json()
    } catch (error) {
      toRender = error.message
    }
    return toRender
  }

  useEffect(() => {
    getResponse().then((res)=>{
      setData(res.results)
    })
  },[])

function Click ({callback}) {
  return [0, 0].map((cur, idx) => {
    return <button onClick={(e) => {callback(idx)}}>Click button idndex: {idx}</button>
  })
}

function Print (e) {
  console.log(e)
}
  
  return (
    <>
      <RenderFromHere callback={ msg =>
          <div>
            <span>
              {msg}
            </span>
          </div>
        }/>
        {data.map((cur, idx) => {
          return <p key={idx}>{JSON.stringify(cur)}</p>
        })}
        <button onClick={() => {
          getResponse(pageNum + 1).then((res)=>{
            setData(data.concat(res.results))
          })
          setPageNum(pageNum + 1)
        }}>Load more</button>
        <Click callback={(e) => {Print(e)}}></Click>
    </>
  )
}