import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import * as uuid from 'uuid';
import styles from './modals.module.scss';
import produce, { enableES5 } from 'immer';
import { CSSTransition } from 'react-transition-group';

enableES5();
const ModalManager = forwardRef((props, ref) => {
  const [modalChannel, setModalChannel] = useState([]);
  const [modals, setModals] = useState([]);
  const [config, setConfig] = useState({
    transitionName: 'fade-in',
    duration: 300,
    transition: true,
    unmountOnExit: false,
  });
  const nodeRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
    use: modals => {
      setModals(
        produce(draft => {
          draft.push(...modals);
        })
      );
    },
    config(conf) {
      setConfig(
        produce(draft => {
          Object.assign(draft, conf);
        })
      );
    },
  }));

  function open(modalType, modalProps) {
    return new Promise(resolve => {
      setModalChannel(
        produce(draft => {
          let id = '';
          draft.forEach((modal, index) => {
            if (
              modal.modalType === modalType &&
              modal.modalProps?.open === false &&
              id === ''
            ) {
              modal.modalProps = { open: true, ...modalProps };

              id = modal.modalId;
              const sliceItem = draft.splice(index, 1)[0];
              draft.push(sliceItem);
            }
          });
          if (id !== '') {
            resolve(id);
          } else {
            id = uuid.v4();
            resolve(id);
            draft.push({
              modalType,
              modalId: id,
              modalProps: { open: true, ...modalProps },
            });
          }
        })
      );
    });
  }

  function close(modalId) {
    setModalChannel(
      produce(modalChannel => {
        modalChannel.forEach(channel => {
          if (channel.modalId === modalId) {
            channel.modalProps = {
              ...(channel.modalProps || {}),
              open: false,
            };
          }
        });
      })
    );
  }

  useEffect(() => {
    if (modalChannel.length > 0) {
      setShowModal(true);
    }
  }, [modalChannel.length]);

  if (config.transition) {
    return (
      <>
        <CSSTransition
          in={modalChannel.some(modalChannel => modalChannel.modalProps?.open)}
          timeout={config.duration}
          classNames="modal"
          unmountOnExit={config.unmountOnExit}
        >
          <div
            className={styles.modal}
            ref={nodeRef}
            style={{ display: showModal ? '' : 'none' }}
          />
        </CSSTransition>
        {modalChannel.map(modalChannel => {
          const ModalCom = modals.find(
            modal => modal.type === modalChannel.modalType
          )?.ele;
          if (!ModalCom) {
            throw Error('请确保该弹窗已注册！');
          }
          const props = modalChannel.modalProps;
          return (
            <CSSTransition
              key={modalChannel.modalId}
              classNames={config.transitionName}
              timeout={config.duration}
              unmountOnExit={config.unmountOnExit}
              appear={true}
              in={modalChannel.modalProps.open}
            >
              <ModalCom {...props} />
            </CSSTransition>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <div
          className={styles.modal}
          style={
            !modalChannel.some(modalChannel => modalChannel.modalProps?.open)
              ? { display: 'none' }
              : {}
          }
        />
        {modalChannel.map(modalChannel => {
          const ModalCom = modals.find(
            modal => modal.type === modalChannel.modalType
          )?.ele;

          if (!ModalCom) {
            throw Error('请确保该弹窗已注册！');
          }
          const props = modalChannel.modalProps;
          return (
            <div
              style={{ display: props.open ? '' : 'none' }}
              key={modalChannel.modalId}
            >
              <ModalCom {...props} key={modalChannel.modalId} />
            </div>
          );
        })}
      </>
    );
  }
});
export default ModalManager;
