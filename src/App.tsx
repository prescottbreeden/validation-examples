import React from 'react';
import { Box, FlexColumn, FlexRow } from 'layouts';
import { CreateContact } from 'components/CreateContact.component';
import { CreateDog } from 'components/CreateDog.component';
import { CreateCat } from 'components/CreateCat.component';
import { CreatePhone } from 'components/CreatePhone.component';

function App() {
  return (
    <div className="App">
      <h1>Validation Demo</h1>
      <Box className="display-box">
        <CreatePhone />
      </Box>
      <FlexRow>
        <FlexColumn>
          <Box className="display-box">
            <CreateCat />
          </Box>
        </FlexColumn>
        <FlexColumn>
          <Box className="display-box">
            <CreateDog />
          </Box>
        </FlexColumn>
      </FlexRow>
      <Box className="display-box">
        <CreateContact />
      </Box>
    </div>
  );
}

export default App;
