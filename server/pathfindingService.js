const pathfindingService = module.exports;
const _ = require('lodash');

pathfindingService.shortestPath = data => {
	const root = parseToGraph(data, data.indexOf('A'), 0);
	const endNodes = reduceEndNodes(root);
	return _(endNodes)
		.sortBy(endNodes, 'step')
		.first();
};

function parseToGraph(data, index, step) {
	step = step + 1;

	const node = {type: data[index], step};

	if (node.type !== 'B') {

		node.children = [];

		data = mark(data, index);
		const rowLength = data.indexOf('\n') + 1;

		// Top
		if (index - rowLength > 0 && isPath(data[index - rowLength])) {
			node.children.push(parseToGraph(data, index - rowLength, step));
		}

		// Bottom
		if (index + rowLength < data.length && isPath(data[index + rowLength])) {
			node.children.push(parseToGraph(data, index + rowLength, step));
		}

		// Right
		if (index + 1 < data.length && isPath(data[index + 1])) {
			node.children.push(parseToGraph(data, index + 1, step))
		}

		// Left
		if (index - 1 < data.length && isPath(data[index - 1])) {
			node.children.push(parseToGraph(data, index - 1, step))
		}
	}

	node.data = data;

	return node;
}

function reduceEndNodes(current) {
	const endNodes = [];
	if (current.type === 'B') {
		endNodes.push(current);
	}
	else if (current.children) {
		current.children.forEach(child => {
			endNodes.push(...reduceEndNodes(child, endNodes));
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