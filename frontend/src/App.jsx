import {Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import TrendingMovies from './pages/TrendingMovies.jsx'
import TopRatedMovies from './pages/TopRatedMovies.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Movies from './pages/Movies.jsx'
import TvShow from './pages/TvShow.jsx'
import MobileNavigation from './components/MobileNavigation.jsx'
import MovieDetails from './pages/MovieDetails.jsx'


function App() {

  return (
    <main className="App">
      <Header />
      <div className='my-16 pb-6'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trending" element={<TrendingMovies />} />
          <Route path="/topRated" element={<TopRatedMovies />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/tv" element={<TvShow />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  )
}

export default App
