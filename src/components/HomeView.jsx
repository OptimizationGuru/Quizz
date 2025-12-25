import { QuizCard } from './QuizCard'

/**
 * HomeView Component
 * 
 * Displays:
 * - Header with title
 * - Action buttons (Create Quiz, View History)
 * - Grid of available quizzes
 * - Each quiz card shows: title, description, question count, time limit
 * - Start Quiz button for each quiz
 */
function HomeView({ quizzes, onStartQuiz, onCreateQuiz, onViewHistory }) {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Quiz Application
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Test your knowledge and track your progress
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCreateQuiz}
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              ➕ Create Quiz
            </button>
            <button
              onClick={onViewHistory}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              📊 View History
            </button>
          </div>
        </div>

        {/* Quizzes Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-white text-xl mb-4">No quizzes available</p>
              <p className="text-white/80 mb-6">Create your first quiz to get started!</p>
              <button
                onClick={onCreateQuiz}
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200"
              >
                Create Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onStartQuiz={onStartQuiz}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeView

