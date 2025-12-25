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
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Quiz Application
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg sm:text-xl text-indigo-600 font-medium">
              Test your knowledge and track your progress
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCreateQuiz}
              className="group px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
                <span>Create Quiz</span>
              </span>
            </button>
            <button
              onClick={onViewHistory}
              className="group px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl group-hover:scale-110 transition-transform">📊</span>
                <span>View History</span>
              </span>
            </button>
          </div>
        </div>

        {/* Quizzes Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <p className="text-gray-800 text-xl mb-4">No quizzes available</p>
              <p className="text-gray-600 mb-6">Create your first quiz to get started!</p>
              <button
                onClick={onCreateQuiz}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
              >
                Create Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStartQuiz={onStartQuiz}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeView

