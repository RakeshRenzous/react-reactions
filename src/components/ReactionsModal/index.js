import React from 'react';
import { ModalWrapper, ModalOverlay } from './styles';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

export default function ReactionTrigger(props) {
  let { onClose } = props;

  return (
    <React.Fragment>
      <ModalOverlay/>
      <ModalWrapper>
        <div className='modal-header'>
          <h2 className='heading'>Reactions</h2>
          <button onClick={() => onClose && onClose()}>
            <CloseIcon/>
          </button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
      </ModalWrapper>
    </React.Fragment>
  );
}
