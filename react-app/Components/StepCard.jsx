export default function StepCard({ stepNumber, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg">
          {stepNumber}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
