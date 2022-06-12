import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import s from './Modal.module.css';

interface ModalProps {
    visible: boolean;
    title: string;
    btnType: any;
    onClose: () => void;
    createSync: (a: string, b: string) => void;
}

const Modal = ({
    visible = false,
    title = '',
    btnType,
    onClose,
    createSync,
}: ModalProps) => {
    const [jiraName, setJiraName] = useState('');
    const [tokenName, setTokenName] = useState('');

    const synchronizeData = (e: any) => {
        e.preventDefault();
        createSync(jiraName, tokenName);
    };

    if (!visible) return null;

    return (
        <div className={s.modal} onClick={onClose}>
            <div
                className={s.modal__dialog}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s.modal__header}>
                    <h2 className={s.modal__title}>{title}</h2>
                    <span className={s.modal__close} onClick={onClose}>
                        <CloseOutlined />
                    </span>
                </div>
                <div className={s.modal__body}>
                    <div className={s.modal__content}>
                        <div>
                            <p className={s.modal__content_title}>JIRA</p>
                            <Input
                                value={jiraName}
                                onChange={(e) => setJiraName(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className={s.modal__content_title}>Token</p>
                            <Input
                                value={tokenName}
                                onChange={(e) => setTokenName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={s.modal__footer}>
                    <Button
                        onClick={synchronizeData}
                        type={btnType.type}
                        loading={btnType.loading}
                    >
                        Synchronize
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
