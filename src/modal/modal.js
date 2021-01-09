import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import dom from './createDom';
import ModalManager from '@/modal/ModalManager';

const ref = createRef();
ReactDOM.render(<ModalManager ref={ref} />, dom);

const modal = {
  open: ref.current.open,
  close: ref.current.close,
  use: ref.current.use,
  config: ref.current.config,
};

export default modal;
