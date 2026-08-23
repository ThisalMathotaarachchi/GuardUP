import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  RotateCcw,
  Flag,
  ClipboardCheck,
} from 'lucide-react';
import { getQuizById, calculateQuizScore, getPerformanceStatus } from '../../../data/quizzes';
import { saveQuizResult, getQuizResult } from '../../../utils/quizStorage';
import { QUIZ_PASS_THRESHOLD } from '../../../utils/certificationProgress';

const CertificationQuizActivity = ({
  quizId,
  activity,
  userId,
  variant = 'quiz',
  onContinue,
  isReview,
}) => {
  const quiz = getQuizById(quizId);
  const passThreshold = activity.metadata?.passThreshold ?? QUIZ_PASS_THRESHOLD;
  const isFinal = variant === 'final';

  const storedResult = getQuizResult(userId, quizId);
  const storedPassed = storedResult != null && storedResult.percentage >= passThreshold;

  const [phase, setPhase] = useState(() => {
    if (isReview && storedPassed) return 'results';
    if (isFinal) return 'intro';
    return 'questions';
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptKey, setAttemptKey] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (phase === 'questions') {
      setCurrentQuestion(0);
      setAnswers({});
      setSubmitted(false);
      setShowReview(false);
    }
  }, [quizId, attemptKey, phase]);

  if (!quiz) {
    return (
      <div className="cert-learn-empty">
        <p>This knowledge check is not yet available.</p>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQ?.id];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const score = submitted ? calculateQuizScore(quiz, answers) : null;
  const displayScore = score || (storedResult && phase === 'results'
    ? {
      correct: storedResult.correct,
      incorrect: storedResult.incorrect,
      total: storedResult.total,
      percentage: storedResult.percentage,
    }
    : null);
  const passed = displayScore != null && displayScore.percentage >= passThreshold;
  const performance = displayScore ? getPerformanceStatus(displayScore.percentage) : null;

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
    setPhase('results');
  };

  const handleRetry = () => {
    setAttemptKey((prev) => prev + 1);
    setPhase(isFinal ? 'intro' : 'questions');
  };

  const handleStartAssessment = () => {
    setPhase('questions');
  };

  if (phase === 'intro' && isFinal) {
    return (
      <div className="cert-learn-assessment-intro">
        <div className="cert-learn-assessment-intro__badge">
          <Flag size={22} />
        </div>
        <h2 className="cert-learn-assessment-intro__title">Final Certification Assessment</h2>
        <p className="cert-learn-assessment-intro__text">
          This assessment evaluates whether you can apply what you learned throughout the certification.
          You need {passThreshold}% or higher to earn your certificate.
        </p>
        <ul className="cert-learn-list cert-learn-assessment-intro__list">
          <li>{totalQuestions} comprehensive questions covering the full certification journey</li>
          <li>No feedback during the attempt — review explanations after submission</li>
          <li>You may retry if you do not meet the passing threshold</li>
        </ul>
        <p className="cert-learn-assessment-intro__meta">
          {activity.description}
        </p>
        <div className="cert-learn-actions">
          <button type="button" onClick={handleStartAssessment} className="cert-btn cert-btn--primary cert-btn--lg">
            Begin Final Assessment
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results' && displayScore && performance) {
    const reviewAnswers = submitted ? answers : null;

    return (
      <div className="cert-learn-quiz-results">
        <div className={`cert-learn-quiz-results__hero ${passed ? 'cert-learn-quiz-results__hero--pass' : 'cert-learn-quiz-results__hero--fail'}`}>
          {passed ? <CheckCircle size={40} /> : <XCircle size={40} />}
          <p className="cert-learn-quiz-results__label">
            {isFinal ? 'Final Assessment Complete' : 'Knowledge Check Complete'}
          </p>
          <p className="cert-learn-quiz-results__score">{displayScore.percentage}%</p>
          <p className={`cert-learn-quiz-results__status ${passed ? 'cert-learn-quiz-results__status--pass' : 'cert-learn-quiz-results__status--fail'}`}>
            {passed ? (isFinal ? 'Certification Passed' : performance.label) : 'Did Not Pass'}
          </p>
          <p className="cert-learn-quiz-results__message">{performance.message}</p>
          <div className="cert-learn-quiz-results__stats">
            <div>
              <p className="cert-learn-quiz-results__stat-value cert-learn-quiz-results__stat-value--good">
                {displayScore.correct}
              </p>
              <p className="cert-learn-quiz-results__stat-label">Correct</p>
            </div>
            <div>
              <p className="cert-learn-quiz-results__stat-value cert-learn-quiz-results__stat-value--bad">
                {displayScore.incorrect}
              </p>
              <p className="cert-learn-quiz-results__stat-label">Incorrect</p>
            </div>
          </div>
        </div>

        <div className="cert-learn-quiz-review">
          <button
            type="button"
            className="cert-learn-quiz-review__toggle"
            onClick={() => setShowReview(!showReview)}
          >
            <span>Review answers & explanations ({totalQuestions} questions)</span>
            {showReview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {showReview && (
            <div className="cert-learn-quiz-review__list">
              {quiz.questions.map((question, index) => {
                const userAnswer = reviewAnswers
                  ? reviewAnswers[question.id]
                  : undefined;
                const isCorrect = userAnswer === question.correctAnswer;
                const showAsCorrect = reviewAnswers != null ? isCorrect : null;

                return (
                  <div key={question.id} className="cert-learn-quiz-review__item">
                    <div className="cert-learn-quiz-review__question">
                      {showAsCorrect === true && <CheckCircle size={16} className="text-[#059669]" />}
                      {showAsCorrect === false && <XCircle size={16} className="text-[#DC2626]" />}
                      <div>
                        <p className="cert-learn-quiz-review__q-label">Question {index + 1}</p>
                        <p>{question.question}</p>
                      </div>
                    </div>
                    {reviewAnswers != null && (
                      <div className="cert-learn-quiz-review__answers">
                        <p className={isCorrect ? 'cert-learn-quiz-review__your--good' : 'cert-learn-quiz-review__your--bad'}>
                          Your answer: {userAnswer != null ? question.options[userAnswer] : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="cert-learn-quiz-review__correct">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="cert-learn-quiz-review__explanation">{question.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="cert-learn-actions cert-learn-actions--split">
          {passed ? (
            <button type="button" onClick={onContinue} className="cert-btn cert-btn--primary cert-btn--lg">
              {isFinal ? 'View Certification Completion' : 'Continue Certification'}
            </button>
          ) : (
            <button type="button" onClick={handleRetry} className="cert-btn cert-btn--secondary cert-btn--lg">
              <RotateCcw size={18} />
              {isFinal ? 'Retry Final Assessment' : 'Retry Knowledge Check'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="cert-learn-quiz">
      {!isFinal && (
        <p className="cert-learn-quiz__intro">{activity.description}</p>
      )}

      <div className="cert-learn-quiz__meta">
        <span className="cert-learn-quiz__meta-item">
          <ClipboardCheck size={16} />
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% complete</span>
      </div>

      <div className="cert-learn-quiz__progress">
        <div
          className="cert-learn-quiz__progress-fill"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="cert-learn-quiz__card">
        <span className="cert-learn-badge cert-learn-badge--accent">{quiz.difficulty}</span>
        <h2 className="cert-learn-quiz__question">{currentQ.question}</h2>

        <div className="cert-learn-quiz__options">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                className={`cert-learn-quiz__option ${isSelected ? 'cert-learn-quiz__option--selected' : ''}`}
              >
                <span className="cert-learn-quiz__option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        <div className="cert-learn-quiz__nav">
          <button
            type="button"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
            className="cert-learn-quiz__nav-btn"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedAnswer == null}
              className="cert-btn cert-btn--primary"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={selectedAnswer == null}
              className="cert-btn cert-btn--primary"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationQuizActivity;
