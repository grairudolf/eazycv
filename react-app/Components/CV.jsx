import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cvService } from '../src/services/api';
import { transformToReactFormat } from '../src/utils/dataTransform';
import { 
  SparklesIcon, 
  DocumentArrowDownIcon, 
  PencilSquareIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon
} from '../src/utils/icons';

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}>
      {type === 'success' ? (
        <CheckCircleIcon className="w-5 h-5" />
      ) : (
        <XCircleIcon className="w-5 h-5" />
      )}
      <span>{message}</span>
    </div>
  );
}

export default function CVPreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState(null);
  const cvPageRef = useRef(null);

  useEffect(() => {
    // Try to load CV data from backend first, fallback to localStorage
    const storedId = localStorage.getItem('eazycv_current_cv_id');
    const cvId = id || storedId;
    
    if (cvId) {
      // Fetch from backend
      cvService.get(cvId)
        .then(response => {
          const reactData = transformToReactFormat(response.data);
          setCvData(reactData);
        })
        .catch(error => {
          console.error('Error fetching CV from backend:', error);
          // Fallback to localStorage
          const savedData = localStorage.getItem('cvData');
          if (savedData) {
            setCvData(JSON.parse(savedData));
          }
        });
    } else {
      // Fallback to localStorage
      const savedData = localStorage.getItem('cvData');
      if (savedData) {
        setCvData(JSON.parse(savedData));
      }
    }
  }, []);

  const handleOptimize = async () => {
    if (!cvData) return;
    
    const cvId = id || localStorage.getItem('eazycv_current_cv_id');
    if (!cvId) {
      setToast({ message: 'No CV ID found. Please create a new CV first.', type: 'error' });
      return;
    }
    
    setOptimizing(true);
    try {
      const response = await cvService.optimize(cvId);
      const reactData = transformToReactFormat(response.data);
      const updatedCvData = {
        ...cvData,
        ...reactData,
        summary: response.data.optimized_cv || response.data.personal.summary,
      };
      setCvData(updatedCvData);
      localStorage.setItem('cvData', JSON.stringify(updatedCvData));
      setToast({ message: 'CV optimized successfully with AI', type: 'success' });
    } catch (error) {
      console.error('Error optimizing CV:', error);
      setToast({ message: 'Failed to optimize CV. Please try again.', type: 'error' });
    } finally {
      setOptimizing(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      window.print();
      setToast({ message: 'Opening print dialog...', type: 'success' });
    } catch (error) {
      console.error('Error downloading CV:', error);
      setToast({ message: 'Failed to open print dialog. Please try again.', type: 'error' });
    } finally {
      setDownloading(false);
    }
  };

  if (!cvData) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4 flex items-center justify-center">
                <DocumentTextIcon className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">No CV Found</h1>
              <p className="text-lg text-gray-600 mb-8">Create your first CV to get started!</p>
            </div>
            <button
              onClick={() => navigate('/form')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Create Your CV
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-24 right-4 z-50">
            <Toast 
              message={toast.message} 
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          {/* Action Bar */}
          <div className="flex gap-3 mb-8 print:hidden flex-wrap justify-between items-center">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleOptimize}
                disabled={optimizing}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center gap-2 duration-200"
              >
                {optimizing ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Optimize with AI
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center gap-2 duration-200"
              >
                {downloading ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <DocumentArrowDownIcon className="w-5 h-5" />
                    Download / Print PDF
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => navigate('/form')}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg flex items-center gap-2 duration-200"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Edit
            </button>
          </div>

          {/* CV Preview Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
            {/* CV Page Content */}
            <div
              ref={cvPageRef}
              className="relative bg-white p-12 min-h-screen print:p-8 print:min-h-auto"
              style={{ aspectRatio: '8.5 / 11' }}
            >
              {/* Watermark */}
              <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none z-0 print:opacity-30">
                <div className="text-center">
                <img src="logo.png" alt="eazycv_logo" className="w-20 h-15" />
                  <div className="text-xs text-blue-600 mt-1 tracking-widest">
                    CREATED WITH EAZYCV
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <header className="pb-6 mb-8 border-b-4 border-blue-600 print:pb-4 print:mb-6 print:border-b-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h1 className="text-5xl font-black text-blue-600 leading-tight print:text-4xl">
                        {cvData.firstName} {cvData.secondName}
                      </h1>
                      <p className="text-gray-500 text-sm tracking-wide mt-2">
                        {cvData.title || 'Professional'} · Powered by EazyCV
                      </p>
                    </div>
                    <div className="flex-1 md:text-right text-gray-600 text-sm space-y-1 print:text-xs">
                      {cvData.email && <p className="font-medium">{cvData.email}</p>}
                      {cvData.phone && <p>{cvData.phone}</p>}
                      {(cvData.city || cvData.country) && (
                        <p>{cvData.city && cvData.city}{cvData.city && cvData.country && ', '}{cvData.country}</p>
                      )}
                      {cvData.website && <p>{cvData.website}</p>}
                      {cvData.linkedin && <p>{cvData.linkedin}</p>}
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="space-y-8 print:space-y-6">
                  {/* Profile Section */}
                  {cvData.summary && (
                    <section className="page-break-inside-avoid">
                      <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3 pb-2 border-b-2 border-blue-200 print:text-base print:mb-2 print:pb-1">
                        Professional Profile
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-justify print:text-sm print:leading-relaxed">
                        {cvData.summary}
                      </p>
                    </section>
                  )}

                  {/* Experience Section */}
                  {cvData.experiences && cvData.experiences.length > 0 && (
                    <section className="page-break-inside-avoid">
                      <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3 pb-2 border-b-2 border-blue-200 print:text-base print:mb-2 print:pb-1">
                        Professional Experience
                      </h2>
                      <div className="space-y-4 print:space-y-2">
                        {cvData.experiences.map((exp, index) => (
                          <div key={`exp-${index}`} className="space-y-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <p className="font-semibold text-gray-900">{exp.role}</p>
                              <p className="text-sm text-gray-500">{[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}</p>
                            </div>
                            <p className="text-sm text-gray-600">{exp.company}</p>
                            {exp.description && (
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education Section */}
                  {cvData.educations && cvData.educations.length > 0 && (
                    <section className="page-break-inside-avoid">
                      <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3 pb-2 border-b-2 border-blue-200 print:text-base print:mb-2 print:pb-1">
                        Education
                      </h2>
                      <div className="space-y-4">
                        {cvData.educations.map((edu, index) => (
                          <div key={`edu-${index}`} className="space-y-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <p className="font-semibold text-gray-900 print:text-sm">
                                {edu.degree}
                              </p>
                              <p className="text-sm text-gray-500">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</p>
                            </div>
                            <p className="text-gray-600 text-sm print:text-xs">
                              {edu.institution}
                            </p>
                            {edu.description && (
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Skills Section */}
                  {cvData.skills && (
                    <section className="page-break-inside-avoid">
                      <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3 pb-2 border-b-2 border-blue-200 print:text-base print:mb-2 print:pb-1">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-3 print:gap-2">
                        {cvData.skills.split(',').map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 print:px-2 print:py-1 print:text-xs"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </main>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-xs print:mt-8 print:pt-4 print:border-t">
                  <p className="font-medium">
                    This CV was created with <span className="text-blue-600 font-semibold">EazyCV</span>
                  </p>
                </footer>
              </div>
            </div>
          </div>

          {/* Print Tip */}
          <div className="mt-6 text-center text-gray-600 text-sm print:hidden">
            <p className="inline-flex items-center justify-center gap-2">
              <InformationCircleIcon className="w-5 h-5 text-gray-600" />
              <span>Tip: Use <kbd className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">Ctrl+P</kbd> (or <kbd className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">Cmd+P</kbd>) for best results when printing</span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and print */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        @media print {
          body {
            background: white;
          }
          
          * {
            box-shadow: none !important;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}
