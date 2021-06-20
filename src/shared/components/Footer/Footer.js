import './Footer.css';
import React from 'react';
import Moutains from './../../../assets/img/footer-bg.svg';

function Home() {
    return (
        <div className="footer" style={{backgroundImage: `url(${Moutains})`}}>
            <span>&copy; Adopte un guide - {new Date().getFullYear()}</span>
        </div>
    );
}

export default Home;