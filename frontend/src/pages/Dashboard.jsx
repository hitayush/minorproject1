import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { recommendationAPI } from '../utils/api'
import { User, Target, MessageSquare, Plus } from 'lucide-react'

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecommendations()
    }
  }, [isAuthenticated])

  const fetchRecommendations = async () => {
    try {
      const response = await recommendationAPI.getRecommendations(user.token)
      setRecommendations(response.data.recommendations || [])
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateNewRecommendations = async () => {
    setLoading(true)
    try {
      await recommendationAPI.generateRecommendations(user.token)
      await fetchRecommendations()
    } catch (error) {
      console.error('Error generating recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
        <p className="text-muted-foreground">You need to be logged in to view your personalized career recommendations.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's your personalized career dashboard</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            {user?.education?.level && (
              <p className="text-sm text-muted-foreground">
                Education: {user.education.level} {user.education.field && `in ${user.education.field}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Career Recommendations
          </h2>
          <button
            onClick={generateNewRecommendations}
            disabled={loading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading recommendations...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{rec.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                
                {rec.actionItems && rec.actionItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Action Items:</h4>
                    <ul className="space-y-1">
                      {rec.actionItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{item.task}</span>
                          {item.deadline && (
                            <span className="text-muted-foreground">
                              (Due: {new Date(item.deadline).toLocaleDateString()})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {rec.resources && rec.resources.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.resources.map((resource, resIndex) => (
                        <a
                          key={resIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 text-primary px-3 py-1 rounded text-sm hover:bg-primary/20"
                        >
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground mb-4">
              Generate personalized career recommendations based on your profile
            </p>
            <button
              onClick={generateNewRecommendations}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Generate Recommendations
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat with AI
          </h3>
          <p className="text-muted-foreground mb-4">
            Get instant career advice from our AI chatbot
          </p>
          <a
            href="/chatbot"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 inline-block"
          >
            Start Chatting
          </a>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Update Profile
          </h3>
          <p className="text-muted-foreground mb-4">
            Keep your profile updated for better recommendations
          </p>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}













