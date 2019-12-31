import React from 'react';
import Counter from './Counter';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { getRandomColor } from '../utils';

import './CounterList.css';

//const CounterList = ({counters, onIncrement, onDecrement, onSetColor}) => {
class CounterList extends React.Component{
  render() {
    const counterList = this.props.counters.map(
          (counter, i) => (
              <Counter 
                  key={i}
                  index={i}
                  {...counter}
                  onIncrement={this.props.onIncrement}
                  onDecrement={this.props.onDecrement}
                  onSetColor={this.props.onSetColor}
              />
          )
      );

      return (
          <div className="CounterList">
              {counterList}
          </div>
      );
  }
};


CounterList.defaultProps = {
    counters: [],
    onIncrement: () => console.warn('onIncrement not defined'),
    onDecrement: () => console.warn('onDecrement not defined'),
    onSetColor: () => console.warn('onSetColor not defined')
}
// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state) => ({
  counters: state.counters
});

/* 
  액션 생성자를 사용하여 액션을 생성하고,
  해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/

const mapDispatchToProps = (dispatch) => ({
  onIncrement: (index) => dispatch(actions.increment(index)),
  onDecrement: (index) => dispatch(actions.decrement(index)),
  onSetColor: (index) => {
      const color = getRandomColor();
      dispatch(actions.setColor({ index, color}));
  }
})

// 데이터와 함수들이 props 로 붙은 컴포넌트 생성
const CounterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterList);


export default CounterListContainer;