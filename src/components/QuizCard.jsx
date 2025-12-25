/**
 * QuizCard Component
 * 
 * Displays individual quiz information in a card format
 * 
 * @param {Object} quiz - Quiz object containing id, title, description, timeLimit, questions
 * @param {Function} onStartQuiz - Callback function when "Start Quiz" is clicked
 */
export function QuizCard({ quiz, onStartQuiz }) {
  const questionCount = quiz.questions?.length || 0
  const hasTimeLimit = quiz.timeLimit !== null && quiz.timeLimit !== undefined

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {quiz.title}
        </h3>
        {quiz.description && (
          <p className="text-white/90 text-sm line-clamp-2">
            {quiz.description}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Quiz Metadata */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-semibold">📝</span>
            <span>{questionCount} {questionCount === 1 ? 'Question' : 'Questions'}</span>
          </div>
          {hasTimeLimit && (
            <div className="flex items-center gap-2">
              <span className="text-purple-600 font-semibold">⏱️</span>
              <span>{quiz.timeLimit} {quiz.timeLimit === 1 ? 'minute' : 'minutes'}</span>
            </div>
          )}
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={() => onStartQuiz(quiz.id)}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}

export default QuizCard

