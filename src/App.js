import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Homepage from "./Homepage";
import Quiz from './Quiz';
import QuizMusic from './QuizMusic';
import QuizHistory from "./QuizHistory";
import Navbar from './Navbar';

import './index.css'
import './Quiz.css';

export default function App() {
    return (
        <>
           <Router>
           <Navbar sticky="top" />
                <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path= "/QuizMusic" element={<QuizMusic />}/>
                <Route path= "/QuizHistory" element={<QuizHistory />}/>
                <Route path = "/Homepage" element={<Homepage />} />
            </Routes>
            </Router>
            </>
    );
}


