import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';

import api from '../../services/api';

import Badge, { normalizeBadge } from '../../components/common/Badge';

import { Award, TrendingUp, Shield, Medal, Target, Flame, Crosshair } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { getAllCertificationSummaries } from '../../utils/certificationProgress';



const chartTooltipStyle = {

  background: 'rgba(10, 10, 10, 0.95)',

  border: '1px solid rgba(255, 255, 255, 0.12)',

  borderRadius: '10px',

  color: '#FFFFFF',

  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',

};



const Statistics = () => {

  const { user } = useAuth();

  const [history, setHistory] = useState([]);

  const [stats, setStats] = useState({ totalXP: 0, totalSims: 0, avgScore: 0, badges: [], totalHours: 0 });

  const [loading, setLoading] = useState(true);



  const certSummaries = getAllCertificationSummaries(user?.id, user);

  const certsCompleted = certSummaries.filter((s) => s.status === 'completed').length;



  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await api.get('/users/stats');

        setStats(res.data.data);

        const hist = await api.get('/simulations/history');

        setHistory(hist.data.data || []);

      } catch (e) { console.error(e); }

      setLoading(false);

    };

    fetchData();

  }, [user?.id]);



  if (loading) return <div className="dashboard-page"><div className="dashboard-page__inner"><p className="text-body">Loading statistics...</p></div></div>;



  const chartData = history.map((h) => ({ name: h.simulationId?.slice(0, 10) || 'Sim', score: h.score || 0 }));

  const pieData = [

    { name: 'Passed', value: history.filter((h) => h.score >= 60).length },

    { name: 'Failed', value: history.filter((h) => h.score < 60).length },

  ];

  const threatsIdentified = history.filter((h) => h.score >= 60).length;



  const statCards = [

    { icon: Shield, label: 'Security Level', value: user?.skillLevel?.replace('_', ' ') || 'Not Assigned', color: '#FFFFFF' },

    { icon: Award, label: 'Certifications Completed', value: certsCompleted, color: '#22C55E' },

    { icon: Crosshair, label: 'Simulations Completed', value: stats.totalSims || 0, color: '#A1A1AA' },

    { icon: Target, label: 'Average Knowledge Score', value: `${stats.avgScore || 0}%`, color: '#EAB308' },

    { icon: Flame, label: 'Current Streak', value: `${user?.streak || 0}`, color: '#EF4444' },

    { icon: TrendingUp, label: 'Threats Successfully Identified', value: threatsIdentified, color: '#FFFFFF' },

  ];



  return (

    <div className="dashboard-page">

      <div className="dashboard-page__inner">

        <div className="dashboard-page__header">

          <h1 className="dashboard-page__title">Statistics</h1>

          <p className="dashboard-page__subtitle">Your security performance at a glance</p>

        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

          {statCards.map(({ icon: Icon, label, value, color }) => (

            <div key={label} className="surface-stat">

              <div className="flex items-center gap-3">

                <div className="surface-stat__icon">

                  <Icon size={22} style={{ color }} />

                </div>

                <div>

                  <p className="surface-stat__label">{label}</p>

                  <p className="surface-stat__value">{value}</p>

                </div>

              </div>

            </div>

          ))}

        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <div className="surface-card p-6">

            <h3 className="font-semibold text-heading mb-4">Score Trend</h3>

            <ResponsiveContainer width="100%" height={250}>

              <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />

                <XAxis dataKey="name" stroke="#71717A" fontSize={12} />

                <YAxis stroke="#71717A" fontSize={12} domain={[0, 100]} />

                <Tooltip contentStyle={chartTooltipStyle} />

                <Line type="monotone" dataKey="score" stroke="#FFFFFF" strokeWidth={2} dot={{ fill: '#FFFFFF' }} />

              </LineChart>

            </ResponsiveContainer>

          </div>



          <div className="surface-card p-6">

            <h3 className="font-semibold text-heading mb-4">Pass / Fail Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>

              <PieChart>

                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={{ fill: '#A1A1AA', fontSize: 12 }}>

                  {pieData.map((entry, index) => (

                    <Cell key={entry.name} fill={index === 0 ? '#22C55E' : '#EF4444'} />

                  ))}

                </Pie>

                <Tooltip contentStyle={chartTooltipStyle} />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>



        {stats.badges?.length > 0 && (

          <div className="surface-card p-6">

            <h3 className="font-semibold text-heading mb-4 flex items-center gap-2"><Medal size={18} className="text-[#EAB308]" />Recent Badges</h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">

              {stats.badges.slice(0, 6).map((b, i) => (

                <div key={i} className="flex flex-col items-center gap-2 text-center">

                  <Badge badge={normalizeBadge(b)} size="md" />

                  <span className="text-xs text-caption">{b.name}</span>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

};



export default Statistics;

