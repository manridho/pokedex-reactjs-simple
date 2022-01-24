import React from 'react'
import {Switch, Route } from 'react-router-dom'

//import pages
import HomePage from './pages/home'
import PokeList from './pages/PokemonList'
import PokeDetail from './pages/PokemonDetail'

class App extends React.Component {
  render() {
    return (
      <div >
          <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/pokemon-list" component={PokeList}/>         
            <Route path="/pokemon-detail" component={PokeDetail}/>
          </Switch>
      </div>
    );
  }
}

export default App