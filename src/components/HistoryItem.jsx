import { useMemo } from 'react'

/**
 * HistoryItem Component
 * 
 * Displays individual history entry with:
 * - Quiz title
 * - Date and time
 * - Score (X/Y and percentage)
 * - Review button
 */
export function HistoryItem({ result, quiz, onReview }) {
  const percentage = useMemo(() => {
    return Math.round((result.score / result.total) * 100)
  }, [result.score, result.total])

  const formattedDate = useMemo(() => {
    const date = new Date(result.timestamp)
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }, [result.timestamp])

  // Get score color based on percentage
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = () => {
    if (percentage >= 80) return 'bg-green-100 border-green-300'
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-300'
    return 'bg-red-100 border-red-300'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {result.quizTitle || quiz?.title || 'Unknown Quiz'}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <span>📅</span>
                <span>{formattedDate.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🕐</span>
                <span>{formattedDate.time}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Score Display */}
        <div className={`${getScoreBgColor()} border-2 rounded-lg p-4 mb-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Score</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${getScoreColor()}`}>
                  {result.score}
                </span>
                <span className="text-xl text-gray-600">/ {result.total}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700 mb-1">Percentage</p>
              <p className={`text-3xl font-bold ${getScoreColor()}`}>
                {percentage}%
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onReview(result)}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          📖 Review Details
        </button>
      </div>
    </div>
  )
}

export default HistoryItem

