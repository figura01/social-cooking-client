import React from 'react';
import { Container } from 'semantic-ui-react';

const MainContainer = ({ children, ...props}) => {
  return (
    <Container {...props} >
      { children }
    </Container>
  )
}

export default MainContainer
