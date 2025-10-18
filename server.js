import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Career guidance responses database
const careerResponses = {
  // After 10th grade guidance
  after10th: {
    keywords: ["10th", "tenth", "after 10th", "stream selection", "science commerce arts"],
    response: `Great question! After 10th grade, you have three main streams to choose from:

🎯 **Science Stream:**
• **PCM (Physics, Chemistry, Mathematics)** - Best for engineering, architecture, defense services
• **PCB (Physics, Chemistry, Biology)** - Ideal for medical, pharmacy, biotechnology, agriculture
• **PCMB** - If you're unsure, gives flexibility for both medical and engineering

🔬 **Commerce Stream:**
• Perfect for business, finance, accounting, economics
• Leads to CA, CS, CFA, MBA, BBA courses
• Good for entrepreneurship and business management

🎨 **Arts/Humanities Stream:**
• Excellent for psychology, sociology, literature, history
• Great foundation for law, journalism, mass communication
• Good for civil services, teaching, social work

💡 **My Recommendation:**
1. **Assess your interests** - What subjects do you enjoy most?
2. **Consider your strengths** - Where do you perform better?
3. **Think about your career goals** - What profession interests you?
4. **Research career prospects** - What are the job opportunities?

Would you like me to help you assess your interests or explore specific career paths in any of these streams?`
  },

  // Engineering guidance
  engineering: {
    keywords: ["engineering", "engineer", "computer science", "mechanical", "civil", "electronics"],
    response: `Engineering is an excellent career choice! Here's a comprehensive guide:

🚀 **Popular Engineering Branches:**

**Computer Science & IT:**
• Software Development, AI/ML, Cybersecurity
• High demand, excellent salary prospects
• Companies: Google, Microsoft, Amazon, startups

**Mechanical Engineering:**
• Automotive, aerospace, manufacturing
• Core engineering with broad applications
• Companies: Tesla, BMW, Boeing, ISRO

**Civil Engineering:**
• Infrastructure, construction, urban planning
• Government and private sector opportunities
• Companies: L&T, TATA, government projects

**Electronics & Communication:**
• Telecommunications, IoT, embedded systems
• Growing field with 5G and smart technologies
• Companies: Qualcomm, Intel, Samsung

**Biotechnology:**
• Pharmaceuticals, research, healthcare
• Emerging field with great potential
• Companies: Biocon, Dr. Reddy's, research institutes

💼 **Career Paths:**
• **Corporate Sector** - MNCs, startups, product companies
• **Government** - PSUs, defense, research organizations
• **Entrepreneurship** - Start your own tech company
• **Higher Studies** - MS, MBA, PhD

🎯 **My Advice:**
1. Choose based on your interests, not just salary
2. Focus on practical skills and projects
3. Build a strong portfolio
4. Stay updated with latest technologies

Which engineering branch interests you most? I can provide more specific guidance!`
  },

  // Medical guidance
  medical: {
    keywords: ["medical", "doctor", "mbbs", "medical field", "healthcare", "neet"],
    response: `The medical field offers incredibly rewarding career opportunities! Here's your guide:

🏥 **Medical Career Paths:**

**MBBS (Bachelor of Medicine & Surgery):**
• 5.5 years course including 1 year internship
• Entry through NEET exam
• Leads to specialization (MD/MS) or super-specialization (DM/MCh)

**Alternative Medical Courses:**
• **BDS** - Dentistry (4 years)
• **BAMS** - Ayurvedic Medicine (5.5 years)
• **BHMS** - Homeopathic Medicine (5.5 years)
• **BVSc** - Veterinary Science (5 years)
• **B.Pharm** - Pharmacy (4 years)
• **BPT** - Physiotherapy (4.5 years)

**Paramedical Courses:**
• **Nursing** - B.Sc Nursing (4 years)
• **Medical Lab Technology** - BMLT (3 years)
• **Radiology & Imaging** - B.Sc Radiology (3 years)
• **Optometry** - B.Optom (4 years)

💡 **Career Opportunities:**
• **Clinical Practice** - Private practice, hospitals
• **Government Sector** - Government hospitals, health centers
• **Research** - Medical research, clinical trials
• **Academics** - Teaching in medical colleges
• **Public Health** - WHO, UNICEF, health organizations

🎯 **My Recommendation:**
1. **Passion is key** - Medicine requires dedication and empathy
2. **Long-term commitment** - It's a lifelong learning journey
3. **Financial investment** - Consider the cost of education
4. **Work-life balance** - Medical profession can be demanding

Are you considering MBBS or interested in other medical fields? I can provide more specific guidance!`
  },

  // Commerce and Business
  commerce: {
    keywords: ["commerce", "business", "ca", "cs", "cfa", "mba", "finance", "accounting"],
    response: `Commerce offers diverse and lucrative career opportunities! Here's your comprehensive guide:

💰 **Professional Courses:**

**Chartered Accountancy (CA):**
• 3-year articleship + exams
• High demand in all sectors
• Average salary: ₹6-15 LPA (varies by experience)

**Company Secretary (CS):**
• Corporate law and compliance
• Growing demand in corporate sector
• Average salary: ₹4-12 LPA

**Chartered Financial Analyst (CFA):**
• Investment and portfolio management
• International recognition
• Average salary: ₹8-20 LPA

**Cost & Management Accountant (CMA):**
• Cost control and management accounting
• Good for manufacturing and service sectors
• Average salary: ₹5-12 LPA

🎓 **Degree Courses:**
• **BBA** - Business Administration (3 years)
• **B.Com** - Commerce (3 years)
• **BBA+MBA** - Integrated program (5 years)
• **Economics** - B.A/B.Sc Economics

💼 **Career Paths:**
• **Banking & Finance** - Investment banking, retail banking
• **Corporate Sector** - Finance, accounting, taxation
• **Consulting** - Management consulting, financial advisory
• **Government** - RBI, SEBI, taxation departments
• **Entrepreneurship** - Start your own business

🚀 **Emerging Fields:**
• **Fintech** - Digital payments, blockchain
• **Data Analytics** - Business intelligence, data science
• **Sustainability** - ESG consulting, green finance

Which area interests you most? I can provide more specific guidance!`
  },

  // Arts and Humanities
  arts: {
    keywords: ["arts", "humanities", "psychology", "law", "journalism", "literature", "history"],
    response: `Arts and Humanities offer incredibly diverse career paths! Here's your guide:

🎨 **Popular Career Options:**

**Law:**
• **LLB** - 3 years after graduation or 5 years integrated
• **Career paths:** Corporate law, litigation, judiciary, legal consulting
• **Average salary:** ₹3-15 LPA (varies significantly)

**Psychology:**
• **B.A/B.Sc Psychology** - 3 years
• **Career paths:** Clinical psychology, counseling, HR, research
• **Average salary:** ₹3-8 LPA

**Journalism & Mass Communication:**
• **BJMC** - 3 years
• **Career paths:** News reporting, digital media, content creation, PR
• **Average salary:** ₹2-8 LPA

**Public Administration:**
• **B.A Public Administration** - 3 years
• **Career paths:** Civil services, government administration, NGOs
• **Average salary:** ₹3-12 LPA

**Sociology & Social Work:**
• **B.A Sociology/Social Work** - 3 years
• **Career paths:** Social work, community development, research
• **Average salary:** ₹2-6 LPA

**Languages & Literature:**
• **B.A in specific languages** - 3 years
• **Career paths:** Translation, teaching, content writing, diplomacy
• **Average salary:** ₹2-7 LPA

🎯 **Government Career Options:**
• **Civil Services** - IAS, IPS, IFS
• **Defense Services** - Army, Navy, Air Force
• **Teaching** - Government schools, colleges
• **Public Sector Banks** - Various positions

💡 **My Advice:**
1. **Passion matters** - Choose what genuinely interests you
2. **Skill development** - Focus on practical skills
3. **Networking** - Build connections in your field
4. **Higher education** - Consider postgraduate studies

Which field interests you most? I can provide more specific guidance!`
  },

  // Skill development
  skills: {
    keywords: ["skills", "skill development", "learn", "develop", "improve skills", "training"],
    response: `Developing the right skills is crucial for career success! Here's your skill development guide:

🛠️ **Essential Skills for 2024:**

**Technical Skills (Hard Skills):**
• **Digital Literacy** - Basic computer skills, online tools
• **Data Analysis** - Excel, Google Analytics, basic statistics
• **Programming** - Python, JavaScript, SQL (even basics help)
• **Design** - Canva, Adobe Creative Suite, UI/UX basics
• **Marketing** - Social media, content creation, SEO basics

**Soft Skills (Most Important):**
• **Communication** - Verbal, written, presentation skills
• **Problem Solving** - Analytical thinking, creativity
• **Leadership** - Team management, decision making
• **Adaptability** - Learning agility, resilience
• **Emotional Intelligence** - Self-awareness, empathy

🎯 **Industry-Specific Skills:**

**For Tech Careers:**
• Programming languages, cloud computing, cybersecurity
• Agile methodology, version control (Git)

**For Business Careers:**
• Financial modeling, project management, negotiation
• CRM tools, business intelligence

**For Creative Careers:**
• Design software, storytelling, brand development
• Portfolio building, client management

**For Healthcare:**
• Medical terminology, patient care, research skills
• Healthcare technology, compliance knowledge

💡 **Skill Development Tips:**
1. **Start with basics** - Master fundamentals first
2. **Practice regularly** - Consistent practice is key
3. **Get feedback** - Learn from mentors and peers
4. **Build projects** - Apply skills in real scenarios
5. **Stay updated** - Industries evolve rapidly

🚀 **Free Learning Resources:**
• **Online Courses:** Coursera, edX, Khan Academy
• **YouTube Channels:** Industry-specific tutorials
• **Books:** Industry publications and guides
• **Practice Platforms:** GitHub, Kaggle, Codecademy

Which skills are you most interested in developing? I can provide specific learning paths!`
  }
};

