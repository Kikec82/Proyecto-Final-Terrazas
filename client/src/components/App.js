import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from './routes';
import AuthService from '../services/auth.service';
// import { Link } from 'react-router-dom';
import Navigation from './layout/Navbar/Navbar'
import Footer from './layout/Footer/Footer'





class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedUser: undefined
    }
    this.authService = new AuthService()
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  getLoggedUser = () => {
    this.authService
      .loggedIn()
      .then(theLoggedUser => {this.storeUser(theLoggedUser.data)
      console.log(theLoggedUser)})
      .catch(() => this.storeUser(undefined))
  }

  componentDidMount = () => this.getLoggedUser()


  render() {
    return (
      <>
        <Navigation storeUser={this.storeUser} loggedUser={this.state.loggedUser} />
        
        <Routes storeUser={this.storeUser} loggedUser={this.state.loggedUser} />

        <Footer />
      </>
    );
  }

}

export default App;
