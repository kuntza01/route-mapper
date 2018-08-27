import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

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
					map: response.data.path.map,
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
								Map data
							</label>
							<textarea className="form-control"
												style={{fontFamily: 'monospace'}}
												rows="10"
												onChange={this.onChange}
												value={this.state.map}/>
						</div>
						{this.state.solvedSteps &&
						<div className="alert alert-info">
							Solved in {this.state.solvedSteps} steps!
						</div>
						}
						<div className="text-right">
							<button type="reset" className="btn btn-link" onClick={this.onReset}>
								Reset
							</button>
							<button type="submit" className="btn btn-success">
								Solve
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
