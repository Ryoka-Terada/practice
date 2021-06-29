import '../App.css';
import React, {useState} from 'react';
import Board from './molecules/Board';
import PlayerName from './molecules/PlayerName';
import SelectLength from './molecules/SelectLength';

function App2() {
  // 選択されたマス辺の長さを管理
  const [selectedLength, setSelectedLength] = useState({});
  // マス全体の状態を管理
  const [status, setStatus] = useState([]);
  // 名前ロックを管理
  const [nameLock, lockName] = useState(false);
  return (
    <div className="App2">
      <PlayerName nameLock={nameLock} lockName={(isLock)=>lockName(isLock)} />
      <SelectLength
        select={ (length) => {setSelectedLength(length);} }
        setStatus={ (statuses) => setStatus(statuses)}
      />
      <br />
      <Board
        length={selectedLength}
        status={status}
        setStatus={ (statuses) => setStatus(statuses)}
      />
    </div>
  );
}

export default App2;
