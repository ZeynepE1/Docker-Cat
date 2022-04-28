import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
//axios.defaults.headers.common['x-api-key'] = 'DEMO-API-KEY';

class App extends Component {

  async getBreeds() {
    const res = await axios('/breeds');
    return res.data;

  }
  async getCatsImagesByBreed(breed_id, amount) {
    const res = await axios('/images/search?breed_ids=' + breed_id + "&limit=" + amount);


    return res.data;
  }

  async loadBreedImages() {


    let breed_images = await this.getCatsImagesByBreed(this.state.selected_breed, 5)

    this.setState({ images: breed_images });
  }

  constructor(...args) {

    super(...args);
    this.state = {
      images: [],
      breeds: [],
      selected_breed: 0
    };

    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
  }
  async onBreedSelectChange(e) {

    await this.setState({ selected_breed: e.target.value });
    await this.loadBreedImages();
  }
  componentDidMount() {
    if (this.state.breeds.length === 0) {
      (async () => {
        try {
          this.setState({ breeds: await this.getBreeds() });
        } catch (e) {


        }
      })();
    }
  }
  render() {
    return (
      <div>

        <select className="cat-name" value={this.state.selected_breed}
          onChange={this.onBreedSelectChange}>
          {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
        </select>

        <div className="cat-image-container" >
          {this.state.images.map((image) => <img className="cat-image" alt="" src={image.url}></img>)}
        </div>

      </div>
    );
  }
}

export default App;