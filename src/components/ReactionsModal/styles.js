import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
  width: 540px;
  position: fixed;
  top: 10%;
  background-color: ${props => props.theme.components.modal.background};
  z-index: ${props => props.theme.zindex.modal};
  border-radius: ${props => props.theme.radii.large};
  height: 80%;
  display: flex;
  flex-direction: column;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    .heading {
      margin: 0;
    }
  }

  .modal-body {
    overflow-y: auto;
  }
`;

export const ModalOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: ${props => props.theme.zindex.overlay};
  background-color: ${props => props.theme.components.modal.overlayBg};
`;