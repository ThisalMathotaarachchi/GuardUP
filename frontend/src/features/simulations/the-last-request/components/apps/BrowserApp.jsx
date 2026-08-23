import { useState } from 'react';
import { BROWSER_PAGES } from '../../../../../data/simulations/last-request/appContent';
import { Globe, Lock } from 'lucide-react';

const BrowserApp = () => {
  const [pageId, setPageId] = useState('intranet');
  const page = BROWSER_PAGES[pageId];

  return (
    <div className="lr-browser">
      <header className="lr-app-subheader lr-browser__header">
        <div className="lr-browser__chrome">
          <Globe size={14} className="lr-browser__chrome-icon" aria-hidden="true" />
          <select
            value={pageId}
            onChange={(e) => setPageId(e.target.value)}
            className="lr-browser__select"
            aria-label="Address bar"
          >
            {Object.entries(BROWSER_PAGES).map(([id, p]) => (
              <option key={id} value={id}>
                {p.url}
              </option>
            ))}
          </select>
          <Lock size={12} className="lr-browser__secure" aria-hidden="true" title="Secure connection" />
        </div>
      </header>
      <div className="lr-browser__page">
        <h3>{page.title}</h3>
        <p className="lr-browser__url">{page.url}</p>
        {page.content.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default BrowserApp;
