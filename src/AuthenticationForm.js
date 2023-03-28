  import React, { useState ,useContext} from 'react';
  import { Navigate , Link, resolvePath} from 'react-router-dom';
  import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
  import axios from "axios";
  import AuthContext from './AuthContext';


  const AuthenticationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const {isAuthenticated,setIsAuthenticated,token,Settoken} = useContext(AuthContext);


  

    const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.post('http://localhost:3001/login', {email, password})
        .then(response => {
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          
          localStorage.setItem("token",response.data);
        })
        .catch(error => {
          setError(true);
          console.log(isAuthenticated);

        });
    }

    return (

      
<Grid textAlign="center" style={{ height: '100vh',    backgroundColor:"#f5f9fb"}} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 ,}} shadow="10">
          <Header as="h2" color="teal" textAlign="center">
            Log-in pour votre Compte
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid 
                icon="user" 
                iconPosition="left" 
                placeholder="E-mail address" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
              <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            
              <Button color="teal" fluid size="large" type="submit" className="auth-button">
                Login
              </Button>
              {isAuthenticated   && <Navigate to="/welcome" />}
            </Segment>
          </Form>
          {error && 
          <Message negative>
              <p>email ou password incorrect. essayer encore fois.</p>
            </Message>
          }
          <Message>
            vous voulez creez un compte ? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
      
    );
  };

  export default AuthenticationPage;
