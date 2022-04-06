const express = require('express');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       {
           id: 'gpa321',
           name: 'Bob',
           job: 'Stamp Collector'
       }
    ]
 }

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    if (name != undefined && id != undefined) {
        let result = findUserByNameId(name, id);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined && id === undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (id != undefined) {
        let result = findUserByQueryId(id);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }

});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByQueryId = (id) => { 
    return users['users_list'].filter( (user) => user['id'] === id); 
}

const findUserByNameId = (name, id) => {
    return users['users_list'].filter( (user) => (user['name'] === name && 
                                                 user['id'] === id));
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users', (req, res) => {
    const id = req.query.id;
    if(removeUserById(id))
        res.status(200).end();
    else
        res.status(404).send('Resource not found.');
})

function removeUserById(id) {
    var index = users.users_list.findIndex(function(item, i){
        return item.id === id;
    });

    if (index !== -1) {
        users.users_list.splice(index, 1);
        return true;
    }
    else
        return false;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  