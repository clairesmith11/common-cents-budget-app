
import './App.css';
import Navigation from './containers/Navigation/Navigation';
import Budget from './containers/Budget/Budget';
import Compare from './containers/Compare/Compare';
import Auth from './containers/Auth/Auth';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Route path="/" exact component={Budget} />
        <Route path="/compare" exact component={Compare} />
        <Route path="/sign-in" exact component={Auth} />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
