import { useState } from 'react';
import { FILES } from '../../../../../data/simulations/last-request/appContent';
import AppToolbar from '../AppToolbar';

const FILE_TABS = [
  { id: 'documents', label: 'Documents' },
  { id: 'shared', label: 'Shared', disabled: true },
  { id: 'recent', label: 'Recent', disabled: true },
];

const FileExplorerApp = ({ onOpenFile }) => {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('documents');
  const file = FILES.find((f) => f.id === selected);

  return (
    <div className="lr-files">
      <AppToolbar tabs={FILE_TABS} activeId={activeTab} onSelect={setActiveTab} ariaLabel="File locations" />
      <div className="lr-files__layout">
        <ul className="lr-files__list">
          {FILES.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className={selected === f.id ? 'lr-files__item--active' : ''}
                onClick={() => {
                  setSelected(f.id);
                  onOpenFile?.(f.suspicious);
                }}
              >
                <span className="lr-files__name">{f.name}</span>
                <span className="lr-files__meta">
                  {f.size} · {f.modified}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {file ? (
          <div className="lr-files__preview">
            <h4>{file.name}</h4>
            <p>{file.content}</p>
          </div>
        ) : (
          <div className="lr-files__preview lr-files__preview--empty">
            <p>Select a file to preview.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorerApp;
