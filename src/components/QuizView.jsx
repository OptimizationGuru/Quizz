import { useState, useEffect, useCallback, useMemo } from 'react'
import Timer from './Timer'

/**
 * QuizView Component
 * 
 * Handles:
 * - Displaying questions one at a time
 * - Answer selection (single/multiple choice)
 * - Timer countdown (if time limit exists)
 * - Answer state management
 * - Quiz submission
 */
function QuizView({ quiz, onComplete, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: answer(s) }
  const [timeRemaining, setTimeRemaining] = useState(
    quiz?.timeLimit ? quiz.timeLimit * 60 : null // Convert minutes to seconds
  )

  // Timer effect - auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === null) return

    if (timeRemaining <= 0) {
      handleSubmit()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  // Calculate score and submit quiz
  const handleSubmit = useCallback(() => {
    if (!quiz) return

    let score = 0
    quiz.questions.forEach((question, idx) => {
      const userAnswer = answers[idx]
      
      if (question.type === 'single') {
        if (userAnswer === question.correctAnswer) {
          score++
        }
      } else if (question.type === 'multiple') {
        const userSet = new Set(userAnswer || [])
        const correctSet = new Set(question.correctAnswers)
        
        // Check if sets are equal (same size and all elements match)
        if (userSet.size === correctSet.size && 
            [...userSet].every(a => correctSet.has(a))) {
          score++
        }
      }
    })

    onComplete(quiz.id, score, quiz.questions.length, answers)
  }, [answers, quiz, onComplete])

  // Handle answer selection
  const handleAnswerSelect = useCallback((questionIndex, answerIndex) => {
    const question = quiz.questions[questionIndex]
    
    setAnswers(prev => {
      if (question.type === 'single') {
        // Single choice: replace answer
        return { ...prev, [questionIndex]: answerIndex }
      } else {
        // Multiple choice: toggle answer
        const current = prev[questionIndex] || []
        const newAnswers = current.includes(answerIndex)
          ? current.filter(a => a !== answerIndex)
          : [...current, answerIndex]
        return { ...prev, [questionIndex]: newAnswers }
      }
    })
  }, [quiz])

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Quiz not found</div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <QuizHeader
          title={quiz.title}
          timeRemaining={timeRemaining}
          onBack={onBack}
        />

        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Question Section */}
        <QuestionSection
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestionIndex, answerIndex)}
        />

        {/* Navigation */}
        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          answers={answers}
          onPrevious={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentQuestionIndex(prev => 
            Math.min(quiz.questions.length - 1, prev + 1)
          )}
          onQuestionSelect={setCurrentQuestionIndex}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

/**
 * QuizHeader Component
 * Displays quiz title, timer, and back button
 */
function QuizHeader({ title, timeRemaining, onBack }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onBack}
        className="px-3 sm:px-4 py-2 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base shadow-sm"
      >
        <span className="hidden sm:inline">← Back</span>
        <span className="sm:hidden">←</span>
      </button>
      
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center flex-1 mx-2 sm:mx-4">
        {title}
      </h2>

      {timeRemaining !== null && (
        <Timer timeRemaining={timeRemaining} />
      )}
    </div>
  )
}

/**
 * ProgressBar Component
 * Visual progress indicator
 */
function ProgressBar({ progress }) {
  return (
    <div className="mb-8">
      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * QuestionSection Component
 * Displays current question and answer options
 */
function QuestionSection({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect }) {
  const isSingleChoice = question.type === 'single'
  const isMultipleChoice = question.type === 'multiple'

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-6">
      {/* Question Header */}
      <div className="mb-6">
        <span className="text-sm text-gray-500 font-semibold">
          Question {questionNumber} of {totalQuestions}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
          {question.question}
        </h3>
        {isMultipleChoice && (
          <p className="text-sm text-purple-600 mt-2 font-medium">
            Select all that apply
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = isSingleChoice
            ? selectedAnswer === index
            : (selectedAnswer || []).includes(index)

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 text-purple-900'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * QuizNavigation Component
 * Handles question navigation and submission
 */
function QuizNavigation({
  currentIndex,
  totalQuestions,
  answers,
  onPrevious,
  onNext,
  onQuestionSelect,
  onSubmit
}) {
  const isFirstQuestion = currentIndex === 0
  const isLastQuestion = currentIndex === totalQuestions - 1

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      {/* Question Indicators */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3 font-medium">Navigate to question:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const isAnswered = answers[index] !== undefined
            const isCurrent = index === currentIndex

            return (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  isCurrent
                    ? 'bg-purple-600 text-white scale-110 shadow-lg'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isFirstQuestion
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ← Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizView

