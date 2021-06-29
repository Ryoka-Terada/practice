import React, {useState} from 'react';
import Textbox from '../atoms/Textbox'

function PlayerName(props) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  // プレイヤーの名前を管理
  return (
    <inline className="PlayerName">
      <h3>プレイヤーの名前を入力してください</h3>
      <Textbox placeholder="プレイヤーの名前を入力" setPlayer={(player1)=>setPlayer1(player1)} lock={props.nameLock} />
      VS
      <Textbox placeholder="プレイヤーの名前を入力" setPlayer={(player2)=>setPlayer2(player2)} lock={props.nameLock} />
      <button onClick={()=>{ props.lockName( player1!='' && player2!='' ? true:false ); }}>確定</button>
    </inline>
  );
}

export default PlayerName;
