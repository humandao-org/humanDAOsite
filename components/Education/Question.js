import React from "react";
import { storyblokEditable } from "@storyblok/react";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      answerState: -1,
      selectedAnswer: {}
    };
    this.answers = props.blok.answers
  }

  answerClicked = (answer) => {
    this.setState({ selectedAnswer: answer })
    this.setState({ answerState: -1 })
  }

  checkAnswer = () => {
    this.setState({ answerState: this.state.selectedAnswer.is_correct ? 1 : 0 })
    this.props.onQuestionAnswered(this.state.selectedAnswer)
    this.setState({ selectedAnswer: {} })
  }

  render() {
    return (
      <div className="bg-white p-4 rounded" {...storyblokEditable(this.props.blok)}>
        <h2 className="font-bungee">{this.props.blok.question}</h2>
        <div className="my-4">
        {
          this.answers.map((answer) => (
            <div key={answer._uid} className="flex items-center mr-4 mb-4">
              <input id={`radio${answer._uid}`} type="radio" onChange={this.answerClicked.bind(this, answer)} name={`radio${this.props.blok._uid}`} className="hidden" />
              <label htmlFor={`radio${answer._uid}`} className="flex items-center cursor-pointer text-xl">
              <span className="w-7 h-7 inline-block mr-1.5 rounded-full border border-black flex-no-shrink"></span>
              { answer.text }</label>
            </div>
          ))
        }
        </div>
        <div className={`${this.state.answerState !== -1 ? '' : 'hidden'} ${this.state.answerState > 0 ? 'text-green-700' : 'text-red-700'}`}>{ this.state.answerState > 0 ? 'Congrats. You got the right answer. ✓✓' : 'Sorry, that is not correct ‼' }</div>

        <div className="flex items-center justify-center">
          <button 
            disabled={!this.state.selectedAnswer._uid} 
            onClick={this.checkAnswer}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none disabled:opacity-60" 
          >Check answer</button>
        </div>

      </div>
    )
  }
}

export default Question

