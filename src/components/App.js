import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  handleChangeType = type => {
    this.setState({filters: {type: type}})
  }
  handleFindPetsClick = () => {
    let url = (this.state.filters.type === 'all' ? '' : `?type=${this.state.filters.type}`)
    fetch(`/api/pets${url}`).then(r => r.json()).then(pets => this.setState({pets: pets}))
  }
  handleAdoptPet = id => {
    this.setState(prev => ({pets: prev.pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet)}))
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
