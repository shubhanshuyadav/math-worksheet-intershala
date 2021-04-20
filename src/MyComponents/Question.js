import React, { PureComponent } from 'react';
import Result from "./Result"
import "./Question.css"

const propblems = [
    {
        id: 1,
        question: "6+5-2+8-3+2",
        isAnsweredCorrectly: false,
    },
    {
        id: 2,
        question: "9+2+8-1+2",
        isAnsweredCorrectly: false,
    },
    {
        id: 3,
        question: "6+5-2+8-3+2",
        isAnsweredCorrectly: false,
    },
    {
        id: 4,
        question: "6+9-2+8-3+0",
        isAnsweredCorrectly: false,
    },
    {
        id: 5,
        question: "4+2+8-6+2",
        isAnsweredCorrectly: false,
    }
    


];

let start;




export class Question extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentQuestionIndex: null,
            currentProblemIndex: 0,
            currentDisplayingStr: null,
            shouldShowInput: false,
            answerByUser: null,
            isTestFinished: true,
            isTestInitiated: false,
            score: 0,
        };
        this.initiateTest = this.initiateTest.bind(this);
        this.nextDisplayingStr = this.nextDisplayingStr.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    /**
     * Compare the answer entered by user and mark scores
     */
    checkAnswer() {
        
        let currentQuestionAnswer = eval(propblems[this.state.currentProblemIndex].question);
        let nextString = null;

        if (currentQuestionAnswer == this.state.answerByUser) {
            nextString = "Clear";
            this.setState(state => ({
               score:state.score+1
            }))
        } else {
            nextString = "Wrong";
        }


        console.log(this.state.score);

        this.setState(state => ({
            currentDisplayingStr: nextString,
            currentProblemIndex: state.currentProblemIndex + 1,
            currentQuestionIndex: null,
            shouldShowInput: false
        }))

        this.initiateTest();
    }


    initiateTest() {
        this.setState(state => ({
            isTestFinished: false,
            isTestInitiated: true
        }))
        start = setInterval(() => {
            this.nextDisplayingStr();
        }, 100);

    }

    nextDisplayingStr() {
        //When test is finished
        if (this.state.currentProblemIndex + 1 > propblems.length) {
            clearInterval(start);
            return this.setState(state => ({
                isTestFinished: true,
                currentQuestionIndex: null,
                currentProblemIndex: 0,
                currentDisplayingStr: null
            }))
        }

        
        if (!this.state.currentQuestionIndex && this.state.currentQuestionIndex !== 0) {
            let nextString = 'Q' + propblems[this.state.currentProblemIndex].id
            return this.setState(state => ({
                currentDisplayingStr: nextString,
                currentQuestionIndex: 0
            }))
        }

        //When the no's in string is finished 
        if (this.state.currentQuestionIndex === propblems[this.state.currentProblemIndex].question.length) {
            let nextString = "?";
            clearInterval(start);
            this.state.shouldShowInput = true;
            return this.setState(state => ({
                currentDisplayingStr: nextString
            }))
        }

        let nextString = propblems[this.state.currentProblemIndex].question[this.state.currentQuestionIndex];

        // Else continue showing next string of equation
        this.setState(state => ({
            currentDisplayingStr: nextString,
            currentQuestionIndex: state.currentQuestionIndex + 1
        }))
    }

    restartTest() {

        this.setState(state => ({
            currentQuestionIndex: null,
            currentProblemIndex: 0,
            currentDisplayingStr: null,
            shouldShowInput: false,
            answerByUser: null,
            score: 0
         }))
         this.initiateTest();
    }

    render() {

        return (
            <div>
                {
                    !this.state.isTestInitiated &&
                        <div>
                        <button className="start-btn"  onClick={() => { this.initiateTest() }}>Start</button>
                        </div>
                }
                {
                    (this.state.isTestFinished && this.state.isTestInitiated)
                        ? <div>
                            <Result score={this.state.score} total_questions={propblems.length} />
                            <button className="restart-btn"  onClick={() => { this.restartTest() }}>Restart</button>
                        </div>
                        : null
                        
                }

                {
                    this.state.isTestInitiated &&
                    <h1>{this.state.currentDisplayingStr}</h1>
                }
                    
                {
                    this.state.shouldShowInput &&
                        <div>
                            <input type="text" onChange={(event) => {
                                this.setState({answerByUser: event.target.value})}} />
                            <button className="submit-btn" onClick={() => { this.checkAnswer() }}>Submit</button>
                        </div>
                }

            </div>
        )
    }
}

export default Question
