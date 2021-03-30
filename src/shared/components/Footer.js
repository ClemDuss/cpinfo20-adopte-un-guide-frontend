import './Footer.css';

function Home() {
  return (
    <div className="footer">
        &copy; Adopte un guide - {new Date().getFullYear()}
    </div>
  );
}

export default Home;