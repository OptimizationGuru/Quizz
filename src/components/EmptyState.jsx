/**
 * EmptyState Component
 * 
 * Displays an empty state message when no data is available
 * Can be reused across different views
 */
export function EmptyState({ 
  icon = "📊", 
  title = "No Data Available",
  message = "There's nothing to display here yet.",
  subMessage 
}) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6">
        {message}
      </p>
      {subMessage && (
        <p className="text-sm text-gray-500">
          {subMessage}
        </p>
      )}
    </div>
  )
}

export default EmptyState

