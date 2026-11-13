import { Route, Routes, Navigate } from "react-router-dom";
import Home from './page/home';
import Gallery from './page/gallery';
import Projects from './page/projects';
import Knowledge from './page/knowledge';
import Contact from './page/contact';
import Team from './page/team';
import NotFound from './page/notfound';
import Navbar from './components/Navbar';
import BlogPost from './page/BlogPosts'; 
import About from './page/About'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/team" element={<Team />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes></>
    
  )
}

export default App
