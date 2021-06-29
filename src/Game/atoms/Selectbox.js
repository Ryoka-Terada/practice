function Selectbox(props) {
  // 引数に応じたセレクトボックスを作成
  var options = [];
  for(var i=0; i<props.values.length; i++){
    options.push(<option value={props.values[i]}>{props.labels[i]}</option>);
  }
  return (
    <select id="choiceBoard" className="Selectbox"
      onChange={(e)=>{
        props.select(e.target.value);
        props.setStatus(setEmpty(e.target.value))
      }}
    >
      <option disabled selected>{props.explain}</option>
      {options}
    </select>
  );
}
// 選択されたマス分の空配列をセット
function setEmpty(val){
  return Array(val*val).fill(null);
}

export default Selectbox;
