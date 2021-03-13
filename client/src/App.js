import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './Views/Home';
import AboutUs from './Views/AboutUs';
import Collection from './Views/Collection';
import LogIn from './Views/LogIn';
import SignIn from './Views/SignIn';
import Artists from './Views/Artists';
import ArtPiece from './Views/ArtPiece';
import NavBar from './Components/NavBar';


function App() {
  return (
    <div className="App">
      <Route path="/inicio" component={Home}></Route>
      <Route path="/nosotros" component={AboutUs}></Route>
      <Route path="/colección" exact component={Collection}></Route>
      <Route path="/login" component={LogIn}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/artistas" component={Artists}></Route>
      <Route exact path="/colección/:idArte" render={({match}) => <ArtPiece artName={match.params.idArte}></ArtPiece>}></Route>
    </div>
  );
}

export default App;
