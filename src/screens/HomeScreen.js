import React from 'react';
import Banner from '../Banner';
import './HomeScreen.css';
import NavBar from '../NavBar';
import requests from '../Requests';
import Row from '../Row';

const HomeScreen = () => {
  return (
    <div className='homeScreen'>
      <NavBar />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchURL={requests.fetchTrending} />
      <Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchURL={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchURL={requests.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
