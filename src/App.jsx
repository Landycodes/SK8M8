import './App.css'
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Navigate 
    } from 'react-router-dom'
import TrickRoulette from './Pages/TrickRoulette'


function App() {
    return (
        <main>
            <Router basename='/SK8M8'>
                <Routes>
                    <Route 
                        path='/' 
                        element={<TrickRoulette />}
                    />
                </Routes>
            </Router>
        </main>

    )
}

export default App
