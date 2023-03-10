import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "../../pages/About";
import { Contact } from "../../pages/Contact";
import { HomePage } from "../../pages/HomePage";


export const MyRouts = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}