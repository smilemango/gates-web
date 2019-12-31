import React from 'react';
import PropTypes from 'prop-types';

import './Buttons.css';
import * as actions from '../actions';
import { getRandomColor } from '../utils';
import { connect } from 'react-redux';

//const Buttons = ({onCreate, onRemove}) => {
class Buttons extends React.Component{
  render() {
    const { onCreate, onRemove } = this.props;
    return (
        <div className="Buttons">
            <div className="btn add" onClick={onCreate}>
                생성
            </div>
            <div className="btn remove" onClick={onRemove}>
                제거
            </div>
        </div>
    );
  }
};

Buttons.propTypes = {
    onCreate: PropTypes.func,
    onRemove: PropTypes.func
};

Buttons.defaultProps = {
    onCreate: () => console.warn('onCreate not defined'),
    onRemove: () => console.warn('onRemove not defined')
};

//#endregion// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  onCreate: () => dispatch(actions.create(getRandomColor())),
  onRemove: (index) => dispatch(actions.remove(index))
});

// 리덕스에 연결을 시키고 내보낸다
export default connect(null,mapToDispatch)( Buttons);