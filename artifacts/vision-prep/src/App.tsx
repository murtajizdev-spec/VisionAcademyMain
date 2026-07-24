import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AnimatePresence } from 'framer-motion';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Faculty from '@/pages/Faculty';
import Results from '@/pages/Results';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import Admissions from '@/pages/Admissions';
import Contact from '@/pages/Contact';
import Gallery from '@/pages/Gallery';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Events from '@/pages/Events';

// Admin pages
import AdminCourses from '@/pages/admin/AdminCourses';
import AdminAdmissions from '@/pages/admin/AdminAdmissions';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminFaculty from '@/pages/admin/AdminFaculty';
import AdminBlogs from '@/pages/admin/AdminBlogs';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminGallery from '@/pages/admin/AdminGallery';
import AdminResults from '@/pages/admin/AdminResults';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminFAQs from '@/pages/admin/AdminFAQs';
import AdminSettings from '@/pages/admin/AdminSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:slug" component={CourseDetail} />
        <Route path="/admissions" component={Admissions} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/results" component={Results} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />

        {/* Admin Routes */}
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/courses" component={AdminCourses} />
        <Route path="/admin/admissions" component={AdminAdmissions} />
        <Route path="/admin/messages" component={AdminMessages} />
        <Route path="/admin/faculty" component={AdminFaculty} />
        <Route path="/admin/blogs" component={AdminBlogs} />
        <Route path="/admin/events" component={AdminEvents} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin/results" component={AdminResults} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/faqs" component={AdminFAQs} />
        <Route path="/admin/settings" component={AdminSettings} />

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
