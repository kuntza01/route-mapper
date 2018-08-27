import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

	onChange = (event) => {
		this.setState({data: event.target.value});
	};

	onSubmit = (event) => {
		event.preventDefault();

		axios.post('/api/map', {
			data: this.state.data
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="App">
				<form onSubmit={this.onSubmit}>
					<textarea onChange={this.onChange}/>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default App;
