import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import "bootstrap/dist/css/bootstrap.css";
// key=API_KEY
const API_KEY = 'AIzaSyBmqX7GMcznfUF0KNJyp1MXzsOWlEctoKQ'

// const App = () => {
//     return <div>
//            </div>
// }
class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('cats');
  }
    // YTSearch({key: API_KEY, term: 'cats'}, function(data){
    //   console.log(data);
    // this.setState({videos: data});
    //   });
    videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      // this.setState({videos});
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
