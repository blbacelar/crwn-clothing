import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Header from './components/header/header.component.jsx'
import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App  extends React.Component {
  
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user })
      if(userAuth) {        
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          this.setState({ 
            currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
          }, () => {
             console.log('Set state', this.state); })
        })
       
      } else {
        this.setState({ currentUser: userAuth }, () => {
             console.log('Set state', this.state); })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInSignUp}/>
        </Switch>
        
      </div>
    );
  }

}

export default App;
