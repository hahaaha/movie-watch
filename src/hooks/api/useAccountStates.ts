import { useQuery } from '@tanstack/react-query';
import { getAccountStates } from '../../api/movie';

export const useAccountStates = (id: number) => {
  return useQuery({
    queryKey: ['accountStates', id],
    queryFn: () => getAccountStates(id),
  });
};
