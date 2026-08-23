const AdminPageHeader = ({ title, subtitle, actions }) => (
  <header className="admin-page-header dashboard-page__header">
    <div>
      <h1 className="admin-page-header__title dashboard-page__title">{title}</h1>
      {subtitle && <p className="admin-page-header__subtitle dashboard-page__subtitle">{subtitle}</p>}
    </div>
    {actions && <div className="admin-page-header__actions">{actions}</div>}
  </header>
);

export default AdminPageHeader;
