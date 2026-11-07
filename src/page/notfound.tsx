import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function NotFound() {
    return (
        <div className="pt-16">
            <section className="py-24">
                <div className="max-w-xl mx-auto px-4 text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold">Page not found</h1>
                    <p className="text-xl">The page you're looking for doesn't exist or has moved.</p>
                    <Link
                        to="/"
                        className="inline-block px-4 py-2 rounded-xl border-2 border-black bg-white font-medium transition-all duration-300 shadow-[4px_4px_0_black] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#facc15]"
                    >
                        Back to home
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default NotFound;
