import axios from 'axios';

export default axios.create({
    // baseURL: "http://localhost:3006/",
    // baseURL: "https://api.jsonbin.io/v3/b/639ac13015ab31599e1caf0d",
    baseURL: "https://my-json-server.typicode.com/Claudde/server-api" //Fake Rest API
    // baseURL: "https://claudde.github.io/data/db.json"
});