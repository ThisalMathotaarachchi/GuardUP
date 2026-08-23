import { useState } from 'react';
import ChatReplyOptions from '../ChatReplyOptions';
import AppToolbar from '../AppToolbar';

const CHANNELS = [
  { id: 'colleagues', label: 'Team Chat' },
  { id: 'daniel', label: 'Daniel Perera' },
  { id: 'it-fake', label: 'IT Support' },
  { id: 'security', label: 'Security Operations' },
];

const ChatApp = ({ chat, activePrompt, onDecision, onInteract }) => {
  const [channelId, setChannelId] = useState('colleagues');
  const messages = chat[channelId] || [];
  const showPrompt = activePrompt && activePrompt.context === 'chat' && (
    (activePrompt.decisionId === 'daniel-request' && channelId === 'daniel') ||
    (activePrompt.decisionId === 'it-verification' && channelId === 'it-fake')
  );

  const handleChannel = (id) => {
    setChannelId(id);
    onInteract?.();
  };

  return (
    <div className="lr-chat">
      <header className="lr-app-subheader">
        <h3 className="lr-app-subheader__title">Chat</h3>
        <p className="lr-app-subheader__meta">Aurelia Systems · Direct messages</p>
      </header>
      <div className="lr-chat__layout">
        <nav className="lr-chat__channels" aria-label="Chat channels">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={`lr-chat__channel ${channelId === ch.id ? 'lr-chat__channel--active' : ''}`}
              onClick={() => handleChannel(ch.id)}
            >
              {ch.label}
            </button>
          ))}
        </nav>
        <div className="lr-chat__thread">
          <div className="lr-chat__messages">
            {messages.length === 0 && (
              <p className="lr-chat__empty">No messages in this channel.</p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`lr-chat__message ${msg.incoming ? 'lr-chat__message--in' : 'lr-chat__message--out'}`}
              >
                <span className="lr-chat__sender">{msg.from}</span>
                <p>{msg.text}</p>
                <span className="lr-chat__time">{msg.time}</span>
              </div>
            ))}
          </div>
          {showPrompt && (
            <ChatReplyOptions
              decisionId={activePrompt.decisionId}
              onSelect={(decisionId, optionId) => {
                onInteract?.();
                onDecision(decisionId, optionId);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
