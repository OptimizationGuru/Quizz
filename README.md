# Quiz Application

A modern, feature-rich quiz application built with React and Tailwind CSS. Create custom quizzes, take timed assessments, review your results, and track your progress over time.

![Quiz Application](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff)

## ✨ Features

### Core Features
- **Take Quizzes**: Answer single-choice and multiple-choice questions with timer support
- **Score & Review**: Get detailed feedback on your answers with correct/incorrect indicators
- **Quiz History**: Track all your past quiz attempts with scores and timestamps
- **Create Quizzes**: Build custom quizzes with your own questions
- **Timer Support**: Optional time limits for quizzes with visual countdown
- **Question Navigation**: Jump between questions and see your progress

### Question Types
- **Single Choice**: Questions with one correct answer
- **Multiple Choice**: Questions with multiple correct answers

### UI/UX Features
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Clean Interface**: Soft, modern design with gradient accents
- **Visual Feedback**: Color-coded scores and answer indicators
- **Progress Tracking**: Visual progress bars and question indicators
- **Performance Optimized**: Built with React best practices for smooth performance

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OptimizationGuru/Quizz.git
   cd Quizz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will be available at `http://localhost:5173`
   - The terminal will display the exact URL

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### Taking a Quiz

1. From the home screen, click **"Start Quiz"** on any quiz card
2. Answer questions by clicking on options
3. Use **Previous/Next** buttons or question indicators to navigate
4. Click **"Submit Quiz"** when finished (or it auto-submits when timer ends)
5. Review your score and detailed answers

### Creating a Quiz

1. Click **"➕ Create Quiz"** from the home screen
2. Fill in quiz details:
   - **Title** (required)
   - **Description** (optional)
   - **Time Limit** in minutes (optional)
3. Add questions:
   - Click **🔘 Single Choice** or **☑️ Multiple Choice** buttons
   - Enter question text
   - Fill in 4 options
   - Select correct answer(s)
   - Click **"Add Question"**
4. Click **"💾 Save Quiz"** when done

### Viewing History

1. Click **"📊 View History"** from the home screen
2. See all your past quiz attempts
3. Click **"📖 Review Details"** to see detailed review of any attempt

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── HomeView.jsx    # Home screen with quiz list
│   ├── QuizView.jsx    # Quiz taking interface
│   ├── ReviewView.jsx  # Score and answer review
│   ├── CreateQuizView.jsx  # Quiz creation form
│   ├── HistoryView.jsx # Quiz history display
│   └── ...             # Other components
├── services/           # Business logic services
│   ├── localStorageService.js  # Generic localStorage operations
│   ├── quizService.js          # Quiz CRUD operations
│   └── historyService.js       # History operations
├── App.jsx            # Main app component
└── main.jsx           # React entry point
```

## 🎨 Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **LocalStorage** - Data persistence

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 375px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## 💾 Data Storage

All quiz data and history are stored locally in the browser's `localStorage`:
- **Quizzes**: Stored under `'quizzes'` key
- **History**: Stored under `'quizHistory'` key

Data persists across browser sessions and page refreshes.


## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- Components are modular and reusable
- Services handle business logic
- Follows React best practices
- Uses Tailwind CSS for styling

## 🎯 Features Breakdown

### Phase 1: Project Setup ✅
- Vite + React configuration
- Tailwind CSS setup
- Project structure

### Phase 2: Core Structure ✅
- Service layer architecture
- State management
- View routing

### Phase 3: Home View ✅
- Quiz listing
- Navigation buttons
- Empty states

### Phase 4: Quiz Taking ✅
- Question display
- Answer selection
- Timer functionality

### Phase 5: Navigation & Progress ✅
- Question navigation
- Progress indicators
- Submit functionality

### Phase 6: Review System ✅
- Score display
- Answer review
- Color-coded feedback

### Phase 7: Create Quiz ✅
- Quiz creation form
- Question editor
- Question management

### Phase 8: History View ✅
- Past attempts display
- Score tracking
- Review previous attempts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**OptimizationGuru**

- GitHub: [@OptimizationGuru](https://github.com/OptimizationGuru)

## 🙏 Acknowledgments

- Built as a machine coding project
- Demonstrates modern React patterns and best practices
- Showcases responsive design and performance optimization

---

**Made with ❤️ using React and Tailwind CSS**

