const express = require('express');
const bodyParser = require('body-parser');
const pathfindingService = require('./pathfindingService');

const app = express();
app.use(bodyParser.json());

app.post('/api/map', (req, res) => {
	res.json({path: pathfindingService.shortestPath(req.body.data)});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express listening on port ${port}`));