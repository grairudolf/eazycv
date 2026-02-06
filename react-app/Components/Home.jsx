import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, SparklesIcon } from '../src/utils/icons';
import FeatureCard from './FeatureCard';
import StepCard from './StepCard';
import { getSession } from '../src/utils/auth';

const heroHighlights = [
  'AI-written summaries in seconds',
  'Guided multi-step form with validation',
  'Instant PDF-ready preview & print-ready layout',
];

const heroStats = [
  { label: 'Avg. build time', value: '6 min' }
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(!!getSession());
    };
    updateAuth();
    window.addEventListener('eazycv-auth-change', updateAuth);

    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('eazycv-auth-change', updateAuth);
    };
  }, []);

  return (
    <>
      <main className="bg-white">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-20 px-4 md:px-8">
          <div className="absolute inset-x-[-10%] top-0 h-72 bg-gradient-to-br from-blue-100 to-transparent blur-3xl opacity-60 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1 text-xs font-semibold text-blue-600 shadow">
                <SparklesIcon className="w-4 h-4 text-blue-500" /> AI-assisted CVs
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight">
                Build a standout CV in minutes with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EazyCV
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Answer focused prompts, preview your layout instantly, and use AI-powered clarity edits to highlight your impact. Every field is structured to keep your CV professional and ATS-ready.
              </p>
              <ul className="grid gap-3 text-gray-600">
                {heroHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 items-start">
                    <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/cv"
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View my CV
                    </Link>
                    <Link
                      to="/form"
                      className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
                    >
                      Create new CV
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Create account
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-sm uppercase tracking-wide text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-500">EazyCV Preview</p>
                    <p className="text-xs text-gray-500">Live layout</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    AI ready
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-50 p-3 shadow">
                      <img src="/logo.png" alt="EazyCV" className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">EazyCV Designer</p>
                      <p className="text-sm text-gray-500">Career storytelling perfected</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-widest text-blue-500">Professional Summary</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      “Strategic product designer turned full-stack maker — blending data, design, and AI to ship high-converting CVs with clarity and confidence.”
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Experience</p>
                      <p className="text-sm text-gray-900 font-semibold">Senior Product Designer</p>
                    </div>
                    <div className="flex-1 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Education</p>
                      <p className="text-sm text-gray-900 font-semibold">MSc HCI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How EazyCV works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Go from blank page to a polished CV in three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <StepCard
                stepNumber={1}
                title="Tell us about yourself"
                description="Answer intuitive questions about your experience, education, and skills. Our form guides you to provide complete, relevant information."
              />
              <StepCard
                stepNumber={2}
                title="Preview your CV"
                description="See your CV come to life instantly. Professional layout automatically formats your information for maximum impact."
              />
              <StepCard
                stepNumber={3}
                title="Refine with AI"
                description="Use our AI-powered optimization to enhance your summary and achievements. Get suggestions that make you stand out."
              />
            </div>
          </div>
        </section>

        {/* Why EazyCV Section */}
        <section id="templates" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why candidates use EazyCV</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We've built tools that actually help you get hired.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard
                title="Simple, focused design"
                description="Our ATS-friendly template is optimized for both human recruiters and applicant tracking systems. Clean formatting ensures nothing gets lost in parsing."
              />
              <FeatureCard
                title="Built for speed"
                description="Create a professional CV in just 10 minutes. No complicated wizards or unnecessary steps. Just the essentials, done right."
              />
              <FeatureCard
                title="Own your data"
                description="Your information stays on your device in local demo mode. No cloud uploads, no tracking, no data selling. Complete privacy."
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              EazyCV is an open-source project. Want to contribute? Fork the project on GitHub or open an issue with feature requests and feedback.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
