import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modal from '@/modal';
import ErrorModal from '@/components/ErrorModal';

modal.use([{ type: 'error', ele: ErrorModal }]);
const App = () => {
  useEffect(() => {
    (async () => {
      const modalId = await modal.open('error', {
        onClose: async () => {
          modal.close(modalId);
          const modalId2 = await modal.open('error', {
            onClose() {
              modal.close(modalId2);
            },
          });
        },
      });
    })();
  }, []);

  return <div>app</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