// Function to get career guidance response
function getCareerResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  // Check each category for matching keywords
  for (const [category, data] of Object.entries(careerResponses)) {
    for (const keyword of data.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return data.response;
      }
    }
  }
  
  // Default response for general career guidance
  return `Hello! I'm Careerly AI, your career guidance assistant. I'm here to help you with:

🎯 **Career Planning** - Choose the right career path
📚 **Education Guidance** - Select the best courses and streams  
💼 **Skill Development** - Learn in-demand skills
🚀 **Job Search Tips** - Find your dream job
📈 **Career Growth** - Advance in your chosen field

What would you like to know about? You can ask me about:
• Career options after 10th/12th
• Engineering, Medical, Commerce, Arts streams
• Skill development and learning paths
• Job opportunities and salary prospects
• Career planning and goal setting

How can I help you today?`;
}

// GET endpoint for testing (shows form)
app.get("/api/chat", (req, res) => {
  res.send(`
    <html>
      <head><title>Careerly AI Chatbot Test</title></head>
      <body style="font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px;">
        <h1>🤖 Careerly AI Career Guidance Chatbot</h1>
        <p>Test the chatbot by asking career questions!</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Try these questions:</h3>
          <ul>
            <li><a href="javascript:askQuestion('What to choose after 10th?')">What to choose after 10th?</a></li>
            <li><a href="javascript:askQuestion('Engineering career options')">Engineering career options</a></li>
            <li><a href="javascript:askQuestion('Medical field careers')">Medical field careers</a></li>
            <li><a href="javascript:askQuestion('Commerce career paths')">Commerce career paths</a></li>
            <li><a href="javascript:askQuestion('Skills to develop')">Skills to develop</a></li>
          </ul>
        </div>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px;">
          <h3>Or ask your own question:</h3>
          <input type="text" id="questionInput" placeholder="Ask about career guidance..." style="width: 70%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
          <button onclick="askQuestion(document.getElementById('questionInput').value)" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer;">Ask</button>
        </div>

        <div id="response" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; white-space: pre-wrap; display: none;"></div>

        <script>
          async function askQuestion(question) {
            if (!question.trim()) return;
            
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.innerHTML = '🤖 Thinking...';
            
            try {
              const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: question })
              });
              
              const data = await response.json();
              responseDiv.innerHTML = '🤖 ' + data.reply;
            } catch (error) {
              responseDiv.innerHTML = '❌ Error: ' + error.message;
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Chat endpoint with career guidance
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || !userMessage.trim()) {
    return res.status(400).json({ 
      error: "Message is required",
      reply: "Please ask me a question about career guidance!"
    });
  }

  try {
    // First try to get career guidance response
    const careerResponse = getCareerResponse(userMessage);
    
    // If it's a general question, try Hugging Face API for more natural conversation
    let finalResponse = careerResponse;
    
    if (userMessage.toLowerCase().includes('hello') || 
        userMessage.toLowerCase().includes('hi') || 
        userMessage.toLowerCase().includes('hey') ||
        careerResponse.includes('Hello! I\'m Careerly AI')) {
      
      try {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/meta-llama/Llama-3-8B-Instruct",
          { inputs: userMessage },
          {
            headers: {
              Authorization: `Bearer ${process.env.HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 5000 // 5 second timeout
          }
        );

        const hfResponse = response.data[0]?.generated_text;
        if (hfResponse && hfResponse.length > 10) {
          // Combine career guidance with AI response for greetings
          finalResponse = `Hello! I'm Careerly AI, your career guidance assistant. ${hfResponse}\n\n${careerResponse}`;
        }
      } catch (hfError) {
        console.log("HF API not available, using career guidance response");
        // Use career guidance response as fallback
      }
    }

    res.json({ 
      reply: finalResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error:", error.message);
    
    // Fallback career guidance response
    const fallbackResponse = `I'm here to help with career guidance! Here are some popular topics you can ask about:

🎯 **Career Options After 10th:**
• Which stream to choose - Science, Commerce, or Arts?
• Career paths in different streams
• How to make the right decision

🚀 **Engineering:**
• Best engineering branches
• Job opportunities and salary prospects
• Higher studies after engineering

🏥 **Medical:**
• MBBS and other medical courses
• NEET preparation and career paths
• Alternative healthcare careers

💰 **Commerce & Business:**
• CA, CS, CFA career options
• MBA and business degrees
• Finance and banking careers

🎨 **Arts & Humanities:**
• Law, psychology, journalism careers
• Government job opportunities
• Creative and social work careers

What would you like to know about?`;
    
    res.json({ 
      reply: fallbackResponse,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Careerly AI Career Guidance Chatbot is running!",
    timestamp: new Date().toISOString()
  });
});

// Get suggested questions endpoint
app.get("/api/suggestions", (req, res) => {
  const suggestions = [
    "What career options are available after 10th grade?",
    "Which engineering branch has the best job opportunities?",
    "How to prepare for NEET exam?",
    "What are the career options in commerce?",
    "Which professional course should I choose - CA, CS, or CFA?",
    "What are government job options after arts?",
    "What skills should I develop for my career?",
    "How to choose between science, commerce, and arts?",
    "What are the emerging career fields?",
    "How to plan my career path?"
  ];
  
  res.json({ 
    suggestions,
    message: "Here are some popular career guidance questions you can ask!"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Careerly AI Career Guidance Chatbot running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
  console.log(`💡 Suggestions: http://localhost:${PORT}/api/suggestions`);
});
