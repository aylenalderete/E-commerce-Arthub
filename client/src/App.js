import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './Views/Home/Home.jsx';
import AboutUs from './Views/AboutUs/AboutUs.jsx';
import Collection from './Views/Collection/Collection.jsx';
import LogIn from './Views/LogIn/LogIn.jsx';
import SignIn from './Views/SignIn/SignIn.jsx';
import Artists from './Views/Artists/Artists.jsx';
import ArtPiece from './Views/ArtPiece/ArtPiece.jsx';

import ArtistAdminDashboard from './Views/ArtistAdmin/ArtistAdminDashboard.jsx';
import CreateProduct from './Components/CreateProducts/CreateProduct.jsx';
import ArtistProfile from './Views/ArtistProfile/ArtistProfile.jsx';
import AdminUser from './Views/AdminUser/AdminUser.jsx'
import ArtistsProducts from './Views/ArtistsProducts/ArtistsProducts.jsx';
import CreateCategory from './Views/CreateCategory/CreateCategory.jsx';
import EditProduct from './Components/EditProduct/EditProduct.jsx';
import EditCategory from './Views/EditCategories/EditCategories.jsx';
import AllCategories from './Views/AllCategories/AllCategories';


function App() {
  return (
    <div >
      <Route exact path="/" component={Home}></Route>
      <Route path="/nosotros" component={AboutUs}></Route>
      <Route path="/coleccion" exact component={Collection}></Route>
      <Route path="/ingresar" component={LogIn}></Route>
      <Route path="/registrarse" component={SignIn}></Route>
      <Route exact path="/admindashboard" component={ArtistAdminDashboard}></Route>
      <Route exact path="/crearproducto" component= {CreateProduct}></Route> 
      <Route path="/artistas" exact component={Artists}></Route>
      <Route path="/editarproducto/:id" 
      render={({match}) => (
        <EditProduct id={match.params.id}/>
      )}></Route>
      <Route path="/artistas/:artistId" 
      render={({match}) => (
        <ArtistProfile artistId={match.params.artistId}></ArtistProfile>
      )}></Route>
      <Route
        exact
        path="/coleccion/:idArte"
        render={({ match }) => (
          <ArtPiece artId={match.params.idArte}></ArtPiece>
        )}
      ></Route>
      <Route path="/perfiladmin" component={AdminUser}></Route>
      <Route path="/misproductos" component={ArtistsProducts}></Route>
      <Route path="/crearcategorias" component={CreateCategory}></Route>
      <Route path="/editarcategorias" component={EditCategory}></Route>

    </div>
  );
}

export default App;

