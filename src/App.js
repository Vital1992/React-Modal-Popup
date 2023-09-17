import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useNavigate, Route, Routes } from 'react-router-dom';
import MessageModule from './message';
import GetUsers from './getUsers';
import TicTac from './game/ticTac';
import TicTacComputer from './game/ticTacComputer';


export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={()=>{ navigate("/"); }}>Go to Home</button>
      <button onClick={()=>{ navigate("/getUsers"); }}>Go to Get Users example</button>
      <button onClick={()=>{ navigate("/game"); }}>Play Tic Tac Toe</button>
      <button onClick={()=>{ navigate("/gameWithComputer"); }}>Play Tic Tac Toe With Computer</button>
      <Routes>
        <Route path={"/"} element={<MessageModule />} />
        <Route path={"/getUsers"} element={<GetUsers />} />
        <Route path={"/game"} element={<TicTac />} />
        <Route path={"/gameWithComputer"} element={<TicTacComputer />} />
      </Routes>
    </div>
  )
}
