import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Normal from './normal';
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
    const winner = calculateWinner(this.state.squares);
    console.log("goalllll"+winner);
    const status = 'Next player: ' + (this.state.xIsNext? this.props.player1: this.props.player2);
    return (
      <div>
        <div className="status">{status}</div>
        <div>
          {/* e.target.valueで選択したvalueを渡している */}
          <select id="choiceBoard" class="status" onChange={(e) => this.makeBoard(e.target.value, 1)}>
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
    // マス数を変更された場合は各マスの中をnullにする
    if (isFirst) {
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
    return (
    <button className="square" onClick={() => {this.handleClick(i); this.makeBoard(this.state.num, 0)}}>
      {this.state.squares[i]}
    </button>
    )
  }

  handleClick(i) {
    if (this.state.squares[i]) {
      // 既に選択されているマスの場合は処理を行わない
      // TODO 既ビンゴの場合も返却する
      return;
    } else {
      // TODO 白マスの場合はビンゴ判定とマスの更新を行う
      const winner = calculateWinner(this.state.squares);
      console.log("結果は"+winner)
    }
    this.state.squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      xIsNext: !this.state.xIsNext,
    });
  }

}

function calculateWinner(squares) {
  // 表示されているマスの列数を取得
  const squareLine = Math.sqrt(squares.length);
  var bingo = [];
  // よこビンゴのパターンを作成
  var rowCount = 0;
  var rowBingo = [];
  for (var i = 0; i < squareLine; i++) {
    rowBingo = [];
    for (var j = 0; j < squareLine; j++) {
      rowBingo.push(rowCount);
      rowCount++;
    }
    bingo.push(rowBingo);
  }
  // たてビンゴのパターンを作成
  var columnCount = 0;
  var columnBingo = [];
  for (var i = 0; i < squareLine; i++) {
    columnBingo = [];
    for (var j = 0; j < squareLine; j++) {
      if(j===0){
        columnBingo.push(columnCount);
      }else{
        columnBingo.push(columnCount+squareLine*j);
      }
    }
    columnCount++;
    bingo.push(columnBingo);
  }
  // ななめビンゴのパターンを作成１
  var diagonalCount = 0;
  var diagonalBingo = [];
  diagonalBingo.push(diagonalCount);
  var nowNumber;
  for(var i = 1; i < squareLine; i++){    // i=1,2,3  4の場合
    nowNumber = diagonalCount + squareLine + 1;
    diagonalBingo.push(nowNumber);
    diagonalCount = nowNumber;
  }
  console.log(bingo);
  // ななめビンゴのパターンを作成２
  diagonalCount = squareLine - 1;
  diagonalBingo = [];
  diagonalBingo.push(diagonalCount);
  for(var i = 1; i < squareLine; i++){    // i=1,2,3  4の場合
    nowNumber = diagonalCount + squareLine - 1;
    diagonalBingo.push(nowNumber);
    diagonalCount = nowNumber;
  }
  bingo.push(diagonalBingo);

  const lines = [
    // よこ
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // たて
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // ななめ
    [0, 4, 8],
    [2, 4, 6],
  ];
  // lines = [ // これ事態はsquareLine*2+2
  //   // よこ　squareLine個
  //   [0, 1, 2 ,3],
  //   [4, 5, 6, 7],
  //   [8, 9, 10, 11],
  //   [12, 13, 14, 15],
  //   // たて　squareLine個
  //   [0, 4, 8 ,12],
  //   [1, 5, 9, 13],
  //   [2, 6, 10, 14],
  //   [3, 7, 11, 15],
  //   // ななめ　2個
  //   [0, 5, 10, 15],
  //   [3, 6, 9, 12],
  // ];
  console.log("ストップ用");
  // console.log(bingo[0][0]); //0
  // console.log(bingo[0][1]); //1
  // console.log(bingo[0][2]); //2
  console.log(squares[2])
  var a = bingo[0][2];
  console.log(squares[bingo[0][2]])
  // alphabet.some( target => target === 'c') 
  var bingoResult;
  for (let i = 0; i < bingo.length; i++) {
    var checkBingoLine = [];
    var squareContent;
    for (let j = 0; j < bingo[i].length; j++) {
      squareContent = squares[bingo[i][j]];
      checkBingoLine.push(squares[bingo[i][j]]);
    }
    bingoResult = squareContent ? (checkBingoLine.some( target => target != squareContent)? null : squareContent) : null ;
    if(bingoResult){
      break;
    }
    // checkBingoLine.some( target => target != squareContent);
    // const [a, b, c] = bingo[i];
    // if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //   return squares[a];
    // }
  }
  return bingoResult;
  // return null;
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
// htmlにid違う要素をもう一つ書いてこうすれば同じのがもう一個出せる
ReactDOM.render(
  <Normal />,
  document.getElementById('root2')
);