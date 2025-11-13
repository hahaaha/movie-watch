import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommonError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <FontAwesomeIcon className="text-4xl" icon={faExclamationTriangle} />
      <div className="text-2xl font-bold">系统发生错误,请稍后再试</div>
      <div className="text-sm text-gray-500">{error.message}</div>
    </div>
  );
}
