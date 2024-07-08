import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AddMemberForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [joinDate, setJoinDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, joinDate });
    setName('');
    setJoinDate('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter member name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formJoinDate">
        <Form.Label>Join Date</Form.Label>
        <Form.Control 
          type="date" 
          value={joinDate} 
          onChange={(e) => setJoinDate(e.target.value)} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Member
      </Button>
    </Form>
  );
}

export default AddMemberForm;
