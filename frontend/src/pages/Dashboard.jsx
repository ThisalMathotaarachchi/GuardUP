import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { Shield, Award, Target, BookOpen, ChevronRight, Flame, Clock } from 'lucide-react';

import Badge, { normalizeBadge } from '../components/common/Badge';

import { getLearningPath } from '../data/learningPaths';

import { useEffect, useState } from 'react';

import api from '../services/api';



const Dashboard = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const skillLevel = user?.skillLevel || 'BEGINNER';

  const path = getLearningPath(skillLevel);

  const [recentActivity, setRecentActivity] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchActivity = async () => {

      try {

        const res = await api.get('/simulations/history');

        setRecentActivity(res.data.data?.slice(0, 3) || []);

      } catch (e) { console.error(e); }

      setLoading(false);

    };

    fetchActivity();

  }, []);



  const statCards = [

    { icon: Award, label: 'XP Points', value: user?.xp || 0, color: '#EAB308' },

    { icon: Target, label: 'Level', value: user?.level || 1, color: '#FFFFFF' },

    { icon: Shield, label: 'Skill Level', value: user?.skillLevel?.replace('_', ' ') || 'Not Assigned', color: '#22C55E' },

    { icon: Flame, label: 'Streak', value: user?.streak || 0, color: '#EF4444', isStreak: true },

  ];



  return (

    <div className="dashboard-page">

      <div className="dashboard-page__inner">

        <div className="dashboard-page__header">

          <h1 className="dashboard-page__title">Welcome back, {user?.firstName}</h1>

          <p className="dashboard-page__subtitle">Continue your cybersecurity awareness journey</p>

        </div>



        <div className="gu-glass-grid gu-glass-grid--4 mb-8">

          {statCards.map(({ icon: Icon, label, value, color, isStreak }) => (

            <div key={label} className="surface-stat">

              <div className="flex items-center gap-3">

                <div className="surface-stat__icon">

                  <Icon size={20} style={{ color }} />

                </div>

                <div className="min-w-0">

                  <p className="surface-stat__label">{label}</p>

                  {isStreak ? (

                    <div>

                      <p className="surface-stat__value">{value}</p>

                      <p className="text-xs text-caption">simulations</p>

                    </div>

                  ) : (

                    <p className="surface-stat__value">{value}</p>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 surface-card p-6">

            <div className="flex items-center justify-between mb-4">

              <div>

                <h3 className="font-semibold text-lg text-heading">Your Learning Path</h3>

                <p className="text-sm text-body">{path.title}</p>

              </div>

              <button

                type="button"

                onClick={() => navigate('/dashboard/learning-path')}

                className="transition text-sm flex items-center gap-1 font-medium text-accent hover:opacity-80"

              >

                View All<ChevronRight size={16} />

              </button>

            </div>

            <div className="space-y-2">

              {path.modules.slice(0, 3).map((module, index) => (

                <div key={module.id} className="flex items-center justify-between surface-card-inner px-4 py-3">

                  <div className="flex items-center gap-3">

                    <span className="text-sm font-mono text-caption">#{index + 1}</span>

                    <span className="text-sm text-heading">{module.title}</span>

                  </div>

                  <span className="text-xs text-caption">{module.timeEstimate}</span>

                </div>

              ))}

            </div>

          </div>



          <div className="surface-card p-6">

            <h3 className="font-semibold text-lg text-heading mb-4">Quick Actions</h3>

            <div className="space-y-2">

              <button

                type="button"

                onClick={() => navigate('/dashboard/simulations')}

                className="w-full text-left surface-card-inner px-4 py-3 transition text-sm flex items-center gap-2 text-heading hover:border-[rgba(255,255,255,0.14)]"

              >

                <Shield size={16} className="text-[#EAB308]" />Start a Simulation

              </button>

              <button

                type="button"

                onClick={() => navigate('/dashboard/knowledge-center')}

                className="w-full text-left surface-card-inner px-4 py-3 transition text-sm flex items-center gap-2 text-heading hover:border-[rgba(255,255,255,0.14)]"

              >

                <BookOpen size={16} className="text-accent" />Browse Knowledge Center

              </button>

            </div>

          </div>

        </div>



        {(user?.badges?.length ?? 0) > 0 && (

          <div className="surface-card p-6 mb-8">

            <h3 className="font-semibold text-lg text-heading mb-4 flex items-center gap-2">

              <Award size={18} className="text-[#EAB308]" />Recent Badges

            </h3>

            <div className="flex items-center gap-4 overflow-x-auto pb-1">

              {user.badges.slice(-5).reverse().map((b, i) => (

                <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px]">

                  <Badge badge={normalizeBadge(b)} size="sm" />

                  <span className="text-[10px] text-center leading-tight max-w-[72px] truncate text-caption">{b.name}</span>

                </div>

              ))}

            </div>

          </div>

        )}



        <div className="surface-card p-6">

          <h3 className="font-semibold text-lg text-heading mb-4 flex items-center gap-2">

            <Clock size={18} className="text-accent" />Recent Activity

          </h3>

          {loading ? (

            <p className="text-sm text-body">Loading...</p>

          ) : recentActivity.length > 0 ? (

            <div className="space-y-2">

              {recentActivity.map((item, i) => (

                <div key={i} className="flex items-center justify-between surface-card-inner px-4 py-3">

                  <span className="text-sm text-heading">{item.simulationId}</span>

                  <span className="text-sm font-medium text-status-success">{item.score}%</span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-body">No recent activity. Start a simulation to track your progress.</p>

          )}

        </div>

      </div>

    </div>

  );

};



export default Dashboard;

