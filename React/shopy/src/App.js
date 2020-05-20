import React from 'react';
import { Switch , Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
        currentUser: null
    }

}

unsubscribeFromAuth = null;

componentDidMount() {
 this.unsubscribeFromAuth =  auth.onAuthStateChanged( async user => {       // this method is called whenever the state of the user changes i.e user logins or logs out
    this.setState({ currentUser: user });                            // it takes a method as a parameter and runs it whenever called
    createUserProfileDocument(user);                                                      // it returns a unsubscription to the firebase auth to close the auth whenever called
    // console.log(user);                                              // here the method passed sets the currentuser(user) to the state
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();                                       // unsubscribes the firebase auth
}


  render(){
    return (
      <div >
      <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route exact path='/shop' component={ShopPage} /> 
          <Route exact path='/signin' component={SignInAndSignUpPage} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
