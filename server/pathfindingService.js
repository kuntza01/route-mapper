const pathfindingService = module.exports;

pathfindingService.shortestPath = map => {
	const rowLength = map.indexOf('\n') + 1;
	const stack = [{type: map[map.indexOf('A')], index: map.indexOf('A'), map, step: 0}];
	let shortest = null;

	while (stack.length > 0) {
		const node = stack.pop();

		if (node.type === 'B') {
			shortest = node;
		}
		else {

			const currentIndex = node.index;

			// Don't mark if at start so we can draw the complete path for client
			if (node.type !== 'A') {
				// Set current location in map data so we don't ever go backwards
				node.map = mark(node.map, currentIndex);
			}

			// Top
			if (!exceedsShortestNode(shortest, node) && currentIndex - rowLength > 0 && isPath(node.map[currentIndex - rowLength])) {
				stack.push({
					type: map[currentIndex - rowLength],
					index: currentIndex - rowLength,
					map: node.map,
					step: node.step + 1
				});
			}

			// Bottom
			if (!exceedsShortestNode(shortest, node) && currentIndex + rowLength < map.length && isPath(node.map[currentIndex + rowLength])) {
				stack.push({
					type: map[currentIndex + rowLength],
					index: currentIndex + rowLength,
					map: node.map,
					step: node.step + 1
				});
			}

			// Right
			if (!exceedsShortestNode(shortest, node) && currentIndex + 1 < map.length && isPath(node.map[currentIndex + 1])) {
				stack.push({
					type: map[currentIndex + 1],
					index: currentIndex + 1,
					map: node.map,
					step: node.step + 1
				});
			}

			// Left
			if (!exceedsShortestNode(shortest, node) && currentIndex - 1 < map.length && isPath(node.map[currentIndex - 1])) {
				stack.push({
					type: map[currentIndex - 1],
					index: currentIndex - 1,
					map: node.map,
					step: node.step + 1
				});
			}
		}
	}

	return shortest;
};

function exceedsShortestNode(shortestNode, node) {
	return shortestNode && shortestNode.step >= node.step;
}

function isPath(char) {
	return char === '.' || char === 'B';
}

function mark(string, index) {
	return `${string.substr(0, index)}x${string.substr(index + 1)}`;
}