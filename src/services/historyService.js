/**
 * History Service
 * Handles all quiz history-related operations using localStorage service
 */
import localStorageService from './localStorageService'

const HISTORY_KEY = 'quizHistory'

/**
 * Get all quiz history from localStorage
 * @returns {Array} - Array of history result objects
 */
export const getHistory = () => {
  return localStorageService.get(HISTORY_KEY, [])
}

/**
 * Save all history to localStorage
 * @param {Array} history - Array of history result objects
 * @returns {boolean} - Success status
 */
export const setHistory = (history) => {
  return localStorageService.set(HISTORY_KEY, history)
}

/**
 * Add a new history entry
 * @param {Object} result - History result object
 * @returns {Array} - Updated history array
 */
export const addHistoryEntry = (result) => {
  const history = getHistory()
  const newEntry = {
    ...result,
    id: result.id || Date.now(), // Auto-generate ID if not provided
    timestamp: result.timestamp || new Date().toISOString()
  }
  // Add to beginning (most recent first)
  const updatedHistory = [newEntry, ...history]
  setHistory(updatedHistory)
  return updatedHistory
}

/**
 * Get history entry by ID
 * @param {number} historyId - The history entry ID
 * @returns {Object|null} - History entry or null if not found
 */
export const getHistoryById = (historyId) => {
  const history = getHistory()
  return history.find(entry => entry.id === historyId) || null
}

/**
 * Delete a history entry by ID
 * @param {number} historyId - The history entry ID to delete
 * @returns {boolean} - Success status
 */
export const deleteHistoryEntry = (historyId) => {
  const history = getHistory()
  const filteredHistory = history.filter(entry => entry.id !== historyId)
  
  if (filteredHistory.length === history.length) {
    // Entry not found
    return false
  }
  
  setHistory(filteredHistory)
  return true
}

/**
 * Clear all history
 * @returns {boolean} - Success status
 */
export const clearHistory = () => {
  return localStorageService.delete(HISTORY_KEY)
}

