import { ReactElement } from 'react';

type ModalId = string;
type ModalType = string;
type ModalRegister = {
  modalType: ModalType;
  ele: ReactElement;
};

interface Open<T = any> {
  (modalType: ModalType, modalProps: T): Promise<ModalId>;
}

interface Close {
  (modalId: ModalId): void;
}

interface Use {
  (...modalRegisters: ModalRegister[]): void;
}

interface Config {
  (config: {
    transitionName?: string;
    duration?: number;
    transition?: boolean;
    unmountOnExit?: boolean;
  }): void;
}

interface Modal {
  use: Use;
  config: Config;
  close: Close;
  open: Open;
}

declare var modal: Modal;
export = modal;
