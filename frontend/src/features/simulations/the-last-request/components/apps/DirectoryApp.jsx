import { useState } from 'react';
import { EMPLOYEES } from '../../../../../data/simulations/last-request/appContent';

const DirectoryApp = ({ onVerify }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const results = EMPLOYEES.filter(
    (e) =>
      !query ||
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.role.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (emp) => {
    setSelected(emp);
    onVerify?.();
  };

  return (
    <div className="lr-directory">
      <header className="lr-app-subheader">
        <h3 className="lr-app-subheader__title">Employee Directory</h3>
        <p className="lr-app-subheader__meta">Aurelia Systems · Internal lookup</p>
      </header>
      <input
        type="search"
        className="lr-directory__search"
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="lr-directory__layout">
        <ul className="lr-directory__list">
          {results.map((emp) => (
            <li key={emp.id}>
              <button type="button" onClick={() => handleSelect(emp)}>
                {emp.name} — {emp.role}
              </button>
            </li>
          ))}
        </ul>
        {selected ? (
          <div className="lr-directory__detail">
            <h3>{selected.name}</h3>
            <p>{selected.role}</p>
            <p>Department: {selected.department}</p>
            <p>Employee ID: {selected.employeeId}</p>
            <p>Extension: {selected.extension}</p>
            <p>Email: {selected.email}</p>
            {selected.officialPhone && <p>Official phone: {selected.officialPhone}</p>}
            <p>{selected.location}</p>
          </div>
        ) : (
          <div className="lr-directory__detail lr-directory__detail--empty">
            <p>Select an employee to view contact details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryApp;
