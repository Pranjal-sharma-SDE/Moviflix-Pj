import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from "./screen/Home";
import Fav from "./screen/Fav";
import MovieInfo from "./screen/MovieInfo";
import Nav from "./component/Navbar";
import { RecoilRoot } from "recoil";
import Search from "./screen/Search";


function App() {

  return (
    <RecoilRoot>
    <div className="App">
     <Router>
      <Routes>
      <Route exact path="/" element={<><Nav/><Home/></>} />
      <Route path="/favorite" element={<><Nav/><Fav/></>} />
      <Route path="/movieinfo" element={<><Nav/><MovieInfo/></>} />
      <Route path="/search" element={<><Nav/><Search/></>} />
      </Routes>
     </Router>
    </div>
    </RecoilRoot>
  );
}

export default App;
