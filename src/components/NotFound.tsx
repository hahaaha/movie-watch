import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <FontAwesomeIcon className="text-4xl" icon={faFaceSadCry} />
      <div className="text-2xl font-bold">404 Not Found</div>
      <div className="text-sm text-gray-500">页面不存在</div>
    </div>
  );
}
