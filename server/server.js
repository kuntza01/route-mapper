const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pathfindingService = require('./pathfindingService');

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.json());

app.post('/api/map', (req, res) => {
	let mapData = req.body.map;
	mapData = mapData.replace(/x/g, '.').trim();
	res.json({path: pathfindingService.shortestPath(mapData)});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express listening on port ${port}`));