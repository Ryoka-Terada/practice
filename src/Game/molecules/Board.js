import React, {useState} from 'react';
import Square from '../atoms/Square';

function Board(props) {
  // プレイヤーのターンを管理
  const [player, changePlayer] = useState(true);

  var boardLength = props.length;
  var mathList = [];
  if ( isEmpty(boardLength) ) {
    boardLength = 0;
    mathList.push(<p>ここにゲーム版が表示されます。</p>);
    // マス数を変更された場合は各マスの中をnullにし、winnerの中身もnullにする
    // this.state.winner = null;
    // this.state.squares = Array(boardLength*boardLength).fill(null);
  }
  
  // 選択されたマス数分のボタンを作成する
  for (var i = 0; i < boardLength; i++) {
    var lineList = [];
    var k = i*boardLength;
    for (var j = 0; j < boardLength; j++) {
      lineList.push(
        <Square
          id={k+j}
          status={props.status}
          setStatus={(statuses)=>{props.setStatus(statuses)}} changePlayer={()=>changePlayer(!player)}
          nowPlayer={player}
        />
      );
    }
    mathList.push(<div className="board-row">{lineList}</div>);
  }

  // 描画したゲームボードを返す
  return (
    <div className="Board">
      <div>Next player: {player? "○":"×"}</div>
      {mathList}
    </div>
  );
}

// 初回描画判定に使用
function isEmpty(obj){
  for(let i in obj){
    return false;
  }
  return true;
}

export default Board;
