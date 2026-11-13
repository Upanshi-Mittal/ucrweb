import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function NotFound() {
    return (
        <div className="pt-16">
            <section className="py-24">
                <div className="max-w-xl mx-auto px-4 text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black">404: Circuit Open</h1>
                    <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                        The requested path does not connect to any active node or component. Let's redirect you back to the main hub.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 rounded-xl border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all duration-300 shadow-[4px_4px_0_black] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#facc15]"
                    >
                        Return to Hub Home
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default NotFound;
