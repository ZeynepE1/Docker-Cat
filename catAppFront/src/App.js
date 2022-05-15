import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'reactstrap';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
//axios.defaults.headers.common['x-api-key'] = 'DEMO-API-KEY';

class App extends Component {

  constructor(...args) {

    super(...args);
    this.state = {
      images: [],
      breeds: [],
      IPData: [],
      selected_breed: 0
    };
    this.fetchData();

    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
  }

  async fetchData() {
    console.log("çalıştı")
    await axios.get("http://173.249.28.77:5001/get-data", {
      headers: { "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data" }
    }
    ).then(res => {
      this.state.IPData = res.data;
    }).catch(err => {
      console.log(err)
    });
    // console.log("*", data)
    // return data;
  };

  // Trigger the fetchData after the initial render by using the useEffect hook


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
    console.log(this.state.IPData);
    return (
      <div>

        <select className="cat-name" value={this.state.selected_breed}
          onChange={this.onBreedSelectChange}>
          {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
        </select>

        <div className="cat-image-container" >
          {this.state.images.map((image) => <img className="cat-image" alt="" src={image.url}></img>)}
        </div>
        <div className='container text-center'>
          <Table dark>
            <thead>
              <tr>

                <th>
                  IP
                </th>
                <th>
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.IPData.map((element) => {
                  var i = 0;
                  return (
                    <tr>

                      <td>
                        {element.ip}
                      </td>
                      <td>
                        {element.tarih}
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;