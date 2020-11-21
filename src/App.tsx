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
      <p>
        Tab through the fields to trigger validations on blur and edit to see
        errors get removed.
      </p>
      <Box className="display-box">
        <p className="u-align-right">phone.form.tsx</p>
        <CreatePhone />
      </Box>
      <FlexRow>
        <FlexColumn>
          <Box className="display-box">
            <p className="u-align-right">cat.form.tsx</p>
            <CreateCat />
          </Box>
        </FlexColumn>
        <FlexColumn>
          <Box className="display-box">
            <p className="u-align-right">dog.form.tsx</p>
            <CreateDog />
          </Box>
        </FlexColumn>
      </FlexRow>
      <Box className="display-box">
        <div className="u-align-right">
          <p>contact.form.tsx</p>
          <p>phone.form.tsx</p>
          <p>cat.form.tsx</p>
          <p>dog.form.tsx</p>
        </div>
        <CreateContact />
      </Box>
    </div>
  );
}

export default App;
