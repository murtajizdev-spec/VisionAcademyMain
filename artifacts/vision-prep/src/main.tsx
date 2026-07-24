import { createRoot } from 'react-dom/client';
import { setBaseUrl, setAuthTokenGetter } from '@workspace/api-client-react';

import App from './App';
import './index.css';

// Configure API base URL — uses same origin in production (relative paths),
// or the Replit dev domain for local dev. The BASE_URL Vite injects already
// includes the artifact path prefix (e.g. "/").
const apiBase = import.meta.env.VITE_API_URL ?? '/api';
setBaseUrl(apiBase);

// Attach JWT from localStorage so admin routes are authenticated
setAuthTokenGetter(() => localStorage.getItem('vp_token'));

createRoot(document.getElementById('root')!).render(<App />);
