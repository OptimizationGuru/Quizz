import { useMemo } from 'react'
import HistoryItem from './HistoryItem'
import { EmptyState } from './EmptyState'

/**
 * HistoryView Component
 * 
 * Displays:
 * - List of all past quiz attempts
 * - Quiz title, date/time, score
 * - Review button for each attempt
 * - Empty state if no history
 * - Sorted by most recent first
 */
function HistoryView({ history, quizzes, onBack, onReview }) {
  // Sort history by most recent first (already sorted by service, but ensure it)
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp)
    })
  }, [history])

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            ← Back
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Quiz History
          </h2>
          <div className="w-24"></div> {/* Spacer */}
        </div>

        {/* History List */}
        {sortedHistory.length === 0 ? (
          <EmptyState
            icon="📊"
            title="No Quiz History Yet"
            message="Take a quiz to see your results and track your progress here!"
            subMessage="Your quiz attempts, scores, and detailed reviews will appear here."
          />
        ) : (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
              <p className="text-white text-center font-semibold">
                Total Attempts: {sortedHistory.length}
              </p>
            </div>
            
            {sortedHistory.map((result) => (
              <HistoryItem
                key={result.id}
                result={result}
                quiz={quizzes.find(q => q.id === result.quizId)}
                onReview={onReview}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryView

