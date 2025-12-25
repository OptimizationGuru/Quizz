import { useState, useEffect, useCallback } from 'react'
import { getQuizzes, setQuizzes, addQuiz, getQuizById } from './services/quizService'
import { getHistory, addHistoryEntry } from './services/historyService'
import HomeView from './components/HomeView'
import QuizView from './components/QuizView'
import ReviewView from './components/ReviewView'
import CreateQuizView from './components/CreateQuizView'
import HistoryView from './components/HistoryView'

function App() {
  // ========== STATE MANAGEMENT ==========
  // View state: Controls which screen is displayed
  // Possible values:
  // - 'home': Home screen with quiz list
  // - {type: 'quiz', quizId}: Quiz taking screen
  // - {type: 'review', quizId, score, total, answers}: Review screen
  // - 'create': Create quiz screen
  // - 'history': History screen
  const [view, setView] = useState('home')
  
  // Quizzes state: All available quizzes
  // Initialized from localStorage on mount
  const [quizzes, setQuizzesState] = useState(() => getQuizzes())
  
  // History state: All past quiz attempts
  // Initialized from localStorage on mount
  const [history, setHistoryState] = useState(() => getHistory())

  // ========== SYNC TO LOCALSTORAGE ==========
  // Auto-save quizzes to localStorage whenever quizzes state changes
  useEffect(() => {
    setQuizzes(quizzes)
  }, [quizzes])

  // ========== EVENT HANDLERS ==========
  const handleStartQuiz = useCallback((quizId) => {
    setView({ type: 'quiz', quizId })
  }, [])

  const handleQuizComplete = useCallback((quizId, score, total, answers) => {
    const quiz = getQuizById(quizId)
    const result = {
      quizId,
      quizTitle: quiz?.title || 'Unknown',
      score,
      total,
      answers
    }
    // Add to history and update state
    const updatedHistory = addHistoryEntry(result)
    setHistoryState(updatedHistory)
    // Navigate to review screen
    setView({ type: 'review', quizId, score, total, answers })
  }, [])

  const handleCreateQuiz = useCallback((newQuiz) => {
    // Add quiz using service (handles ID generation and saving)
    addQuiz(newQuiz)
    // Update state to trigger re-render
    setQuizzesState(getQuizzes())
    // Navigate back to home
    setView('home')
  }, [])

  const handleBackToHome = useCallback(() => {
    setView('home')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Conditional rendering based on view state */}
      {view === 'home' && (
        <HomeView
          quizzes={quizzes}
          onStartQuiz={handleStartQuiz}
          onCreateQuiz={() => setView('create')}
          onViewHistory={() => setView('history')}
        />
      )}
      {view?.type === 'quiz' && (
        <QuizView
          quiz={getQuizById(view.quizId)}
          onComplete={handleQuizComplete}
          onBack={handleBackToHome}
        />
      )}
      {view?.type === 'review' && (
        <ReviewView
          quiz={getQuizById(view.quizId)}
          score={view.score}
          total={view.total}
          answers={view.answers}
          onBack={handleBackToHome}
        />
      )}
      {view === 'create' && (
        <CreateQuizView
          onSave={handleCreateQuiz}
          onBack={handleBackToHome}
        />
      )}
      {view === 'history' && (
        <HistoryView
          history={history}
          quizzes={quizzes}
          onBack={handleBackToHome}
          onReview={(result) => {
            setView({
              type: 'review',
              quizId: result.quizId,
              score: result.score,
              total: result.total,
              answers: result.answers
            })
          }}
        />
      )}
    </div>
  )
}

export default App

