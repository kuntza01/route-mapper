import React, {Component} from 'react';
import Map from "./Map";
import axios from 'axios';

export default class App extends Component {

	constructor() {
		super();
		this.state = {map: ""}
	}

	onChange = (event) => {
		this.setState({
			map: event.target.value
		});
	};

	onReset = () => {
		this.setState({
			map: "",
			solvedMap: null,
			solvedSteps: null
		});
	};

	onSubmit = (event) => {
		event.preventDefault();

		axios.post('/api/map', {
			map: this.state.map
		})
			.then(response => {
				this.setState({
					solvedMap: response.data.path.map,
					solvedSteps: response.data.path.step
				})
			});
	};

	render() {
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark">
					<div className="container">
						<span className="navbar-brand mb-0 h1">Route Mapper</span>
					</div>
				</nav>
				<div className="container mt-3">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>
								Paste map data here
							</label>
							<textarea className="form-control"
										 onChange={this.onChange}
										 value={this.state.map}/>
						</div>
						<div className="row">
							<div className="col">
								{this.state.solvedSteps &&
								<div>
									Solved in {this.state.solvedSteps} steps!
								</div>
								}
							</div>
							<div className="col text-right">
								<button type="reset" className="btn btn-link" onClick={this.onReset}>
									Reset
								</button>
								<button type="submit" className="btn btn-success">
									Solve
								</button>
							</div>
						</div>
					</form>
					{this.state.solvedMap &&
					<Map map={this.state.solvedMap}/>
					}
				</div>
			</div>
		);
	}
}
