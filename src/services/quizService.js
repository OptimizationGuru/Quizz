/**
 * Quiz Service
 * Handles all quiz-related operations using localStorage service
 */
import localStorageService from './localStorageService'

const QUIZZES_KEY = 'quizzes'

/**
 * Get default sample quizzes
 */
function getDefaultQuizzes() {
  return [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Test your knowledge of JavaScript fundamentals",
      timeLimit: 5,
      questions: [
        {
          type: "single",
          question: "What is the result of typeof null?",
          options: ["null", "object", "undefined", "string"],
          correctAnswer: 1
        },
        {
          type: "single",
          question: "Which method adds an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0
        },
        {
          type: "multiple",
          question: "Which are JavaScript data types?",
          options: ["Number", "String", "Boolean", "Array"],
          correctAnswers: [0, 1, 2]
        }
      ]
    },
    {
      id: 2,
      title: "React Fundamentals",
      description: "Quiz about React concepts and hooks",
      timeLimit: null,
      questions: [
        {
          type: "single",
          question: "What is JSX?",
          options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
          correctAnswer: 0
        },
        {
          type: "multiple",
          question: "Which are React hooks?",
          options: ["useState", "useEffect", "useComponent", "useRender"],
          correctAnswers: [0, 1]
        }
      ]
    }
  ]
}

/**
 * Get all quizzes from localStorage
 * @returns {Array} - Array of quiz objects
 */
export const getQuizzes = () => {
  const quizzes = localStorageService.get(QUIZZES_KEY, [])
  // If no quizzes exist, return default quizzes
  if (quizzes.length === 0) {
    const defaultQuizzes = getDefaultQuizzes()
    setQuizzes(defaultQuizzes)
    return defaultQuizzes
  }
  return quizzes
}

/**
 * Save all quizzes to localStorage
 * @param {Array} quizzes - Array of quiz objects
 * @returns {boolean} - Success status
 */
export const setQuizzes = (quizzes) => {
  return localStorageService.set(QUIZZES_KEY, quizzes)
}

/**
 * Get a single quiz by ID
 * @param {number} quizId - The quiz ID
 * @returns {Object|null} - Quiz object or null if not found
 */
export const getQuizById = (quizId) => {
  const quizzes = getQuizzes()
  return quizzes.find(quiz => quiz.id === quizId) || null
}

/**
 * Add a new quiz
 * @param {Object} quiz - Quiz object (id will be auto-generated if not provided)
 * @returns {Object} - The saved quiz with ID
 */
export const addQuiz = (quiz) => {
  const quizzes = getQuizzes()
  const newQuiz = {
    ...quiz,
    id: quiz.id || Date.now() // Auto-generate ID if not provided
  }
  const updatedQuizzes = [...quizzes, newQuiz]
  setQuizzes(updatedQuizzes)
  return newQuiz
}

/**
 * Update an existing quiz
 * @param {number} quizId - The quiz ID to update
 * @param {Object} updatedQuiz - Updated quiz object
 * @returns {Object|null} - Updated quiz or null if not found
 */
export const updateQuiz = (quizId, updatedQuiz) => {
  const quizzes = getQuizzes()
  const index = quizzes.findIndex(quiz => quiz.id === quizId)
  
  if (index === -1) {
    return null
  }
  
  const updatedQuizzes = [...quizzes]
  updatedQuizzes[index] = { ...updatedQuizzes[index], ...updatedQuiz }
  setQuizzes(updatedQuizzes)
  return updatedQuizzes[index]
}

/**
 * Delete a quiz by ID
 * @param {number} quizId - The quiz ID to delete
 * @returns {boolean} - Success status
 */
export const deleteQuiz = (quizId) => {
  const quizzes = getQuizzes()
  const filteredQuizzes = quizzes.filter(quiz => quiz.id !== quizId)
  
  if (filteredQuizzes.length === quizzes.length) {
    // Quiz not found
    return false
  }
  
  setQuizzes(filteredQuizzes)
  return true
}

/**
 * Clear all quizzes (resets to default)
 * @returns {boolean} - Success status
 */
export const clearQuizzes = () => {
  return localStorageService.delete(QUIZZES_KEY)
}

