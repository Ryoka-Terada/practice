import React from 'react';

class RootsTmp extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            // イベントを二つ行う場合、こういう風に書く
            botan: <div><button onClick={() => {this.change(); this.change2()}}>これを変えたい</button></div>,
            botan2: <p>そして私は世界を支配する。</p>,
        };
    }

    render(){
        /* ここに書くと無限ループで落ちる */
        // this.setState({
        //     botan: <div><button>こうしたい</button><br /><button>めちゃめちゃこうしたい</button></div>,
        // });
        return(
            <div>{this.state.botan}{this.state.botan2}</div>
        );
    }

    change(){
        console.log("move");
        this.setState({
            botan: <div><button>こうしたい</button><br /><button>めちゃめちゃこうしたい</button></div>,
        });
    }
    change2(){
        console.log("moving");
        this.setState({
            botan2: <p>たとえ全てを敵に回しても……</p>,
        })
    }
}

export default RootsTmp;