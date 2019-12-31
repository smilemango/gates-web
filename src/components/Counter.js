import React from 'react';
import './Counter.css';

class Counter extends React.Component{
  handleIncrement=() =>{
    this.props.onIncrement(this.props.index);
  }
  handleDoubleClick = () =>{
    console.log('@handleDoubleClick');
    
    this.props.onSetColor(this.props.index);
  }
  render () {
    return <div 
    className="Counter" 
    onClick={this.handleIncrement} 
    onContextMenu={
        (e) => { 
            e.preventDefault(); 
            this.props.onDecrement(this.props.index);
        }
    } 
    onDoubleClick={this.handleDoubleClick}
    style={{backgroundColor: this.props.color?this.props.color:'black'}}>
        {this.props.number?this.props.number:0}
    </div>    ;
  }
}

export default Counter;