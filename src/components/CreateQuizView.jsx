import { useState } from 'react'
import QuizForm from './QuizForm'
import QuestionEditor from './QuestionEditor'
import QuestionsList from './QuestionsList'

/**
 * CreateQuizView Component
 * 
 * Handles:
 * - Quiz metadata (title, description, time limit)
 * - Question management (add, edit, delete)
 * - Form validation
 * - Quiz creation
 */
function CreateQuizView({ onSave, onBack }) {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: ''
  })
  const [questions, setQuestions] = useState([])
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null)
  const [showQuestionEditor, setShowQuestionEditor] = useState(false)
  const [questionType, setQuestionType] = useState(null) // 'single' or 'multiple'

  // Handle quiz metadata changes
  const handleQuizDataChange = (field, value) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Add new question
  const handleAddQuestion = (type) => {
    setQuestionType(type)
    setEditingQuestionIndex(null)
    setShowQuestionEditor(true)
  }

  // Save question (new or edit)
  const handleSaveQuestion = (question) => {
    if (editingQuestionIndex !== null) {
      // Edit existing question
      const updated = [...questions]
      updated[editingQuestionIndex] = question
      setQuestions(updated)
    } else {
      // Add new question
      setQuestions(prev => [...prev, question])
    }
    setShowQuestionEditor(false)
    setEditingQuestionIndex(null)
    setQuestionType(null)
  }

  // Edit question
  const handleEditQuestion = (index) => {
    const question = questions[index]
    setQuestionType(question.type)
    setEditingQuestionIndex(index)
    setShowQuestionEditor(true)
  }

  // Delete question
  const handleDeleteQuestion = (index) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter((_, i) => i !== index))
    }
  }

  // Cancel question editor
  const handleCancelQuestion = () => {
    setShowQuestionEditor(false)
    setEditingQuestionIndex(null)
    setQuestionType(null)
  }

  // Save quiz
  const handleSaveQuiz = () => {
    // Validation
    if (!quizData.title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    if (questions.length === 0) {
      alert('Please add at least one question')
      return
    }

    // Create quiz object
    const newQuiz = {
      id: Date.now(), // Auto-generate ID
      title: quizData.title.trim(),
      description: quizData.description.trim(),
      timeLimit: quizData.timeLimit ? parseInt(quizData.timeLimit) : null,
      questions: questions
    }

    onSave(newQuiz)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-3 sm:px-4 py-2 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base shadow-sm"
          >
            <span className="hidden sm:inline">← Back</span>
            <span className="sm:hidden">←</span>
          </button>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center flex-1 mx-2">
            Create New Quiz
          </h2>
          <div className="w-16 sm:w-24"></div> {/* Spacer */}
        </div>

        {/* Quiz Form */}
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-6">
          <QuizForm
            quizData={quizData}
            onChange={handleQuizDataChange}
          />
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Questions ({questions.length})
            </h3>
            {!showQuestionEditor && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddQuestion('single')}
                  className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
                  title="Add Single Choice Question"
                >
                  <span className="text-2xl">🔘</span>
                </button>
                <button
                  onClick={() => handleAddQuestion('multiple')}
                  className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
                  title="Add Multiple Choice Question"
                >
                  <span className="text-2xl">☑️</span>
                </button>
              </div>
            )}
          </div>

          {/* Question Editor */}
          {showQuestionEditor && (
            <div className="mb-6">
              <QuestionEditor
                question={editingQuestionIndex !== null ? questions[editingQuestionIndex] : null}
                type={questionType}
                onSave={handleSaveQuestion}
                onCancel={handleCancelQuestion}
              />
            </div>
          )}

          {/* Questions List */}
          {questions.length > 0 && (
            <QuestionsList
              questions={questions}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
            />
          )}

          {questions.length === 0 && !showQuestionEditor && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No questions added yet</p>
              <p className="text-sm flex items-center justify-center gap-1 flex-wrap">
                Click 
                <span className="inline-flex items-center gap-1">
                  <span className="text-xl leading-none">🔘</span>
                  <span>Single Choice</span>
                </span>
                or
                <span className="inline-flex items-center gap-1">
                  <span className="text-xl leading-none">☑️</span>
                  <span>Multiple Choice</span>
                </span>
                to add your first question
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSaveQuiz}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            💾 Save Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateQuizView

