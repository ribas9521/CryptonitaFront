import React, { Component } from 'react';
import './importer/importer'

import { HashRouter } from "react-router-dom";

import Header from './header/header'
import RightBar from './rightBar/rightBar'
import Footer from './footer/footer'
import PageTitle from './pageTitle/pageTitle'
import Routes from './routes'

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div id="wrapper" className="">
          <div id="page-wrapper">
            <Header />
            <PageTitle />
            <div className="container-fluid">
              <div className="row">
                <Routes/>
              </div>
            </div>
          </div>
          <RightBar />
          <Footer />
        </div>
      </HashRouter>

    );
  }
}

export default App;
