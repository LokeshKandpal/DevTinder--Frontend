import React from 'react';
import { useNavigate } from 'react-router';
import { Code, Users, Zap, Heart, X, Star, ArrowRight, Github, Linkedin, Twitter, Play, Check } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Find Your Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
                Coding Partner
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Match with talented developers, collaborate on exciting projects, and build the next big thing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => navigate('/login')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 flex items-center"
              >
                Start Matching
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="flex items-center text-gray-300 hover:text-purple-400 font-semibold text-lg transition-colors">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Profile Card - Centered */}
            <div className="max-w-sm mx-auto">
              <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                    alt="Developer" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4 text-left">
                    <h3 className="text-lg font-bold text-white">Emma Wilson</h3>
                    <p className="text-gray-400">Frontend Engineer</p>
                    <div className="flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-green-400 font-medium">Available</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-600/30">React</span>
                    <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-600/30">JavaScript</span>
                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-600/30">Node.js</span>
                  </div>
                  
                  <div className="bg-gray-700 rounded-xl p-4 text-left border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">🎨 Design System Builder</h4>
                    <p className="text-gray-300 text-sm">Building reusable components for modern web apps. Looking for a backend partner!</p>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="w-12 h-12 bg-red-600/20 hover:bg-red-600 border-2 border-red-600/30 hover:border-red-600 rounded-full flex items-center justify-center transition-all group">
                    <X className="w-5 h-5 text-red-400 group-hover:text-white" />
                  </button>
                  <button className="w-12 h-12 bg-yellow-600/20 hover:bg-yellow-600 border-2 border-yellow-600/30 hover:border-yellow-600 rounded-full flex items-center justify-center transition-all group">
                    <Star className="w-5 h-5 text-yellow-400 group-hover:text-white" />
                  </button>
                  <button className="w-12 h-12 bg-green-600/20 hover:bg-green-600 border-2 border-green-600/30 hover:border-green-600 rounded-full flex items-center justify-center transition-all group">
                    <Heart className="w-5 h-5 text-green-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Developers Choose DevMatch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built specifically for the developer community with features that matter
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-600/20">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Matching Algorithm</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI matches you based on programming languages, experience level, project interests, and collaboration style.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Project Collaboration</h3>
              <p className="text-gray-300 leading-relaxed">
                Create project rooms, share code repositories, and collaborate in real-time with integrated development tools.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-green-900/20 border border-green-700/30 hover:border-green-600/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-600/20">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Code Reviews</h3>
              <p className="text-gray-300 leading-relaxed">
                Get immediate feedback on your code from experienced developers and help others improve their skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How DevMatch Works
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-2xl font-bold shadow-lg shadow-purple-600/30">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Your Developer Profile</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Showcase your skills, projects, and what you're passionate about building. Connect your GitHub and portfolio.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-2xl font-bold shadow-lg shadow-purple-600/30">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Discover & Match</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Swipe through curated developer profiles. When you both swipe right, it's a match and you can start collaborating.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-2xl font-bold shadow-lg shadow-purple-600/30">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Build Amazing Projects</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Start chatting, share ideas, and work together on exciting projects that could change the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Coding Soulmate?
          </h2>
          <p className="text-xl text-purple-200 mb-10 leading-relaxed">
            Join thousands of developers who've already found their perfect project partners and built incredible things together.
          </p>
          <button className="bg-white text-purple-800 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl inline-flex items-center">
            Join DevMatch Now
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
