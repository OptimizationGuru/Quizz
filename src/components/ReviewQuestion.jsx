/**
 * ReviewQuestion Component
 * 
 * Displays individual question review with:
 * - Question text
 * - User's answer (highlighted)
 * - Correct answer
 * - Correct/incorrect status
 * 
 * @param {Object} question - Question object
 * @param {number} questionNumber - Question number
 * @param {number|Array} userAnswer - User's answer(s)
 * @param {boolean} isCorrect - Whether answer is correct
 */
export function ReviewQuestion({ question, questionNumber, userAnswer, isCorrect }) {
  const getAnswerText = (answerIndices) => {
    if (question.type === 'single') {
      return question.options[answerIndices] || 'Not answered'
    } else {
      if (!answerIndices || answerIndices.length === 0) {
        return 'Not answered'
      }
      return answerIndices.map(idx => question.options[idx]).join(', ')
    }
  }

  const getUserAnswerText = () => {
    return getAnswerText(userAnswer)
  }

  const getCorrectAnswerText = () => {
    if (question.type === 'single') {
      return question.options[question.correctAnswer]
    } else {
      return question.correctAnswers.map(idx => question.options[idx]).join(', ')
    }
  }

  return (
    <div
      className={`rounded-xl shadow-lg p-6 border-2 ${
        isCorrect
          ? 'bg-green-50 border-green-300'
          : 'bg-red-50 border-red-300'
      }`}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-600">
          Question {questionNumber}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            isCorrect
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
        </span>
      </div>

      {/* Question Text */}
      <h4 className="text-lg font-bold text-gray-800 mb-6">
        {question.question}
      </h4>

      {/* Answer Review */}
      <div className="space-y-4">
        {/* User's Answer */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-start gap-3">
            <span className="font-semibold text-gray-700 min-w-[100px]">
              Your Answer:
            </span>
            <span
              className={`font-medium ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {getUserAnswerText()}
            </span>
          </div>
        </div>

        {/* Correct Answer */}
        <div className="bg-white rounded-lg p-4 border-2 border-green-300">
          <div className="flex items-start gap-3">
            <span className="font-semibold text-gray-700 min-w-[100px]">
              Correct Answer:
            </span>
            <span className="font-medium text-green-700">
              {getCorrectAnswerText()}
            </span>
          </div>
        </div>
      </div>

      {/* Options List (for reference) */}
      {!isCorrect && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-2 font-semibold">All Options:</p>
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isUserAnswer = question.type === 'single'
                ? userAnswer === index
                : (userAnswer || []).includes(index)
              const isCorrectAnswer = question.type === 'single'
                ? question.correctAnswer === index
                : question.correctAnswers.includes(index)

              return (
                <div
                  key={index}
                  className={`p-2 rounded text-sm ${
                    isCorrectAnswer
                      ? 'bg-green-100 text-green-800 font-semibold'
                      : isUserAnswer
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {isCorrectAnswer && '✓ '}
                  {isUserAnswer && !isCorrectAnswer && '✗ '}
                  {option}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewQuestion

