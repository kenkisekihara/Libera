import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ArticlePage from './pages/Article';

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
