import './Footer.css';
import React from 'react';
import Moutains from './../../../assets/img/footer-bg.svg';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="footer" style={{backgroundImage: `url(${Moutains})`}}>
            <span>&copy; Adopte un guide - {new Date().getFullYear()}</span>
            <span> &nbsp; |  &nbsp; </span>
            <span>
                <Link to={'/mentions-legales'}>
                    Mentions légales
                </Link>
            </span>
        </div>
    );
}

export default Home;