import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Segment, Input,Message, Icon ,TransitionablePortal, Menu} from 'semantic-ui-react';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';



function Navbar() {
    const {isAuthenticated,setIsAuthenticated,token,Settoken} = useContext(AuthContext);

    function initialiseIsAuth() {
        setIsAuthenticated(false);
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('token');
      }


    return (
        <Menu>
        <Link to="/welcome">
        <Button   color="black">
        <Icon name ="add circle" />
          Add 

        </Button>
        
        </Link>
        <Link to="/tasks">
        <Button   color="black">
        <Icon name ="eye" />
          Show 

        </Button>
        </Link>

        <Menu.Menu position="right" primary >

        <Link To="/" >

        <Button  onClick={initialiseIsAuth} color="black">
          <Icon name ="arrow alternate circle left outline"></Icon>
          Logout

        </Button>

        </Link>
        </Menu.Menu>
      </Menu>
    )
}
export default Navbar;