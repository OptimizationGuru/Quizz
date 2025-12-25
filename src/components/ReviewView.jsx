import { useMemo } from 'react'
import ScoreDisplay from './ScoreDisplay'
import ReviewQuestion from './ReviewQuestion'

/**
 * ReviewView Component
 * 
 * Displays:
 * - Final score (X/Y and percentage)
 * - Review of all questions with:
 *   - User's answer
 *   - Correct answer
 *   - Correct/incorrect status
 * - Color-coded feedback
 */
function ReviewView({ quiz, score, total, answers, onBack }) {
  // Calculate percentage
  const percentage = useMemo(() => {
    return Math.round((score / total) * 100)
  }, [score, total])

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Quiz not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            ← Back to Home
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Quiz Results
          </h2>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Score Display */}
        <ScoreDisplay score={score} total={total} percentage={percentage} />

        {/* Questions Review */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Question Review</h3>
          
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[index]
            const isCorrect = checkAnswer(question, userAnswer)

            return (
              <ReviewQuestion
                key={index}
                question={question}
                questionNumber={index + 1}
                userAnswer={userAnswer}
                isCorrect={isCorrect}
              />
            )
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Check if user's answer is correct
 * @param {Object} question - Question object
 * @param {number|Array} userAnswer - User's answer(s)
 * @returns {boolean} - Whether answer is correct
 */
function checkAnswer(question, userAnswer) {
  if (question.type === 'single') {
    return userAnswer === question.correctAnswer
  } else if (question.type === 'multiple') {
    const userSet = new Set(userAnswer || [])
    const correctSet = new Set(question.correctAnswers)
    
    // Check if sets are equal (same size and all elements match)
    return userSet.size === correctSet.size && 
           [...userSet].every(a => correctSet.has(a))
  }
  return false
}

export default ReviewView

