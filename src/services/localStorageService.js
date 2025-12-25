/**
 * Generic LocalStorage Service
 * Provides reusable methods for localStorage operations with error handling
 */

class LocalStorageService {
  /**
   * Get item from localStorage
   * @param {string} key - The key to retrieve
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - The parsed value or default value
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item)
    } catch (error) {
      console.error(`Error getting item from localStorage (key: ${key}):`, error)
      return defaultValue
    }
  }

  /**
   * Set item in localStorage
   * @param {string} key - The key to store
   * @param {any} value - The value to store (will be stringified)
   * @returns {boolean} - Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting item in localStorage (key: ${key}):`, error)
      return false
    }
  }

  /**
   * Delete item from localStorage
   * @param {string} key - The key to delete
   * @returns {boolean} - Success status
   */
  delete(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error deleting item from localStorage (key: ${key}):`, error)
      return false
    }
  }

  /**
   * Check if key exists in localStorage
   * @param {string} key - The key to check
   * @returns {boolean} - Whether the key exists
   */
  has(key) {
    return localStorage.getItem(key) !== null
  }

  /**
   * Clear all localStorage
   * @returns {boolean} - Success status
   */
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// Export a singleton instance
export default new LocalStorageService()

