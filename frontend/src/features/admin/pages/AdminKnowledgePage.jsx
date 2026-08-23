import { BookOpen, FileText } from 'lucide-react';
import { knowledgeArticles, getKnowledgeCategories, getKnowledgeResourceCounts } from '../../../data/knowledgeCenterData';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminStatCard from '../../../components/admin/AdminStatCard';

const AdminKnowledgePage = () => {
  const categories = getKnowledgeCategories();
  const counts = getKnowledgeResourceCounts();

  const articlesByCategory = categories.map((category) => ({
    category,
    articles: knowledgeArticles.filter((a) => a.category === category),
  }));

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Knowledge Center"
        subtitle="Read-only overview of platform learning resources"
      />

      <div className="admin-stat-grid admin-stat-grid--3 mb-8">
        <AdminStatCard icon={BookOpen} label="Categories" value={categories.length} color="#FFFFFF" />
        <AdminStatCard icon={FileText} label="Total Resources" value={counts.total} color="#A1A1AA" />
        <div className="surface-stat">
          <div className="min-w-0">
            <p className="surface-stat__label">Articles / Videos / PDFs</p>
            <p className="surface-stat__value">{counts.articles} / {counts.videos} / {counts.pdfs}</p>
          </div>
        </div>
      </div>

      <div className="admin-card-grid">
        {articlesByCategory.map(({ category, articles }) => (
          <article key={category} className="admin-card">
            <h3 className="admin-card__title">{category}</h3>
            <p className="admin-card__meta">{articles.length} resources</p>
            <ul className="admin-tag-list mt-4">
              {articles.slice(0, 4).map((article) => (
                <li key={article.id} className="admin-tag">{article.title}</li>
              ))}
              {articles.length > 4 && (
                <li className="admin-tag admin-tag--muted">+{articles.length - 4} more</li>
              )}
            </ul>
          </article>
        ))}
      </div>

      <p className="admin-footnote">
        This is a read-only administrative view of frontend knowledge content. User reading progress is not tracked server-side.
      </p>
    </div>
  );
};

export default AdminKnowledgePage;
