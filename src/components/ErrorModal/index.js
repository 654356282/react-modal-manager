import React from 'react';
import styles from "./ErrorModal.module.scss"

const ErrorModal = ({onClose}) => {
    return (
        <div className={styles.bg}>
            Error
            <button onClick={onClose}>关闭</button>
        </div>
    );
};

export default ErrorModal;