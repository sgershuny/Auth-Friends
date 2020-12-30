import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';

import thunk from 'redux-thunk';

import{
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  FETCH_DATA_FAILURE,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FRIEND_ADD
} from './actions/actions';



const initialState = {
  error: '',
  errorStatsCode: null,
  fetchingData:false,
  friends: [],
  isLoggingIn: false
}

export function reducer(state = initialState,action) {
  switch(action.type){
      case(LOGIN_LOADING): {
        console.log("LOGIN LOADING")
        return{
          ...state,
          isLoggingIn: true
        }
      }

      case(LOGIN_SUCCESS): {
        return{
          ...state,
          isLoggingIn: false,
        }
      }

      case(LOGIN_FAILURE): {
        return{
          ...state,
          errorStatsCode: action.payload,
          isLoggingIn: false
        }
      }

      case(FETCH_DATA_START):{
        return{
          ...state,
          fetchingData:true
        }
      }

      case(FETCH_DATA_FAILURE): {
        return{
          ...state,
          error: action.payload,
          fetchingData: false
        }
      }

      case(FETCH_DATA_SUCCESS): {
        console.log("SUCCESS FETCHING DATA")
        return{
          ...state,
          friends: action.payload,
          fetchingData: false
        }
      }

      case(FRIEND_ADD): {
        return{
          ...state,
          friends: [...state.friends, action.payload]
        }
      }
      default:
          return state
      }
  
}



const store = createStore(reducer,applyMiddleware(thunk))


ReactDOM.render(
  <Router>
    <Provider store ={store}> 
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);

