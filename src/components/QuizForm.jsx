/**
 * QuizForm Component
 * 
 * Form for quiz metadata:
 * - Title (required)
 * - Description (optional)
 * - Time limit (optional)
 */
export function QuizForm({ quizData, onChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz Information</h3>
      
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Quiz Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={quizData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Enter quiz title"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={quizData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter quiz description (optional)"
          rows="3"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Time Limit */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Time Limit (minutes)
        </label>
        <input
          type="number"
          value={quizData.timeLimit}
          onChange={(e) => onChange('timeLimit', e.target.value)}
          placeholder="e.g., 10 (leave empty for no time limit)"
          min="1"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty if you don't want a time limit
        </p>
      </div>
    </div>
  )
}

export default QuizForm

