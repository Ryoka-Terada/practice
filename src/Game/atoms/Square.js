function Square(props) {
  return (
    <button className="square" id={props.id} disabled={props.status[props.id] && true}
      onClick={() => {
        props.setStatus(update(props.id, props.status, props.nowPlayer? "○":"×"));
        props.changePlayer();
      }}
    >
      {props.status[props.id]}
    </button>
  );
}
// マス全体のステータスを更新
function update(i,status, val){
  status[i] = val;
  return status;
}

export default Square;
