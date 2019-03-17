import styled from 'styled-components';

const Section = styled.section`
  padding: 6px 12px;
  ${({ height }) => ( height ? `height: ${height}px;` : '' )}
`;

export default Section;