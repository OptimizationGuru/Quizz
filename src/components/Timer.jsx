import { useMemo } from 'react'

/**
 * Timer Component
 * 
 * Displays countdown timer with visual warning when time is low
 * 
 * @param {number} timeRemaining - Time remaining in seconds
 */
export function Timer({ timeRemaining }) {
  const { minutes, seconds, isLowTime } = useMemo(() => {
    const mins = Math.floor(timeRemaining / 60)
    const secs = timeRemaining % 60
    const isLow = timeRemaining <= 60 // Warning when less than 1 minute
    
    return {
      minutes: mins,
      seconds: secs,
      isLowTime: isLow
    }
  }, [timeRemaining])

  return (
    <div
      className={`px-4 py-2 rounded-lg font-mono font-bold text-lg transition-all duration-300 ${
        isLowTime
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30'
      }`}
    >
      ⏱️ {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}

export default Timer

