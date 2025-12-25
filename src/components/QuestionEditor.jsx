import { useState, useEffect } from 'react'

/**
 * QuestionEditor Component
 * 
 * Editor for creating/editing questions:
 * - Question text
 * - 4 options
 * - Correct answer selection (single or multiple)
 */
export function QuestionEditor({ question, type, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: null, // For single choice
    correctAnswers: [] // For multiple choice
  })

  // Initialize form if editing
  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question || '',
        options: question.options || ['', '', '', ''],
        correctAnswer: question.correctAnswer ?? null,
        correctAnswers: question.correctAnswers || []
      })
    } else {
      // Reset for new question
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: type === 'single' ? null : undefined,
        correctAnswers: type === 'multiple' ? [] : undefined
      })
    }
  }, [question, type])

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  const handleSingleChoiceSelect = (index) => {
    setFormData(prev => ({ ...prev, correctAnswer: index }))
  }

  const handleMultipleChoiceToggle = (index) => {
    setFormData(prev => {
      const current = prev.correctAnswers || []
      const newAnswers = current.includes(index)
        ? current.filter(a => a !== index)
        : [...current, index]
      return { ...prev, correctAnswers: newAnswers }
    })
  }

  const handleSave = () => {
    // Validation
    if (!formData.question.trim()) {
      alert('Please enter a question')
      return
    }

    if (formData.options.some(opt => !opt.trim())) {
      alert('Please fill all 4 options')
      return
    }

    if (type === 'single') {
      if (formData.correctAnswer === null) {
        alert('Please select a correct answer')
        return
      }
    } else if (type === 'multiple') {
      if (!formData.correctAnswers || formData.correctAnswers.length === 0) {
        alert('Please select at least one correct answer')
        return
      }
    }

    // Create question object
    const questionObj = {
      type,
      question: formData.question.trim(),
      options: formData.options.map(opt => opt.trim()),
      ...(type === 'single' 
        ? { correctAnswer: formData.correctAnswer }
        : { correctAnswers: formData.correctAnswers }
      )
    }

    onSave(questionObj)
  }

  const isSingleChoice = type === 'single'
  const isMultipleChoice = type === 'multiple'

  return (
    <div className="bg-gray-50 rounded-lg p-6 border-2 border-purple-200">
      <h4 className="text-lg font-bold text-gray-800 mb-4">
        {question ? 'Edit' : 'Add'} {isSingleChoice ? 'Single Choice' : 'Multiple Choice'} Question
      </h4>

      {/* Question Text */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Question <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.question}
          onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
          placeholder="Enter your question"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Options */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Options <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Correct Answer Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Correct Answer(s) <span className="text-red-500">*</span>
        </label>
        {isSingleChoice ? (
          <div className="space-y-2">
            {formData.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.correctAnswer === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === index}
                  onChange={() => handleSingleChoiceSelect(index)}
                  className="w-5 h-5 text-purple-600"
                />
                <span className="font-medium">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {formData.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  (formData.correctAnswers || []).includes(index)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.correctAnswers || []).includes(index)}
                  onChange={() => handleMultipleChoiceToggle(index)}
                  className="w-5 h-5 text-purple-600 rounded"
                />
                <span className="font-medium">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
        >
          {question ? 'Update' : 'Add'} Question
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default QuestionEditor

