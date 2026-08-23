import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  knowledgeArticles,
  getKnowledgeCategories,
  matchesKnowledgeSearch,
  getKnowledgeResourceCounts,
} from '../../data/knowledgeCenterData';
import { getResourcePagePath } from '../../utils/resourceResolver';
import { getDifficultyBadgeClassLight, getTypeLabel } from '../../utils/resourceContent';
import ResourceThumbnail from '../../components/resources/ResourceThumbnail';
import { Search, BookOpen, Video, FileText, Library } from 'lucide-react';

const TYPE_ICONS = {
  article: BookOpen,
  video: Video,
  pdf: FileText,
};

const KnowledgeCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = useMemo(() => ['All', ...getKnowledgeCategories()], []);
  const types = ['All', 'article', 'video', 'pdf'];
  const counts = useMemo(() => getKnowledgeResourceCounts(), []);

  useEffect(() => {
    setVisibleCount(9);
  }, [searchTerm, selectedCategory, selectedType]);

  const filtered = useMemo(
    () => knowledgeArticles.filter((resource) => {
      const matchSearch = matchesKnowledgeSearch(resource, searchTerm);
      const matchCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchType = selectedType === 'All' || resource.type === selectedType;
      return matchSearch && matchCategory && matchType;
    }),
    [searchTerm, selectedCategory, selectedType]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openResource = (resourceId) => {
    navigate(getResourcePagePath(resourceId), { state: { from: 'knowledge-center' } });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__inner">
        <div className="dashboard-page__header">
          <div className="flex items-start gap-3">
            <Library className="text-accent flex-shrink-0 mt-1" size={28} />
            <div>
              <h1 className="dashboard-page__title">Knowledge Center</h1>
              <p className="dashboard-page__subtitle">
                Browse articles, videos, and guides to strengthen your security knowledge.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-body mb-6">
          <span>{counts.total} resources</span>
          <span className="text-caption">|</span>
          <span>{counts.articles} articles</span>
          <span className="text-caption">|</span>
          <span>{counts.videos} videos</span>
          {counts.pdfs > 0 && (
            <>
              <span className="text-caption">|</span>
              <span>{counts.pdfs} guides</span>
            </>
          )}
        </div>

        <div className="surface-card p-5 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-caption" size={18} />
              <input
                type="text"
                placeholder="Search by title, topic, tag, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-light pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-light text-sm min-w-[10rem]"
              >
                <option value="All">All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-light text-sm min-w-[8rem]"
              >
                <option value="All">All Types</option>
                {types.slice(1).map((type) => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-sm text-body mb-4">
          Showing {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
        </div>

        <div className="kc-grid">
          {visible.map((resource) => {
            const TypeIcon = TYPE_ICONS[resource.type] || BookOpen;

            return (
              <button
                key={resource.id}
                type="button"
                onClick={() => openResource(resource.id)}
                className="kc-grid-card"
              >
                <ResourceThumbnail resource={resource} />
                <div className="kc-grid-card__body">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide badge-type-light px-2 py-0.5 rounded-full">
                      <TypeIcon size={12} />
                      {getTypeLabel(resource.type)}
                    </span>
                    {resource.difficulty && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getDifficultyBadgeClassLight(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-heading leading-snug line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-caption text-xs mt-1">{resource.category} · {resource.readTime}</p>
                  <p className="text-body text-sm mt-2 leading-relaxed line-clamp-2 flex-1">
                    {resource.description}
                  </p>
                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="surface-card p-10 text-center">
            <p className="text-body">No resources found matching your search.</p>
            <p className="text-caption text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="btn-primary w-full mt-6"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCenter;
