import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import PageShell from '../../components/common/PageShell';
const questions = [
  {
    id: 1,
    category: 'Phishing',
    question: 'You receive an email from your bank asking you to click a link to verify your account. What should you do?',
    options: [
      'Click the link and verify your account immediately',
      'Reply to the email asking for more information',
      'Hover over the link to check the URL, then call your bank directly',
      'Forward the email to your friends to warn them',
    ],
    correct: 2,
  },
  {
    id: 2,
    category: 'Passwords',
    question: 'Which of the following is the STRONGEST password?',
    options: [
      'password123',
      'qwerty',
      'Tr0ub4dour&3!',
      'iloveyou',
    ],
    correct: 2,
  },
  {
    id: 3,
    category: 'Phishing',
    question: 'What is a common sign of a phishing email?',
    options: [
      'Personalized greeting with your name',
      'Urgent language demanding immediate action',
      'Professional company logo',
      'Correct spelling and grammar',
    ],
    correct: 1,
  },
  {
    id: 4,
    category: 'Passwords',
    question: 'How often should you change your passwords?',
    options: [
      'Never, once set they are secure forever',
      'Every year',
      'Every 3-6 months, or immediately if compromised',
      'Only when you forget them',
    ],
    correct: 2,
  },
  {
    id: 5,
    category: 'Malware',
    question: 'What is ransomware?',
    options: [
      'A type of antivirus software',
      'Malware that encrypts your files and demands payment',
      'A tool for managing passwords',
      'A type of firewall',
    ],
    correct: 1,
  },
  {
    id: 6,
    category: 'Phishing',
    question: 'You receive a LinkedIn message from someone you don\'t know with a link to a "great job opportunity." What should you do?',
    options: [
      'Click the link immediately, it could be a great opportunity',
      'Reply asking for more details about the job',
      'Ignore and report the message as suspicious',
      'Forward it to your friends who are job hunting',
    ],
    correct: 2,
  },
  {
    id: 7,
    category: 'Passwords',
    question: 'What is two-factor authentication (2FA)?',
    options: [
      'Using two different passwords',
      'A security process requiring two forms of verification',
      'Having two admin accounts',
      'Encrypting data twice',
    ],
    correct: 1,
  },
  {
    id: 8,
    category: 'Malware',
    question: 'What is the best way to protect against malware?',
    options: [
      'Only download files from trusted sources and use antivirus software',
      'Never use the internet',
      'Use the same password for all accounts',
      'Disable your firewall',
    ],
    correct: 0,
  },
  {
    id: 9,
    category: 'Phishing',
    question: 'A "CEO" emails you asking for an urgent wire transfer. What should you do?',
    options: [
      'Process the transfer immediately, it\'s the CEO',
      'Reply asking for confirmation of the recipient details',
      'Verify the request through a phone call or in-person conversation',
      'Ask a colleague to process it instead',
    ],
    correct: 2,
  },
  {
    id: 10,
    category: 'General',
    question: 'What does SSL/TLS encryption do?',
    options: [
      'Speeds up your internet connection',
      'Secures data transmission between your browser and websites',
      'Blocks all ads on websites',
      'Increases your computer\'s storage',
    ],
    correct: 1,
  },
  {
    id: 11,
    category: 'Phishing',
    question: 'What is social engineering?',
    options: [
      'Building professional networks on social media',
      'Manipulating people into revealing confidential information',
      'Engineering social media platforms',
      'Running social media marketing campaigns',
    ],
    correct: 1,
  },
  {
    id: 12,
    category: 'Passwords',
    question: 'What is a password manager?',
    options: [
      'A tool that generates and stores complex passwords securely',
      'A manager who resets employee passwords',
      'A software to test password strength',
      'A feature to remember all your passwords in your browser',
    ],
    correct: 0,
  },
  {
    id: 13,
    category: 'Malware',
    question: 'What is a common way malware spreads?',
    options: [
      'Through email attachments and malicious downloads',
      'Through using strong passwords',
      'Through encrypted connections',
      'Through using VPNs',
    ],
    correct: 0,
  },
  {
    id: 14,
    category: 'General',
    question: 'What is the most secure way to send sensitive information?',
    options: [
      'Email with no encryption',
      'A secure file-sharing service with encryption',
      'Posting it on a private social media account',
      'Sending it via SMS',
    ],
    correct: 1,
  },
  {
    id: 15,
    category: 'Phishing',
    question: 'You get a text message saying your package delivery failed with a link to reschedule. What do you do?',
    options: [
      'Click the link to reschedule immediately',
      'Reply with your tracking number',
      'Go directly to the delivery company\'s official website to track your package',
      'Ignore it and delete the message',
    ],
    correct: 2,
  },
  {
    id: 16,
    category: 'General',
    question: 'What is a VPN used for?',
    options: [
      'To access blocked websites only',
      'To encrypt your internet connection and hide your IP address',
      'To increase internet speed',
      'To protect against viruses only',
    ],
    correct: 1,
  },
  {
    id: 17,
    category: 'Passwords',
    question: 'What should you do if you suspect your account has been compromised?',
    options: [
      'Change your password immediately and enable 2FA',
      'Wait to see if anything happens',
      'Post about it on social media',
      'Ignore it until you see suspicious activity',
    ],
    correct: 0,
  },
  {
    id: 18,
    category: 'Malware',
    question: 'What is a firewall?',
    options: [
      'A physical wall in a data center',
      'A security system that monitors and controls network traffic',
      'A type of virus protection software',
      'A tool to manage passwords',
    ],
    correct: 1,
  },
  {
    id: 19,
    category: 'Phishing',
    question: 'Which of the following is a "red flag" in an email?',
    options: [
      'The email uses your full name correctly',
      'The email address looks slightly different from the official one',
      'The email has a professional signature',
      'The email references a recent purchase you made',
    ],
    correct: 1,
  },
  {
    id: 20,
    category: 'General',
    question: 'Why is it important to keep software updated?',
    options: [
      'To get new features only',
      'To fix security vulnerabilities and bugs',
      'To make the software look better',
      'To increase compatibility with older devices',
    ],
    correct: 1,
  },
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.hasTakenAssessment) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];
  const hasAnswered = answers[currentQ.id] !== undefined;

  const handleAnswer = (optionIndex) => {
    if (hasAnswered) return;
    setAnswers({
      ...answers,
      [currentQ.id]: optionIndex,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const determineSkillLevel = (percentage) => {
    if (percentage >= 80) return 'ADVANCED';
    if (percentage >= 50) return 'INTERMEDIATE';
    return 'BEGINNER';
  };

  const submitAssessment = async () => {
    setLoading(true);
    const score = calculateScore();
    const skillLevel = determineSkillLevel(score.percentage);

    try {
      const response = await api.put('/users/skill-level', {
        skillLevel,
        assessmentScore: score.percentage,
      });

      if (response.data.success) {
        const updatedUser = response.data.data.user;
        updateUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      setLoading(false);
    }
  };

  if (showResults) {
    const score = calculateScore();
    const skillLevel = determineSkillLevel(score.percentage);

    return (
      <PageShell variant="assessment">
        <div className="auth-glass auth-card workspace-card max-w-xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Assessment Complete</h1>
          <p className="text-5xl font-bold text-accent mb-2">{score.percentage}%</p>
          <p className="text-sm text-muted mb-8">You got {score.correct} out of {score.total} questions correct</p>
          <div className="surface-card-inner p-5 mb-8 text-left">
            <h3 className="text-sm font-medium text-muted mb-2">Assigned Skill Level</h3>
            <p className={`text-xl font-semibold ${skillLevel === 'ADVANCED' ? 'text-status-success' : skillLevel === 'INTERMEDIATE' ? 'text-status-warning' : 'text-accent'}`}>{skillLevel}</p>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {skillLevel === 'ADVANCED' && 'Expert-level knowledge detected. Advanced simulations are recommended.'}
              {skillLevel === 'INTERMEDIATE' && 'Solid foundation. Intermediate challenges are a good fit.'}
              {skillLevel === 'BEGINNER' && 'Starting with foundational concepts will build strong habits.'}
            </p>
          </div>
          <button type="button" onClick={submitAssessment} disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Saving your results...' : 'Continue to Dashboard'}
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="assessment">
      <div className="auth-glass auth-card workspace-card workspace-card--wide w-full p-6 md:p-8">
        <div className="flex justify-between items-center mb-4 text-sm text-muted">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% complete</span>
        </div>

        <div className="w-full h-2 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mb-8">
          <div className="h-full bg-[#FFFFFF] transition-all duration-300" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }} />
        </div>

        <span className="inline-block bg-[var(--color-accent-muted)] text-[var(--color-accent-text)] px-3 py-1 rounded-full text-xs font-medium mb-4">{currentQ.category}</span>
        <h2 className="text-lg font-medium mb-6 leading-relaxed">{currentQ.question}</h2>

        <div className="space-y-2">
          {currentQ.options.map((option, index) => {
            const isSelected = answers[currentQ.id] === index;
            const isCorrect = index === currentQ.correct;
            const showCorrect = hasAnswered && isCorrect;
            const showWrong = hasAnswered && isSelected && !isCorrect;

            let optionClass = 'assessment-option';
            if (isSelected && !hasAnswered) optionClass = 'assessment-option assessment-option--selected';
            else if (showCorrect) optionClass = 'assessment-option assessment-option--correct';
            else if (hasAnswered && !isSelected && isCorrect) optionClass = 'assessment-option assessment-option--neutral';
            else if (showWrong) optionClass = 'assessment-option assessment-option--incorrect';

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleAnswer(index)}
                disabled={hasAnswered}
                className={`w-full text-left px-4 py-3 transition text-sm ${optionClass} disabled:cursor-default`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted w-5">{String.fromCharCode(65 + index)}.</span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle className="text-status-success" size={18} />}
                  {showWrong && <XCircle className="text-status-danger" size={18} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <button type="button" onClick={prevQuestion} disabled={currentQuestion === 0} className="text-muted hover:text-[#FFFFFF] transition flex items-center gap-1 disabled:opacity-40">
            <ChevronLeft size={18} /> Previous
          </button>
          {hasAnswered && (
            <button type="button" onClick={nextQuestion} className="btn-primary py-2 px-6">
              {currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next'}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default Assessment;
