const AdminStatCard = ({ icon: Icon, label, value, color = '#FFFFFF', sublabel }) => (
  <div className="surface-stat">
    <div className="flex items-center gap-3">
      <div className="surface-stat__icon">
        <Icon size={20} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="surface-stat__label">{label}</p>
        <p className="surface-stat__value">{value ?? '—'}</p>
        {sublabel && <p className="admin-stat-card__sublabel">{sublabel}</p>}
      </div>
    </div>
  </div>
);

export default AdminStatCard;
