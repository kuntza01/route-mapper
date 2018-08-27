import React, {Component} from 'react';
import MapCell from './MapCell';

export default class Map extends Component {
	render() {
		if (!this.props.map) return null;

		const rows = this.props.map.split("\n");
		return (
			<div className="text-center">
				{rows.map(row => (
					<div style={{height: '6px'}}>
						{row.split('').map(cell => (
							<MapCell type={cell}/>
						))}
					</div>
				))}
			</div>
		)
	}
}