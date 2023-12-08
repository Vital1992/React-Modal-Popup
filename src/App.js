import React, { useState, useEffect } from "react";

// Requirements:
//     1. On the initial page load, it should display the current trending gifs (limit 10).
//     2. User can type a search keyword in a search field at the top of the page, which then displays the searched gifs.
//     3. Clearing the search field should show the trending gifs again.
//     4. Styling and layout do not matter that much, and there is no need to make it look exactly like Giphy, but it should be mobile and desktop friendly.
//     5. Share your screen and try to only interact with the screen you are sharing.
//     6. Think about this like a hack project, how do you solve it the fastest way possible, while keeping it somewhat maintainable?
//     7. Try to explain the steps you are taking and why, why did you decide to create a specific function? Why do A instead of B? etc

// Use this API key: F2Xrk2P2FnKXYSmEUdEzMHbVF1b6up6A

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const gifContainer = {
    padding: "30px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
  };

  async function getTrending() {
    const url =
      "https://api.giphy.com/v1/gifs/trending?api_key=F2Xrk2P2FnKXYSmEUdEzMHbVF1b6up6A&limit=10";
    let toRender = "";

    try {
      const response = await fetch(url);
      toRender = response.json();
    } catch (error) {
      toRender = error;
    }
    return toRender;
  }

  async function getByQuery(input) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=F2Xrk2P2FnKXYSmEUdEzMHbVF1b6up6A&q=${input}&limit=10`;
    let toRender = "";

    try {
      const response = await fetch(url);
      toRender = response.json();
    } catch (error) {
      toRender = error;
    }
    return toRender;
  }

  async function searchGif(input) {
    getByQuery(input).then((res) => {
      setData(res.data);
    });
  }

  useEffect(() => {
    getTrending().then((res) => {
      console.log(res);
      setData(res.data);
      //embed_url is the gif url
    });
  }, []);

  useEffect(() => {
    console.log(input);
    if (input === "") {
      getTrending().then((res) => {
        console.log(res);
        setData(res.data);
      });
    }
  }, [input]);

  function updateInput(e) {
    const val = e.target.value;
    setInput(val);
  }

  return (
    <div>
      <h1>Trending gifs:</h1>
      <div style={gifContainer}>
        {data.map((cur, idx) => {
          return (
            <iframe
              src={cur.embed_url}
              width="150"
              height="150"
              frameBorder="0"
              allowFullScreen
              title="Animated GIF"
              key={idx}
            ></iframe>
          );
        })}
      </div>
      <p>Search for gif</p>
      <input onChange={(e) => updateInput(e)}></input>
      <button onClick={() => searchGif(input)}>Search</button>
    </div>
  );
}
