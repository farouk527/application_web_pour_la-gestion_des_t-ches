import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Segment, Input, Message, Icon, TransitionablePortal, Menu, Modal } from 'semantic-ui-react';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';


function Show() {
  const [data, setData] = useState([]);
  const [userId, setUid] = useState();
  const { isAuthenticated, setIsAuthenticated, token, Settoken } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  useEffect(() => {

    const decodedToken = jwt_decode(localStorage.getItem("token"));
    setUid(decodedToken.user_id);

    axios.get(`http://localhost:3001/tasks/${userId}`).then((res) => {
      console.log(res.data);
    
      setData(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [userId]);

  
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`).then((res)=>{
     setData((data)=>data.filter((data)=>data._id!=taskId));
    })
  }

  const handleEdit = (taskId, description) => {
    setSelectedTaskId(taskId);
    setNewDescription(description);
    setShowModal(true);
  }

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/tasks/${selectedTaskId}`, { description: newDescription }).then((res)=>{
      setData((data) => data.map((task) => {
        if (task._id === selectedTaskId) {
          task.description = newDescription;
        }
        return task;
      }));
      setShowModal(false);
    });
  }

  return (
    <div>
      {data.length == 0 ? (
  <Grid>
<Grid.Column     >
  <Segment color='black' style={{ fontSize: '20px' }}>
    
  Vous N'avez aucune tâche <Icon name="book"></Icon>

  </Segment>

</Grid.Column>
  </Grid>
) : (
  <>
    <Header as="h1" textAlign="center" className="welcome-header">
      Bienvenue dans votre liste de tâches
    </Header>
    <Grid centered padded>
      {data.map((task, index) => (
        <Grid.Column mobile={16} tablet={8} computer={4} key={index}>
          <Segment raised>
            <Header as="h2" textAlign="center">Task {index + 1}</Header>
            <Segment>{task.description}</Segment>
            <Button color="red" onClick={() => handleDelete(task._id)}>
              <Icon name="delete"></Icon>
              Supprimer
            </Button>
            <Button color='green' onClick={() => handleEdit(task._id, task.description)} >
              <Icon name="tags"></Icon>
              Modifier
            </Button>
          </Segment>
        </Grid.Column>
      ))}
    </Grid>
  </>
)}

      <Modal open={showModal}>
        <Modal.Header>Modifier la tâche</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Nouvelle description</label>
              <Input
                placeholder='Entrez la nouvelle description'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setShowModal(false)}>
            <Icon name='cancel'></Icon>
            Annuler</Button>
          <Button color='green' onClick={handleUpdate}>
                        <Icon name='save'></Icon>

            Sauvegarder</Button>
        </Modal.Actions>
      </Modal>

    </div>
        
  );
        } 
        export default Show;