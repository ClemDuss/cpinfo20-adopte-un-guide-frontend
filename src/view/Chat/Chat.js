import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './Chat.css';
import { Store, Cloud } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const [isOpened, setIsOpened] = useState(false);
    return(
        <div className="chat-container" style={{bottom: isOpened ? 0 : -400}}>
            <div className="button-container">
                <div className="left-shadow"></div>
                <button className="chat-button" onClick={ () => {setIsOpened(!isOpened)}}>Messages</button>
                <div className="right-shadow"></div>
            </div>
            <div className="msg-window">
                <div className="fake-author">Admin</div>
                <div className="fake-msg">Bientôt disponible...</div>
            </div>
            <div className="interaction">
                <textarea className="text-box"></textarea>
                <div className="send-button-container">
                    <Button className="send-button" color="default" startIcon={<SendIcon />}></Button>
                </div>
            </div>
            
        </div>
    )
}

export default Chat;

/*diagramme appli react firebase firestore, site heberge avec firebase 
avec des fleches

services utilisées

problematiques résolues en utilisant le cloud, avantages à utiliser react*/

