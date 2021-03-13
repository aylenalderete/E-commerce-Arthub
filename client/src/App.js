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
import ArtistProfile from './Views/ArtistProfile';
import CreateCatgory from './Views/CreateCatgory';

function App() {
  return (
    <div >
      <Route path="/inicio" component={Home}></Route>
      <Route path="/nosotros" component={AboutUs}></Route>
      <Route path="/colección" exact component={Collection}></Route>
      <Route path="/login" component={LogIn}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/artistas" exact component={Artists}></Route>
      <Route path="/artistas/:artistId" 
      render={({match}) => (
        <ArtistProfile artistId={match.params.artistId}></ArtistProfile>
      )}></Route>
      <Route
        exact
        path="/colección/:idArte"
        render={({ match }) => (
          <ArtPiece artId={match.params.idArte}></ArtPiece>
        )}
      ></Route>
      <Route path="/crearCategorías" component={CreateCatgory}></Route>
    </div>
  );
}

export default App;

export default App;
