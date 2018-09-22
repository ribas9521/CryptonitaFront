import React, { Component } from 'react';
import './importer/importer'
import Header from './header/header'
import RightBar from './rightBar/rightBar'
import Footer from './footer/footer'
import PageTitle from './pageTitle/pageTitle'

class App extends Component {
  
  render() {
    return (
      <div id="wrapper" className="">
        <div id="page-wrapper">
          <Header/>
          <PageTitle/>
          <div className="container-fluid">

            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="widget default-widget">
                  <h2>Blank Page</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
        <RightBar/>
        <Footer/>
      </div>

    );
  }
}

export default App;
