import React, { Component } from "react";
import "./App.css";

class EmojiVoting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojis: ["😀", "😂", "😍", "😎", "😭"],
      votes: JSON.parse(localStorage.getItem("votes")) || {},
      winner: null,
      winnerVotes: 0,
    };
  }

  handleVote = (emoji) => {
    const votes = { ...this.state.votes };
    votes[emoji] = (votes[emoji] || 0) + 1;

    this.setState({ votes });
    localStorage.setItem("votes", JSON.stringify(votes));
  };

  showResults = () => {
    const { votes } = this.state;
    let maxVotes = 0;
    let winner = null;

    for (const emoji in votes) {
      if (votes[emoji] > maxVotes) {
        maxVotes = votes[emoji];
        winner = emoji;
      }
    }

    this.setState({ winner, winnerVotes: maxVotes });
  };

  clearResults = () => {
    localStorage.removeItem("votes");
    this.setState({ votes: {}, winner: null, winnerVotes: 0 });
  };

  render() {
    const { emojis, votes, winner, winnerVotes } = this.state;

    return (
      <div className="container">
        <h1>Голусовання за найкращий смайлик</h1>
        <ul className="emojis">
          {emojis.map((emoji) => (
            <li key={emoji}>
              <button onClick={() => this.handleVote(emoji)}>{emoji}</button>
              <span>{votes[emoji] || 0} </span>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button onClick={this.showResults}>Показати результат</button>
          <button onClick={this.clearResults}>Очистити результати</button>
        </div>
        {winner && (
          <div>
            <h2>Переможець: {winner}</h2>
            <p>Кільікість голосів: {winnerVotes}</p>
          </div>
        )}
      </div>
    );
  }
}

export default EmojiVoting;
