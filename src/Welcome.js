import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Segment, Input, Message, Icon, TransitionablePortal } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';
import AuthContext from './AuthContext';
import jwt_decode from 'jwt-decode';

const Welcome = () => {
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { isAuthenticated, setIsAuthenticated, token, setToken } = useContext(AuthContext);

  const HandleAddTask = () => {
    const decodedToken = jwt_decode(localStorage.getItem('token'));
    const userId = decodedToken.user_id;

    axios
      .post(
        'http://localhost:3001/tasks',
        { description: description, user: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then((response) => {
        console.log(response);
        setDescription('');
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="welcome-container">
      <Header as="h1" textAlign="center" className="welcome-header">
      </Header>
      <Grid centered columns={2} className="welcome-grid">
        <Grid.Column>
          <Segment raised className="welcome-segment">
            <Header as="h2" textAlign="center">
              Ajouter une tâche
              <Icon name="tasks" />
            </Header>
            <Form>
              <Form.Field>
                <label>Description:</label>
                <Input
                  placeholder="Entrer une tâche"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </Form.Field>
              <Button primary onClick={HandleAddTask}>
                <Icon name="add circle" />
                Ajouter
              </Button>
            </Form>
          </Segment>

          {showAlert && (
            <TransitionablePortal open={showAlert}>
              <Message
                positive
                onDismiss={() => setShowAlert(false)}
                icon={<Icon name="check" />}
                header="Tâche ajoutée avec succès"
                content="La tâche a été ajoutée avec succès."
              />
            </TransitionablePortal>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Welcome;

