import React from 'react';
import { Switch , Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {

unsubscribeFromAuth = null;

componentDidMount() {

const {setCurrentUser} = this.props;

 this.unsubscribeFromAuth =  auth.onAuthStateChanged( async userAuth => {       // this method is called whenever the state of the user changes i.e user logins or logs out
                           // it takes a method as a parameter and runs it whenever called
                                                   // it returns a unsubscription to the firebase auth to close the auth whenever called
    if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);   

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        })
      })
    }
    else{ 
    setCurrentUser(userAuth)
    
  }                                                      
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();                                       // unsubscribes the firebase auth
}


  render(){
    return (
      <div >
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route exact path='/shop' component={ShopPage} /> 
          <Route exact path='/signin' component={SignInAndSignUpPage} /> 
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
