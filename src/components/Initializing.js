import React, {useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import AppState from '../context/appState';
import Defaultpage from './Defaultpage';

export const Initializing = props => {
  const appState = useContext(AppState);
  if (appState === 'initializing') {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
  
        <p>App initializing...</p>
      </div>
    );
  } else if (appState === 'no_provider') {
    return (
      <Defaultpage/>
    );
  }
};

export default Initializing;