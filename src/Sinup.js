import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Card } from 'semantic-ui-react';
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
 if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
setIsSubmitting(true);    
    axios.post('http://localhost:3001/register', { email, password })
      .then(response => {
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch(error => {
        setIsSubmitting(false);
        console.error(error);
      });
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {isSuccess && <Header as="h2" color="teal" textAlign="center">
          Sign up pour un compte
        </Header>
        }
     
        {!isSuccess &&
        
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
              />
              <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Confirm password" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            
              <Button color="teal" fluid size="large" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Sign up'}
              </Button>
            </Segment>
          </Form>
        }
        {isSuccess &&
          <Card>
            <Card.Content>
              <Card.Header>Success!</Card.Header>
              <Card.Description>ton comepte a été bien creer.</Card.Description>
              <Card.Content>
              <Message>
                 <a href="/">Log in</a>
          </Message>
              </Card.Content>
            </Card.Content>
          </Card>
        }
        {!isSuccess &&
          <Message>
            Already have an account? <a href="/">Log in</a>
          </Message>
        }
      </Grid.Column>
    </Grid>
  );
};

export default SignupPage;
