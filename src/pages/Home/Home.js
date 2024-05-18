import Footer from './components/Footer';
import Heading from './components/Heading';
import Heroes from './components/Heroes';
import Navbar from './components/Navbar';

function Home() {
    return (
        <div className="h-full dark:bg-[#1f1f1f]">
            <Navbar />
            <main className="h-full pt-40">
                <div className="min-h-full flex flex-col">
                    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                        <Heading />
                        <Heroes />
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default Home;
