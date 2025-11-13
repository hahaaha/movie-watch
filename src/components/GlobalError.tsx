import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GlobalError() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <FontAwesomeIcon className="text-4xl" icon={faExclamationTriangle} />
      <div className="text-2xl font-bold">系统发生错误</div>
      <div className="text-sm text-gray-500">请稍后重试或者联系系统管理员</div>
    </div>
  );
}
