import React, { Component } from 'react';

import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

import './App.css';

import Profile from './Profile';
import Gallery from "./Gallery";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: null
        }
    }

    search() {
        console.log('this.state', this.state);
        const autho2 = 'BQD_tbrTcoSr5Nx35FB0_Z0YOvOXAme5c8bw7FvmI_bqDNmDq5lHluTxySV8Ve57YFOavVbTGVHV-HkM0o56Am5LbzbC8dPVthzbEJGcCnFy3dH4SwYLp2kmjzn1h6HCB99CMghEeClWVVjPoSxRywEndzSJuu7jRVns0zjRvM_jF3LioXzQTcu1F8ugphpET2nGfYDMbpA-T1z7oDfGwB1XelpLH3jR7fB4JxbwjS9OBKblJRoMruAnzsSPQ3EqLwq8ChLuEHOVT-9uBQ3tPTsNkg_rnQ';
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL =  'https://api.spotify.com/v1/artists';
        fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    "Accept": 'Application/json',
                    "Authorization": `Bearer ${autho2}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const artist = data.artists.items[0];
                this.setState({artist});

                FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
                fetch(FETCH_URL, {
                    method: 'GET',
                    headers: {
                        "Accept": 'Application/json',
                        "Authorization": `Bearer ${autho2}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const { tracks } = data;
                    this.setState({tracks});
                });
            });
    }

    render() {
        return(
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value = {this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress ={event => {
                                if(event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                       <div>
                           <Profile
                               artist={this.state.artist}
                           />
                           {
                               this.state.tracks !== null
                               ?
                                   <Gallery
                                       tracks={this.state.tracks}
                                   />
                               :
                                   <div></div>
                           }
                       </div>
                    :
                       <div></div>
                }
            </div>
        )
    }
}

export default App;