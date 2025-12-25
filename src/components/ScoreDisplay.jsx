/**
 * ScoreDisplay Component
 * 
 * Displays final score in a visually appealing way
 * 
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @param {number} percentage - Score percentage
 */
export function ScoreDisplay({ score, total, percentage }) {
  // Determine score color based on percentage
  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600'
    if (percentage >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 text-center">
      <h3 className="text-lg text-gray-600 mb-4 font-semibold">Your Score</h3>
      
      {/* Large Score Display */}
      <div className="mb-6">
        <div className={`inline-flex items-baseline justify-center bg-gradient-to-r ${getScoreColor()} text-white rounded-full px-8 py-6 mb-4`}>
          <span className="text-6xl font-bold">{score}</span>
          <span className="text-3xl font-semibold ml-2 opacity-90">/{total}</span>
        </div>
      </div>

      {/* Percentage */}
      <div className="text-4xl font-bold text-gray-800 mb-2">
        {percentage}%
      </div>

      {/* Performance Message */}
      <div className="mt-4">
        <p className={`text-lg font-semibold ${
          percentage >= 80 ? 'text-green-600' :
          percentage >= 60 ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {percentage >= 80 && '🎉 Excellent! Great job!'}
          {percentage >= 60 && percentage < 80 && '👍 Good effort! Keep practicing!'}
          {percentage < 60 && '💪 Keep learning! You can do better!'}
        </p>
      </div>
    </div>
  )
}

export default ScoreDisplay

