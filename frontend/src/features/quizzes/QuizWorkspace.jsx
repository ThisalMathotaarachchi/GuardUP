import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getQuizById, calculateQuizScore } from '../../data/quizzes';
import { saveQuizResult } from '../../utils/quizStorage';
import { QUIZ_PASS_THRESHOLD } from '../../services/achievementService';
import useAchievementAward from '../../hooks/useAchievementAward';
import BadgePopup from '../simulations/BadgePopup';
import QuizResults from './QuizResults';
import { ChevronLeft, ChevronRight, ClipboardList, ArrowLeft } from 'lucide-react';

const QuizWorkspace = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;
  const quiz = getQuizById(quizId);
  const { award, celebrationBadges, dismissCelebration, hasCelebration } = useAchievementAward();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptKey, setAttemptKey] = useState(0);

  useEffect(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
  }, [quizId, attemptKey]);

  if (!quiz) {
    return (
      <div className="p-6 md:p-10">
        <div className="max-w-xl mx-auto glass-card p-8 text-center">
          <h1 className="text-xl font-bold mb-2">Quiz not found</h1>
          <p className="text-white/65 text-sm mb-6">This quiz does not exist or is unavailable.</p>
          <button type="button" onClick={() => navigate('/dashboard/quizzes')} className="btn-primary py-2">
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const score = submitted ? calculateQuizScore(quiz, answers) : null;

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleSubmit = async () => {
    const result = calculateQuizScore(quiz, answers);
    await saveQuizResult(userId, quiz.id, {
      quizId: quiz.id,
      percentage: result.percentage,
      correct: result.correct,
      incorrect: result.incorrect,
      total: result.total,
    });
    setSubmitted(true);

    if (result.percentage >= QUIZ_PASS_THRESHOLD) {
      await award({
        type: 'quiz',
        quizId: quiz.id,
        percentage: result.percentage,
        passed: true,
      });
    }
  };

  const handleRetry = () => {
    setAttemptKey((prev) => prev + 1);
  };

  if (submitted && score) {
    return (
      <>
        {hasCelebration && (
          <BadgePopup
            badges={celebrationBadges}
            variant="celebration"
            autoDismissMs={3500}
            onClose={dismissCelebration}
          />
        )}
        <QuizResults
          key={attemptKey}
          quiz={quiz}
          answers={answers}
          score={score}
          userId={userId}
          onRetry={handleRetry}
        />
      </>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-2xl mx-auto w-full">
        <button
          type="button"
          onClick={() => navigate('/dashboard/quizzes')}
          className="text-white/65 hover:text-white transition text-sm flex items-center gap-1 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Quizzes
        </button>

        <div className="flex items-center gap-2 mb-1">
          <ClipboardList size={18} className="text-[#6C2BD9]" />
          <span className="text-xs font-medium uppercase tracking-wide text-[#6C2BD9]">Training Quiz</span>
        </div>
        <h1 className="text-xl font-bold page-heading mb-6">{quiz.title}</h1>

        <div className="flex justify-between items-center mb-4 text-sm page-subheading">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% complete</span>
        </div>

        <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-[#6C2BD9] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="glass-card p-6 md:p-8">
          <span className="inline-block badge-purple px-3 py-1 rounded-full text-xs font-medium mb-4">
            {quiz.difficulty}
          </span>
          <h2 className="text-lg font-medium mb-6 leading-relaxed">{currentQ.question}</h2>

          <div className="space-y-2">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={`w-full text-left px-4 py-3 border rounded-lg transition text-sm ${
                    isSelected
                      ? 'border-2 border-[#6C2BD9] bg-white/10'
                      : 'card-inner hover:bg-white/12'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-white/50 w-5">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              className="text-white/65 hover:text-white transition flex items-center gap-1 disabled:opacity-40"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selectedAnswer == null}
                className="btn-primary py-2 px-6 disabled:opacity-50"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                disabled={selectedAnswer == null}
                className="btn-primary py-2 px-6 disabled:opacity-50"
              >
                Next
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizWorkspace;
