import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Normal from './normal';
import RootsTmp from './tootsTmp';
import * as serviceWorker from './serviceWorker';

class SelectMath extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      squares: Array(25).fill(null),
      xIsNext: true,
      maths: null,
      num: 0,
    };
  }
  render(){
    const status = 'Next player: ' + (this.state.xIsNext? this.props.player1: this.props.player2);
    return(
      <div>
        <div className="status">{status}</div>
        <div>
          {/* e.target.valueで選択したvalueを渡している */}
          <select id="boardNum" class="status" onChange={(e) => this.makeBoard(e.target.value, 1)}>
            <option disabled selected>マス目の数を選択してください</option>
            <option value="3">３×３</option>
            <option value="4">４×４</option>
            <option value="5">５×５</option>
          </select>
          {/* これが可動式マスの部分  */}
          {this.state.maths}
        </div>
      </div>
    );
  }

  makeBoard(selectNum, isFirst){
    // マス数を変更された場合は各目の中をnullにする
    if(isFirst){
      this.state.squares = Array(selectNum*selectNum).fill(null);
    }
    // 選択されたマス数分のボタンを作成する
    var mathList = [];
    for (var i = 0; i < selectNum; i++) {
      var lineList = [];
      var k = i*selectNum;
      for (var j = 0; j < selectNum; j++) {
        lineList.push(this.renderSquare(k+j));
      }
      mathList.push(<div className="board-row">{lineList}</div>);
    }
    // 作成したボタン情報をstateに状態として更新
    this.setState({
      maths: mathList,
      num: selectNum,
    });
  }

  renderSquare(i) {
    return(
    <button className="square" onClick={() => {this.handleClick(i); this.makeBoard(this.state.num, 0)}}>
      {this.state.squares[i]}
    </button>
    )
  }

  handleClick(i) {
    this.state.squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      xIsNext: !this.state.xIsNext,
    });
  }

}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      player1: 'X',
      player2: 'O',
    };
  }

  render() {
    return (
      <div>
        <p>プレイヤーの名前を入力してください</p>
        <div  class="status">
          <input type="text" placeholder="プレイヤー１の名前を入力" value={this.state.player1} onChange={(e) => this.setPlayer1(e)}></input>
          <span> VS </span>
          <input type="text" placeholder="プレイヤー２の名前を入力" value={this.state.player2} onChange={(e) => this.setPlayer2(e)}></input>
        </div>
        <SelectMath player1={this.state.player1} player2={this.state.player2}/>
      </div>
    );
  }

  // 入力された値をそれぞれのプレイヤーのstateにセットする
  setPlayer1(event){
    this.setState({
      player1: event.target.value,
    })
  }
  setPlayer2(event){
    this.setState({
      player2: event.target.value,
    })
  }
}

class Game extends React.Component {
  renderBoard(){
    return <Board />;
  }

  // ３クラスで最初に呼ばれるのがrender()
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h2>これが自分で改造したもの</h2>
          {this.renderBoard()}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// １最初にここが呼ばれる
ReactDOM.render(
  <Game />,   // ２これでGameクラスが呼ばれる
  document.getElementById('root')
);
// ReactDOM.render(
//   <RootsTmp />,   // ２これでGameクラスが呼ばれる
//   document.getElementById('rootTmp')
// );
// htmlにid違う要素をもう一つ書いてこうすれば同じのがもう一個出せる
ReactDOM.render(
  <Normal />,
  document.getElementById('root2')
);