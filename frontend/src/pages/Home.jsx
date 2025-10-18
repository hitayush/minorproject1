import { Link } from 'react-router-dom'
import { MessageSquare, Users, Target, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Careerly AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your personal AI career guidance companion. Get personalized career advice, 
          skill recommendations, and job search assistance powered by artificial intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/chatbot"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Chatting
          </Link>
          <Link 
            to="/signup"
            className="border border-primary text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Careerly AI?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border bg-card">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Chat</h3>
            <p className="text-muted-foreground">
              Get instant, intelligent career advice from our advanced AI chatbot
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-muted-foreground">
              Receive tailored career suggestions based on your skills and interests
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Guidance</h3>
            <p className="text-muted-foreground">
              Access career insights and job market trends instantly
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center bg-muted/50 rounded-lg mx-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of professionals who have already discovered their career path with Careerly AI
        </p>
        <Link 
          to="/signup"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Get Started Today
        </Link>
      </section>
    </div>
  )
}













