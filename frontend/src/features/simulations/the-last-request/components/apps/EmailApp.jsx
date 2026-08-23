import { useState } from 'react';
import AppToolbar from '../AppToolbar';

const MAIL_TABS = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'sent', label: 'Sent', disabled: true },
  { id: 'drafts', label: 'Drafts', disabled: true },
  { id: 'archive', label: 'Archive', disabled: true },
];

const EmailApp = ({ emails, onRead, onInspectHeaders }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const selected = emails.find((e) => e.id === selectedId);
  const unreadCount = emails.filter((e) => !e.read).length;

  return (
    <div className="lr-email">
      <AppToolbar
        tabs={MAIL_TABS.map((tab) =>
          tab.id === 'inbox' ? { ...tab, badge: unreadCount } : tab
        )}
        activeId={activeTab}
        onSelect={setActiveTab}
        ariaLabel="Mail folders"
      />
      <div className="lr-email__layout">
        <aside className="lr-email__list">
          {emails.map((email) => (
            <button
              key={email.id}
              type="button"
              className={`lr-email__item ${!email.read ? 'lr-email__item--unread' : ''} ${selectedId === email.id ? 'lr-email__item--active' : ''}`}
              onClick={() => {
                setSelectedId(email.id);
                onRead?.(email.id, false);
              }}
            >
              <span className="lr-email__from">{email.from}</span>
              <span className="lr-email__subject">{email.subject}</span>
              <span className="lr-email__time">{email.time}</span>
            </button>
          ))}
        </aside>
        <section className="lr-email__detail">
          {selected ? (
            <>
              <header className="lr-email__header">
                <h3>{selected.subject}</h3>
                <p>
                  <strong>From:</strong> {selected.from} &lt;{selected.fromEmail}&gt;
                </p>
                <p>
                  <strong>To:</strong> Alex Fernando &lt;alex.fernando@aureliasystems.lk&gt;
                </p>
                <p>
                  <strong>Time:</strong> {selected.time}
                </p>
                {selected.headers && (
                  <button
                    type="button"
                    className="lr-email__headers-btn"
                    onClick={() => onInspectHeaders?.(selected.id)}
                  >
                    Inspect sender headers
                  </button>
                )}
              </header>
              {selected.headersVisible && selected.headers && (
                <div className="lr-email__headers">
                  {Object.entries(selected.headers).map(([k, v]) => (
                    <p key={k}>
                      <span>{k}:</span> {v}
                    </p>
                  ))}
                </div>
              )}
              <div className="lr-email__body">
                {selected.body.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="lr-email__empty">Select an email to read.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EmailApp;
