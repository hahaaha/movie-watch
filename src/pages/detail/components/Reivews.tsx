import { useParams } from 'react-router';
import { useMovieReviews } from '../../../hooks/api/useMovieReviews';
import type { Review } from '../../../types/movie';

export default function Reviews() {
  const { id } = useParams();
  const { data: reviews, isLoading } = useMovieReviews(Number(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold">评价</div>
      {reviews?.results?.length === 0 && <div>暂无评价</div>}
      <div className="list space-y-2">
        {reviews?.results?.map((review: Review) => (
          <div key={review.id} className="list-row">
            <div className="space-y-1">
              <div className="text-lg font-bold">{review.author}的评价</div>
              <div>{review.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
