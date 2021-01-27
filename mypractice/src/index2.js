import { render } from '@testing-library/react';
// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React, { useState,useEffect } from 'react'

class SelectMathaaa extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      squares: Array(25).fill(null),
      xIsNext: true,
      maths: null,
      num: 0,
      winner: null,
    };
  }
  render(){
    // const winner = calculateWinner(this.state.squares);
    if(this.state.winner){
      var status = 'Winner is: ' + (this.state.winner);
    }else{
      var status = 'Next player: ' + (this.state.xIsNext? this.props.player1: this.props.player2);
    }
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
    // マス数を変更された場合は各マスの中をnullにし、winnerの中身もnullにする
    if (isFirst) {
      this.state.winner = null;
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
    if (this.state.squares[i] || this.state.winner) {
      // 既に選択されているマスの場合は処理を行わない
      // 既ビンゴの場合も返却する
      return;
    } else {
      // 白マスの場合はビンゴ判定とマスの更新を行う
      this.state.squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.state.winner = calculateWinner(this.state.squares);
    }
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
  bingo.push(diagonalBingo);
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
  }
  return bingoResult;
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

class Gameaaa extends React.Component {
  renderBoard(){
    return <Board />;
  }

  // ３クラスで最初に呼ばれるのがrender()
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h2>これがfunctionメソッドで統一を図っているもの</h2>
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

// function Tmp(props){
//   console.log("hello "+props.tmp1)
//   return(
//     <h1>hello function</h1>
//   );
// }

// export default function Game(){
//   return(
//     <Tmp tmp1="aaa"/>
//   );
// }


function RenderSquare(i,squares) {
  return (
  // <button className="square" onClick={() => {this.handleClick(i); this.makeBoard(this.state.num, 0)}}>
  <button className="square">
    {squares[i]}
  </button>
  )
}

function MakeBoard(event,isFirst){
  var selectNum = event.target.value;
  // マス数を変更された場合は各マスの中をnullにする
  if (isFirst) {
    var squares = Array(selectNum*selectNum).fill(null);
  }
  // 選択されたマス数分のボタンを作成する
  var mathList = [];
  for (var i = 0; i < selectNum; i++) {
    var lineList = [];
    var k = i*selectNum;
    for (var j = 0; j < selectNum; j++) {
      lineList.push(RenderSquare(k+j,squares));
    }
    mathList.push(<div className="board-row">{lineList}</div>);
  }
  // 作成したボタン情報をstateに状態として更新
  // this.setState({
  //   maths: mathList,
  //   num: selectNum,
  // });
  return(
    mathList
  );
}

function usePlayer1IsNext(){ // 独自フック分からん
  const [player1IsNext, setPlayer1IsNext] = useState(0);
  useEffect(
    () => {
        console.log("hello");
        setPlayer1IsNext(player1IsNext);
        console.log(player1IsNext);
    },
    [ player1IsNext ]
  );
  return(player1IsNext);
}

function SelectMath(props){
  // const [player1IsNext, setPlayer1IsNext] = useState(true);
  const [drawSquare, setDrawSquare] = useState(null);
  // var status = 'Next player: ' + {player1IsNext} ? props.player1 : props.player2;
  return(
    <div>
      {/* <div className="status">{status}</div> */}
      <div>
        {/* 
          ハンドルイベントのときだけuseStateみたいな使い方はNGっぽい？トップコンポーネントというのは必ず描画されるとこ？
          独自フックを使うとコンポーネントを跨いで値を使えるっぽいけどたぶんそれもトップコンポーネントのことっぽいかな？
          classのときはstateで持たせて更新してったけど、これの場合何に持たせれば良いんだ。
          propsに持たせて毎回引数に入れるのは流石に何か違う気がする。
         */}
        <select id="choiceBoard" class="status" onChange={(e) => setDrawSquare(MakeBoard(e, true))}>
          <option disabled selected>マス目の数を選択してください</option>
          <option value="3">３×３</option>
          <option value="4">４×４</option>
          <option value="5">５×５</option>
        </select>
        {/* これが可動式マスの部分 */}
        {drawSquare}
      </div>
    </div>
  );
}

function BoardTmp(){
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  return (
    console.log({player1}),
    console.log({player2}),
    <div>
      <p>プレイヤーの名前を入力してください</p>
      <div  class="status">
        <input type="text" placeholder="プレイヤー１の名前を入力" value={player1} onChange={(e) => setPlayer1(e.target.value)}></input>
        <span> VS </span>
        <input type="text" placeholder="プレイヤー２の名前を入力" value={player2} onChange={(e) => setPlayer2(e.target.value)}></input>
      </div>
      <div>{player1} VS {player2} のゲームです</div>
      <SelectMath player1={player1} player2={player2}/>
    </div>
  );
}

function RenderBoard(){
  return <BoardTmp/>;
}

export default function Game(){
  return(
    <div className="game">
    <div className="game-board" id="nowCreating">
      <h2>これがfunctionメソッドで統一を図っているもの(途中)</h2>
      <RenderBoard />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
  );
}

// ========================================
// export default Gameaaa;