import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { getPerformanceStatus } from '../../data/quizzes';

const QuizResults = ({ quiz, answers, score, onRetry }) => {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const performance = getPerformanceStatus(score.percentage);

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="glass-card p-8 text-center mb-6">
          <p className="text-sm text-white/50 uppercase tracking-wide mb-2">Training Quiz Complete</p>
          <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
          <p className={`text-5xl font-bold mb-2 ${performance.className}`}>{score.percentage}%</p>
          <p className={`text-lg font-semibold mb-4 ${performance.className}`}>{performance.label}</p>
          <p className="text-white/65 text-sm mb-6">{performance.message}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card-inner p-4">
              <p className="text-2xl font-bold text-status-success">{score.correct}</p>
              <p className="text-xs text-white/50 mt-1">Correct</p>
            </div>
            <div className="card-inner p-4">
              <p className="text-2xl font-bold text-status-danger">{score.incorrect}</p>
              <p className="text-xs text-white/50 mt-1">Incorrect</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={onRetry} className="btn-primary py-2 inline-flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Retry Quiz
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/quizzes')}
              className="card-inner px-6 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-white/12 transition inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Quizzes
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
          >
            <span className="font-semibold">Review Answers ({quiz.questions.length} questions)</span>
            {showReview ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
          </button>

          {showReview && (
            <div className="px-5 pb-5 space-y-4 border-t border-white/10">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="card-inner p-4">
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle size={18} className="text-status-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={18} className="text-status-danger flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs text-white/50 mb-1">Question {index + 1}</p>
                        <p className="text-sm font-medium">{question.question}</p>
                      </div>
                    </div>
                    <div className="ml-7 space-y-1 text-sm">
                      <p className={isCorrect ? 'text-status-success' : 'text-status-danger'}>
                        Your answer: {userAnswer != null ? question.options[userAnswer] : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-status-success">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-white/65 text-xs mt-2">{question.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
