import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import { StreamCreate, StreamDelete, StreamEdit, StreamList, StreamShow } from "./streams";
import { Header } from './Utils';


const App = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <div>
          <Header />
          <Route path='/' exact component={StreamList} />
          <Route path='/streams/new' exact component={StreamCreate} />
          <Route path='/streams/edit/:id' exact component={StreamEdit} />
          <Route path='/streams/delete/:id' exact component={StreamDelete} />
          <Route path='/streams/show/:id' exact component={StreamShow} />
        </div>
      </Router>
    </div>
  )
}

export default App;