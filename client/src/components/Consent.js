import styled, { css } from 'styled-components';

const commonTextStyles = css`
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
`;

const ConsentHeader = styled.h3`
  margin-bottom: 1rem;
`;

const ConsentAside = styled.aside`
  ${commonTextStyles}

  margin-bottom: 1rem;
`;

const ConsentTermsList = styled.ul`
  ${commonTextStyles}

  max-width: 320px;
  text-align: left;
`;

const ConsentTerm = styled.li``;

const ConsentLabel = styled.label`
  ${commonTextStyles}


`;

export {
  ConsentHeader,
  ConsentAside,
  ConsentTermsList,
  ConsentTerm,
  ConsentLabel
}
