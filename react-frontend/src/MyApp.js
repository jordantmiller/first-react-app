import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  function removeOneCharacter (index) {
    const person = characters.at(index);
    makeDeleteCall(person['id']).then( result => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);    
      }
    });
  }

  function updateList(person) {
    makePostCall(person).then( result => {
      if (result && result.status === 201)
      setCharacters([...characters, result.data]);
    });
  }

  return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
      </div>
  )

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error){
      // Not handling errors just logging.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete('http://localhost:5000/users?id=' + id);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default MyApp;