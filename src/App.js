import React, { Component } from "react";
import { Line } from 'rc-progress';
import Wrapper from "./components/Wrapper";
import Card from './components/Card';
import Characters from './characters.json';
import './App.css';

let topScore = 0;
let guessesCorrect = 0;
let hearts = 0;
let message = '';

class App extends Component {
	state = {
		Characters,
		topScore,
		guessesCorrect,
		message,
		hearts
	};

	setClicked = id => {
		const Characters = this.state.Characters;
		const cardClicked = Characters.filter(Character => Character.id === id);

		// change to ternary
		// should this use map method?
		if (cardClicked[0].clicked) {
			guessesCorrect = 0;
			message = 'Try again';

			for (let i = 0; i < Characters.length; i++) {
				Characters[i].clicked = false;
			}

			this.setState({ message });
			this.setState({ guessesCorrect });
			this.setState({ Characters });
		} else {
			cardClicked[0].clicked = true;

			guessesCorrect = guessesCorrect + 1;
			message = 'Nice one!';

			// change to that thing with &&
			if (guessesCorrect > topScore) {
				topScore = guessesCorrect;
				hearts++;
				this.setState({ hearts });
				this.setState({ topScore });
				this.renderHearts();
			}

			Characters.sort((a, b) => {
				return 0.5 - Math.random();
			});

			this.setState({ Characters });
			this.setState({ guessesCorrect });
			this.setState({ message });
		}
	};

	renderHearts() {
		let divs = [];

		for (let i = 0; i < this.state.hearts; i++){
			divs.push(<div key={i} className='heart'></div>);
		}

		return <div>{divs}</div>;
	};

	render() {
		return (
			<Wrapper>
				<div className='hero'>
					<div className = 'heroText'>
						<h1 className = 'banner'>Click Game: Zelda edition</h1>
						<h2 className = 'rules'>Choose well to save Hyrule</h2>
						<h3 className = 'message'>{this.state.message}</h3>
					</div>
					<div className = 'buttonWrapper'>
						<img className = 'buttons' src='images/buttons.png' alt='buttons'>
					</div>
					<div className = 'heartWrapper'>
						{this.renderHearts()}
						<Line
							className = 'progress-bar'
							percent = {this.state.guessesCorrect}
							// trailWidth, strokeWidth, etc
							/>
						</div>
					</div>
					<div className='row'>
						{this.state.Characters.map(Character => (
							<Card
								setClicked={this.setClicked}
								id={Character.id}
								key={Character.id}
								image={Character.image}
								name={Character.name}
								className='col-sm-1'
							/>
						))};
					</div>
				</Wrapper>

		);
	};

};