import { ComponentType } from 'react';

type ModalId = string;
type ModalType = string;
type ModalRegister = {
  type: ModalType;
  ele: ComponentType;
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
