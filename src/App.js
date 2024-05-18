import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { Toaster } from 'sonner';

import { ThemeProvider } from './providers/ThemeProvider';
import { Home } from './pages/Home';
import { Documents } from './pages/Documents';
import { Preview } from './pages/Preview';
import { Error } from './pages/Error';

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL);
const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

function App() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider>
                    <div className="App">
                        <Toaster position="bottom-center" />
                        <Router>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/documents/" element={<Documents />} />
                                <Route path="/documents/:documentId" element={<Documents />} />
                                <Route path="/preview/:documentId" element={<Preview />} />
                                <Route path="/error" element={<Error />} />
                            </Routes>
                        </Router>
                    </div>
                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

export default App;
