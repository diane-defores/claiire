# TMV App - Wellness Tracker with AI Companion

A wellness tracking application featuring an AI-powered conversational companion (Tamagotchi-style) that helps users maintain better health habits through personalized guidance.

## Project Vision

TMV App combines:
- **Wellness tracking**: Sleep, mood, meals, and daily activities
- **AI Companion**: A 3D talking animal that knows your patterns and provides personalized guidance
- **Gamification**: RPG-style progress tracking with skills and experience points
- **Real-time conversational AI**: Voice-to-voice interaction using Gemini AI
- **Long-term memory**: Vector search for understanding user personality over time

## Tech Stack

### Frontend
- **React Native (Expo)**: Cross-platform mobile development (iOS & Android)
- **Rive**: Companion animations via state machines (kawaii character)
- **Reanimated**: UI animations

### Backend & Database
- **Convex**: Real-time database with vector search for AI memory
- **Clerk**: Authentication and user management (Flutter SDK)
- **Polar**: Payment processing and subscription management

### AI & Voice
- **llama.cpp on-device**: Local LLM (Gemma 2B / Llama 3.2 3B) — zero API cost
- **Native STT**: iOS Speech Framework / Android SpeechRecognizer — free
- **Native TTS**: iOS AVSpeech / Android TextToSpeech — free
- **Convex Vector Search**: RAG for long-term companion memory

## Project Structure

```
tmv-app/
├── shipflow_data/           # Canonical project governance
│   ├── business/            # Positioning, branding, product context
│   ├── technical/           # Technical governance and reference docs
│   └── workflow/            # Trackers and operational docs
├── assets/                 # Images and media files
│   ├── companion.png
│   ├── menu1.png
│   └── ...
├── _bmad/                  # BMAD Method configuration
│   ├── core/              # BMAD Core framework
│   └── bmm/               # BMAD Method agents and workflows
└── package.json           # Node.js project configuration
```

## BMAD Method Integration

This project uses the **BMAD Method** (Breakthrough Method for Agile AI-Driven Development) - a framework that orchestrates multiple specialized AI agents to work together like an agile development team.

### What is BMAD?

BMAD provides:
- **21 specialized AI agents** across different domains (PM, Architect, Developer, QA, UX Designer, etc.)
- **50+ guided workflows** that adapt to project complexity
- **Scale-adaptive intelligence** from bug fixes to enterprise systems
- **Context-preserved development** maintaining alignment throughout the lifecycle
- **IDE integration** with major AI coding assistants (Cursor, Windsurf, GitHub Copilot, Claude Code, etc.)

### Available BMAD Agents

The project includes 10 core agents:
- **PM (Product Manager)**: Translates requirements into user stories
- **Architect**: Designs system architecture and technical stack
- **Developer**: Implements features and writes code
- **QA**: Ensures quality through testing
- **UX Designer**: Crafts user experiences
- **Analyst**: Defines problems and success metrics
- **Scrum Master**: Organizes planning and breaks down work
- And more...

### Getting Started with BMAD

1. **Open any agent** in your AI coding assistant (Cursor, Windsurf, GitHub Copilot, etc.)
   - Agents are located in `.cursor/`, `.windsurf/`, `.github/`, etc. directories

2. **Initialize your project**:
   ```
   *workflow-init
   ```
   This analyzes your project and recommends the right workflow track.

3. **Use available workflows**:
   - `*workflow-greenfield`: For new projects from scratch
   - `*workflow-feature-dev`: Adding new features
   - `*workflow-debug-fix`: Bug fixing and debugging
   - `*workflow-refactor`: Code refactoring
   - And 30+ more specialized workflows

4. **Work with agents directly**:
   - Load an agent file (e.g., `.cursor/agents/pm.md`)
   - Ask questions or request specific tasks
   - Agents maintain context and collaborate

### BMAD Documentation

- [BMAD Method GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [BMAD Official Site](https://bemad.ai/)
- [YouTube Tutorials](https://www.youtube.com/@BMadCode)

## Next Steps

### 1. Choose Your Starting Point

**Option A: Start with a Template**
- **Recommended**: `turbo-expo-nextjs-clerk-convex-monorepo`
  - Complete startup architecture
  - Expo (mobile) + Next.js (web/admin) + Convex (backend)
  - Clerk authentication pre-configured
  - [GitHub Repository](https://github.com/get-convex/turbo-expo-nextjs-clerk-convex-monorepo)

- **Alternative**: `react-native-chat-convex`
  - Focus on chat functionality
  - UI chat interface ready
  - File upload support
  - [GitHub Repository](https://github.com/Galaxies-dev/react-native-chat-convex)

**Option B: Start from Scratch**
- Use BMAD's `*workflow-greenfield` to scaffold the project
- Let the Architect agent design the structure

### 2. Set Up the Development Environment

```bash
# Install dependencies
npm install

# Set up Expo
npx create-expo-app --template

# Initialize Convex
npx convex init

# Set up Clerk authentication
# Follow: https://clerk.com/docs/quickstarts/expo
```

### 3. Integrate 3D Character

Use the Tech Lead agent to:
```
Agis comme un Tech Lead expert en React Native.
Nous partons du template [chosen template].
Tâche Prioritaire : Installe et configure React Three Fiber 
pour qu'il fonctionne dans l'environnement Expo actuel.
```

### 4. Implement Core Features

Work with BMAD agents to implement:

1. **User Authentication** (Clerk integration)
2. **Wellness Data Tracking** (Convex schema)
3. **AI Conversational Backend** (Convex actions + Gemini)
4. **Vector Memory System** (Convex vector search)
5. **3D Companion Rendering** (React Three Fiber)
6. **Voice Integration** (Whisper + OpenAI TTS)

### 5. Use BMAD Workflows

For each feature:
```
*workflow-feature-dev
```

For debugging issues:
```
*workflow-debug-fix
```

For code improvements:
```
*workflow-refactor
```

## Key Design Decisions

### Architecture: Local Body, Cloud Brain
- **3D rendering happens on device** (React Three Fiber) to avoid latency
- **AI processing happens in cloud** (Gemini via Convex)
- **Audio streaming** with emotion triggers for instant animations

### Data Strategy: Asynchronous Processing
- **Real-time**: User interactions, chat, basic tracking
- **Nightly batch**: Complex analytics and predictions (stored in `features_precalculees`)
- **Result**: Fast responses using pre-calculated insights

### Cost Optimization
- **Estimated cost per active user**: €0.50-€1.00/month
- **Primary cost**: Voice synthesis (OpenAI TTS)
- **Strategy**: Freemium model or subscription-based access

## Development Principles

1. **BMAD-First Development**: Use specialized agents for their expertise
2. **TypeScript Everywhere**: Frontend, backend, and tooling
3. **Real-time by Default**: Leverage Convex's reactive nature
4. **Context Preservation**: Keep agent context aligned across sprints
5. **Incremental Progress**: Build in small, testable increments

## Contributing

This project uses BMAD Method for development. To contribute:

1. Install BMAD in your environment
2. Use the appropriate workflow for your contribution type
3. Collaborate with agents to maintain code quality
4. Follow the project's established patterns

## Resources

- **Business docs**: `shipflow_data/business/`
- **Technical docs**: `shipflow_data/technical/`
- **Workflow trackers**: `shipflow_data/workflow/`
- **BMAD Documentation**: `_bmad/` directory

## License

[Add your license here]

---

**Ready to start building?** Load the PM agent in your AI assistant and type `*workflow-init` to begin!
