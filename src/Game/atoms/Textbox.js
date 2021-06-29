// import React, {useState} from 'react';

function Textbox(props) {
  // const [text, setText] = useState('')
  return (
    <input className="Textbox" type="text" placeholder={props.placeholder}
      onChange={(e) => props.setPlayer(e.target.value)}
      disabled={props.lock? true:false}
    ></input>
  );
}

export default Textbox;
