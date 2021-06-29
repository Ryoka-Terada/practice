import Selectbox from '../atoms/Selectbox';

function SelectLength(props) {
  return (
    <div className="SelectLength">
      <Selectbox
        explain="マス目の数を選択してください"
        // 選択肢を増やす場合はvaluesとlabelsは両方増やすこと→配列のやり方で一緒にできそう
        values={["3","4","5","6"]}
        labels={["３×３","４×４","５×５","６×６"]}
        select={ (length) => {props.select(length)} }
        setStatus={ (statuses) => props.setStatus(statuses) }
      />
    </div>
  );
}

export default SelectLength;
