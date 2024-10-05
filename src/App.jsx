import './App.css';
import PostsTraditional from './components/PostsTraditional';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import PostsRQ from './components/PostsRQ';
import PostDetailRQ from './components/PostDetailRQ';
import PaginatedQueries from './components/PaginatedQueries';
import InfinteQueries from './components/InfinteQueries';
import PostsRQForm from './components/PostsRQForm';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts-form">RQ Posts Form</Link>
            </li>
            <li>
              <Link to="/rq-fruits">RQ Fruits</Link>
            </li>
            <li>
              <Link to="/inf-rq-fruits">Infinte Fruits</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostsTraditional />} />
          <Route exact path='/rq-posts' element={<PostsRQ />} />
          <Route exact path='/rq-posts-form' element={<PostsRQForm/>} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailRQ />} />
          <Route exact path='/rq-fruits' element={<PaginatedQueries />} />
          <Route exact path='/inf-rq-fruits' element={<InfinteQueries/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;