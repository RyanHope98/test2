const express = require('express'); //imports the express module. express is a module with functions assigned to it
const Datastore = require('nedb'); //uses neDB to store data

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);

const database = new Datastore('database.db'); // stores logged data from server on this .db file
database.loadDatabase(); //loads database

app.get('/api', (request, response) => {
	// handles a GET request *retrieves data* e.g. what happens when the apps index is loaded into someone's browser

	
	database.find({}).sort({timestamp: 1}).exec(function (err,docs){
		if (err) {
			console.log(err); //console logs an error
			response.end();
			return; // this code is used to store the data into the correct time/date order on the graph
		}
	response.json(docs); //transmits data from the server to the client so it can be displayed on the web page
});


app.post('/api', (request, response) => { //handles a POST request e.g. updating or ordering data
    const data = request.body; // data sent by the client to the API
    const timestamp = Date.now(); //gets the current date
    data.timestamp = timestamp; //updates current date/time
    database.insert(data); //inserts the data
    response.json(data); //transmits the data
});

