import styled from 'styled-components';

const Dropzone = styled.div`
  position: absolute;
  top: 0;

  height: 320px;
  width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 160px;
  border: 1px solid #6F3092;

  text-align: center;

  padding: 12px 48px;

  background: ${({ isDragActive }) => (isDragActive ?  '#6F3092' : 'none')};
  transition-property: all;
  transition-duration: 0.35s;

  &:focus {
    outline: none;
  }
`;

export default Dropzone;
