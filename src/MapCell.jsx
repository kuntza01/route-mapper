import React, {Component} from 'react';

export default class MapCell extends Component {
	render() {
		let backgroundColor;
		switch (this.props.type) {
			case '#':
				backgroundColor = 'black';
				break;
			case 'x':
				backgroundColor = 'silver';
				break;
			case 'A':
				backgroundColor = 'lime';
				break;
			case 'B':
				backgroundColor = 'red';
				break;
		}

		const style = {
			display: 'inline-block',
			width: '6px',
			height: '6px',
			backgroundColor
		};

		return <span style={style}/>;
	}
}