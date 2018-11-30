
import React, { Component } from 'react';
import './importer/importer'

import { BrowserRouter } from "react-router-dom";

import Header from './header/header'
import RightBar from './rightBar/rightBar'
import Footer from './footer/footer'
import PageTitle from './pageTitle/pageTitle'
import Routes from './routes'
import ReduxToastr from 'react-redux-toastr'

class App extends Component {

  render() {
    return (
      <BrowserRouter>        
        <div id="wrapper" className="">
          <ReduxToastr />
          <div id="page-wrapper">
            <Header />
            {/* <PageTitle /> */}
            <div className="container-fluid" style={{marginTop:"80px"}}>
              <div className="row">
                <Routes/>
              </div>
            </div>
          </div>
          {/* <RightBar /> */}
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
