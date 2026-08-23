import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { quizzes } from '../../data/quizzes';
import { getQuizResult } from '../../utils/quizStorage';
import {
  ClipboardList,
  Clock,
  Target,
  ChevronRight,
  Mail,
  KeyRound,
  Users,
  Shield,
  CheckCircle,
} from 'lucide-react';

const ICONS = {
  mail: Mail,
  key: KeyRound,
  users: Users,
  shield: Shield,
};

const Quizzes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="text-[#6C2BD9]" size={28} />
          <h1 className="text-3xl font-bold page-heading">Quizzes</h1>
        </div>
        <p className="page-subheading mb-8">
          Reinforce your cybersecurity knowledge with topic-based training quizzes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const Icon = ICONS[quiz.icon] || ClipboardList;
            const lastResult = getQuizResult(userId, quiz.id);
            const questionCount = quiz.questions.length;

            return (
              <div key={quiz.id} className="glass-card glass-card-hover p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{quiz.title}</h3>
                    <p className="text-white/65 text-sm mt-1">{quiz.description}</p>
                  </div>
                  <Icon size={28} className="text-[#F59E0B] flex-shrink-0" />
                </div>

                <div className="flex items-center gap-4 text-sm text-white/65 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Target size={16} />
                    <span>{quiz.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClipboardList size={16} />
                    <span>{questionCount} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{quiz.timeEstimate}</span>
                  </div>
                  {lastResult && (
                    <span className="text-status-success font-medium flex items-center gap-1">
                      <CheckCircle size={14} />
                      Last score: {lastResult.percentage}%
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/quizzes/${quiz.id}`)}
                  className="btn-primary py-2 inline-flex items-center gap-2"
                >
                  {lastResult ? 'Retry Quiz' : 'Start Quiz'}
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
