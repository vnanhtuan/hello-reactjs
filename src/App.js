import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import ButtonGroup from "./ButtonGroup";

import { store } from "./store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloWorld tech={store.getState().tech}></HelloWorld>
        <ButtonGroup technologies={["React", "Elm", "React-redux"]} />
        <div className='Game'>
          <Game/>
        </div>
        <div>
          <NhapTen/>
        </div>
        <div>
          <QuanlyAnh/>
        </div>
      </div>
    );
  }
}

const Square = (props) => {
  const { onclick, value } = props;
    return(
      <button className='square' onClick={onclick}>
        {value}
      </button>
    );
}

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'Thi' : 'Boy';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i){
    return (
      <Square
        value={this.state.squares[i]}
        onclick={ () => this.handleClick(i) }
      />
    );
  }

  render(){
    const status = 'next player: ' + (this.state.xIsNext ? 'Thi' : 'Boy');
    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        </div>
        <div className='board-row'>
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        </div>
        <div className='board-row'>
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render(){
    return (
      <div className="game">
        <Board/>
      </div>
    );
  }
}

class NhapTen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'your name...',
      name1:'haha...'
    }
  }

  onChange(e){
    this.setState({name: e.target.value});
  }

  render(){
    return (
      <div>
        <input type='text' onChange={this.onChange.bind(this)}/>
        <Notification title='Hello'>{this.state.name}</Notification>
      </div>
    );
  }
}

const Notification = (props) => {
  const { title, children } = props;
  return (
    <div>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}

class QuanlyAnh extends Component{
  constructor(props){
    super(props);
    this.state = {
      pictures: [
        {id: 1, src: 'http://via.placeholder.com/200x100'},
        {id: 2, src: 'http://via.placeholder.com/400x200'},
        {id: 3, src: 'http://via.placeholder.com/200x100'}
      ],
      currentPic: null
    };

    this.setCurrentPic = this.setCurrentPic.bind(this);
  }

  setCurrentPic(ikd){
    this.setState({
      currentPic: ikd
    });
  }

  render(){
    return (
      <div>
        <div className='squares'>
          {this.state.pictures.map((picture) => {
            return (
              <Picture key={picture.id} src={picture.src}>
                <Button
                  pictureSrc={picture.src}
                  setCurrentPic={this.setCurrentPic}
                  id={picture.id}
                />
              </Picture>
            )
          })}
        </div>
        <div>
          <p>Current selected picture ID is {this.state.currentPic}</p>
        </div>
      </div>
    );
  }
  
}

const Picture = (props) => {
  return (
    <div className='picture'>
      <img src={props.src} className='picture'/>
      {props.children}
    </div>
  )
}

class Button extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pictureId: null,
      label: null
    };
    console.log('this', this);
    this.buttonLabel = this.buttonLabel.bind(this);
  }
buttonLabel(a) {
  console.log('src', a)
    a.includes('200x100')
    ? this.setState({pictureId: this.props.id, label: 'Small'})
    : this.setState({pictureId: this.props.id, label: 'Large'})
  }
componentDidMount() {
    this.buttonLabel(this.props.pictureSrc)
  }
render() {
    return (
      <div>
        <button
          onClick={() => this.props.setCurrentPic(this.props.id)}
        >
          {this.state.label}
        </button>
      </div>
    )
  }
}

export default App;
