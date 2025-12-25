/**
 * QuestionsList Component
 * 
 * Displays list of added questions with edit/delete options
 */
export function QuestionsList({ questions, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Added Questions</h4>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

/**
 * QuestionItem Component
 * Individual question in the list
 */
function QuestionItem({ question, index, onEdit, onDelete }) {
  const getCorrectAnswerText = () => {
    if (question.type === 'single') {
      return question.options[question.correctAnswer]
    } else {
      return question.correctAnswers.map(idx => question.options[idx]).join(', ')
    }
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Q{index + 1}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
              {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
            </span>
          </div>
          <h5 className="font-semibold text-gray-800 mb-2">{question.question}</h5>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Correct Answer: </span>
            <span className="text-green-700">{getCorrectAnswerText()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(index)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionsList

