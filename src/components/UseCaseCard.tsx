import { UseCase } from '../types';

interface UseCaseCardProps {
  useCase: UseCase;
  onClick: () => void;
}

const statusColors: Record<string, string> = {
  Live: 'bg-green-600',
  MVP: 'bg-blue-600',
  PoC: 'bg-orange-500',
  Evaluation: 'bg-yellow-600',
  'Pre-Evaluation': 'bg-purple-600',
  Ideation: 'bg-gray-500',
  Archived: 'bg-gray-400'
};

const defaultImages: Record<string, string> = {
  Marketing: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  'R&D': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
  Procurement: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
  IT: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
  HR: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
  Operations: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export default function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  const departmentImage = defaultImages[useCase.department];
  const statusColor = statusColors[useCase.status] || 'bg-gray-500';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.03]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative h-[180px] w-full overflow-hidden">
        <img
          src={departmentImage}
          alt={useCase.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute top-4 left-4">
          <span
            className={`${statusColor} text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm bg-opacity-90`}
          >
            {useCase.status}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold tracking-wide">
            {useCase.department}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
          {useCase.title}
        </h3>
        <p className="text-gray-600 text-base mb-3 line-clamp-3">
          {useCase.short_description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {useCase.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          By {useCase.owner_name} – {useCase.department}
        </p>
      </div>
    </div>
  );
}
