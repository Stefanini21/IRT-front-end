import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {Button, Modal, ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {getSecondsRemaining} from './useSecondsRemining';
import {signOut} from './utils';
import {signOutUser} from "../redux/actions/auth.js";

const SessionExpirationModal = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(getSecondsRemaining());

    const [sessionExpired, setSessionExpired] = useState(false);
    const [disableModal, setDisableModal] = useState(false);
    const [modalDisplayed] = useState(false);

    useEffect(() => {
        let allSecondsRemaining = setInterval(() => {
          setSecondsRemaining(getSecondsRemaining());
    
          // takes about 350 ms for modal to open
        //   if (!disableModal && secondsRemaining === 31 && !modalDisplayed) {
        //     setShowModal(true);
        //   }
    
          if (disableModal && secondsRemaining === 10) setDisableModal(false);
          if (!disableModal && secondsRemaining <= 10 && !showModal) {
            setShowModal(true);
          }
          if (secondsRemaining <= 0) {
            if (!showModal) setShowModal(true);
    
            clearInterval(allSecondsRemaining);
            signOut();
                return handleLogOut();
            }
        }, 1000);

        return () => {
            clearInterval(allSecondsRemaining);
        };
    });

    const handleLogOut = () => {
        dispatch(signOutUser(history));
    };

    const toggle = () => setShowModal(!showModal);

    // const extendPageSession = () => {
    //   setShowModal(false);

    //   const seconds = extendSlidingExpiration();

    //   if (seconds === 0) {
    //     setSessionExpired(true);
    //     if (!showModal) setShowModal(true);

    //     signOut();
    //     return history.push('/signin?' + getPage());
    //   }

    //   setSecondsRemaining(seconds);

    //   setShowModal(false);
    // };

    // const disableModalCheck = () => {
    //   setDisableModal(true);
    //   toggle();

    //   if (secondsRemaining < 10) setDisableModal(true);
    // };

    return (
        <Modal isOpen={showModal} autoFocus={true} toggle={toggle} centered={true} style={{top: -60}}>
            {sessionExpired && (
                <>
                    <ModalHeader toggle={toggle}>Your Session Expired</ModalHeader>
                    <div className='text-center pt-2 pb-2'>
                        We experienced an error extending your session.
                        <br/>
                        Signing out...
                        <br/>
                        <FontAwesomeIcon className='icon' icon={faSpinner} spin size='lg'/>
                    </div>
                </>
            )}

            {!sessionExpired && secondsRemaining > 0 && (
                <>
                    <ModalHeader toggle={toggle} style={{fontWeight: 300, padding: 20}}>Your session will expire in
                        {` ${secondsRemaining}`} sec.</ModalHeader>
                    <div className='text-center pt-2 pb-2'>
                        <h5 style={{fontWeight: 400, padding: "10px 60px 0", margin: 0}}>To continue working, please log in the system</h5>
                        <br/>
                        <Button color='primary' onClick={() => handleLogOut()} style={{top: -30, marginBottom: 16}}>
                            Login
                        </Button>
                    </div>
                </>
            )}
            {!sessionExpired && secondsRemaining < 1 && (
                <div className='text-center pt-2 pb-2'>
                    <h5>Signing Out...</h5>
                    <FontAwesomeIcon className='icon' icon={faSpinner} spin size='lg'/>
                </div>
            )}
        </Modal>
    );
};

export default SessionExpirationModal;
