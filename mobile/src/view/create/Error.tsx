import React from 'react';
import {Dialog, Paragraph, Portal} from 'react-native-paper';

const PopUpError = (error: any, setError: any) => {
  const hideDialog = () => setError(false);

  return (
    <Portal>
      <Dialog visible={error} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>Put an action first !</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default PopUpError;
