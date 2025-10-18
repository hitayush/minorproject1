import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { chatAPI } from '../utils/api'
import { Send, Bot, User } from 'lucide-react'

export default function Chatbot() {
  const { token, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      const response = await chatAPI.sendMessage(inputMessage, sessionId, token)
      // Support both backend shapes:
      // - Root server: { reply }
      // - Backend API: { success, data: { message, sessionId } }
      const apiData = response.data
      const botResponse = apiData?.reply ?? apiData?.data?.message ?? 'Sorry, I could not generate a response.'
      const newSessionId = apiData?.data?.sessionId ?? sessionId

      const botMessage = {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toISOString()
      }

      if (newSessionId && newSessionId !== sessionId) {
        setSessionId(newSessionId)
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card border rounded-lg h-[600px] flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <h1 className="text-xl font-semibold flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Careerly AI Chatbot
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAuthenticated ? 'Your chat history is saved' : 'Chat anonymously (history not saved)'}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Hi! I'm your career guidance assistant. Ask me anything about careers, skills, or job search!</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-2' : 'bg-muted mr-2'}`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="p-2 rounded-full bg-muted mr-2">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about careers, skills, or job search..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || loading}
              className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




