import { useQuery } from '@tanstack/react-query';
import { getAccountDetails } from '../../api/account';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getAccountDetails,
  });
};
