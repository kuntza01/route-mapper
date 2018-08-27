const pathfindingService = module.exports;
const _ = require('lodash');

pathfindingService.shortestPath = map => {
	const graphRoot = parseToGraph(map, map.indexOf('A'), 0);
	const endNodes = filterEndNodes(graphRoot);
	return _(endNodes)
		.sortBy(endNodes, 'step')
		.first();
};

/**
 * Recursively walk through string map data building a node graph
 * @param map string map data
 * @param currentIndex current index in map data
 * @param step current step, used for determining shortest path
 * @returns {{type: *, step: *}} ultimately the root of the graph
 */
function parseToGraph(map, currentIndex, step) {
	step = step + 1;

	const node = {type: map[currentIndex], map, step};

	// Can stop if at end
	if (node.type !== 'B') {

		// Don't mark if at start so we can draw the complete path for client
		if (node.type !== 'A') {
			// Set current location in map data so we don't ever go backwards
			node.map = mark(map, currentIndex);
		}

		node.children = [];

		const rowLength = map.indexOf('\n') + 1;

		// Top
		if (currentIndex - rowLength > 0 && isPath(map[currentIndex - rowLength])) {
			node.children.push(parseToGraph(node.map, currentIndex - rowLength, step));
		}

		// Bottom
		if (currentIndex + rowLength < map.length && isPath(map[currentIndex + rowLength])) {
			node.children.push(parseToGraph(node.map, currentIndex + rowLength, step));
		}

		// Right
		if (currentIndex + 1 < map.length && isPath(map[currentIndex + 1])) {
			node.children.push(parseToGraph(node.map, currentIndex + 1, step))
		}

		// Left
		if (currentIndex - 1 < map.length && isPath(map[currentIndex - 1])) {
			node.children.push(parseToGraph(node.map, currentIndex - 1, step))
		}
	}

	return node;
}

/**
 * Recursively filter to only end nodes.
 * @param currentNode
 * @returns {Array} array of nodes of type 'B'
 */
function filterEndNodes(currentNode) {
	const endNodes = [];
	if (currentNode.type === 'B') {
		endNodes.push(currentNode);
	}
	else if (currentNode.children) {
		currentNode.children.forEach(child => {
			endNodes.push(...filterEndNodes(child, endNodes));
		});
	}
	return endNodes;
}

function isPath(char) {
	return char === '.' || char === 'B';
}

function mark(string, index) {
	return `${string.substr(0, index)}x${string.substr(index + 1)}`;
}