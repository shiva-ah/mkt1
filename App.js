import './css/App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { useEffect } from "react";
import MainLayout from './layouts/MainLayout';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Register from './screens/Register';
import SearchScreen from './screens/SearchScreen';
import SingleCourse from './screens/SingleCourse';
import ShoppingCart from './screens/ShoppingCart';
import ProfileLayout from './layouts/ProfileLayout';
import UserProfile from './screens/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import CoursesAdmin from './components/CoursesAdmin';
import Courses from './components/Courses';
import { getCategories } from './actions/categoriesAction';
import Loading from './components/Loading';
import MyForm from './screens/MyForm';

function App() {
  const dispatch=useDispatch();
  const userInfo=useSelector(state=>state.user.userInfo);
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/profile"]}>
          <ProfileLayout>
            <Switch>
              <Route exact path="/profile" component={()=> userInfo? <UserProfile/> : <Redirect to="/" />}/>
              <Route exact path="/profile/courses" render={()=> userInfo? (userInfo.isAdmin ? <SearchScreen><CoursesAdmin/></SearchScreen> : <Redirect to="/profile" />) : <Redirect to="/" />}/>
              <Route exact path="/profile/courses/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" render={()=> userInfo? (userInfo.isAdmin ? <SearchScreen><CoursesAdmin/></SearchScreen> : <Redirect to="/profile" />) : <Redirect to="/" />}/>
            </Switch>
          </ProfileLayout>
        </Route>

        <Route path="/">
          <MainLayout>
            <Switch>
              <Route exact path="/form" component={MyForm}/>
              <Route exact path="/" component={HomeScreen}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/logout" component={Logout}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/cart" component={ShoppingCart}/>
              <Route exact path="/singleCourse/:id" component={SingleCourse}/> 
              <Route exact path="/search/name/:name" component={()=> <SearchScreen><Courses/></SearchScreen>}/>
              <Route exact path="/search/category/:category" component={()=> <SearchScreen><Courses/></SearchScreen>}/>
              <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={()=> <SearchScreen><Courses/></SearchScreen>}/>
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
