import ProtectedRoute from '@/app/ProtectedRoute';
import Question from '@/app/(_components)/test/Question';

export default function QuestionPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px] pb-[70px] flex flex-col justify-center">
        <Question />
      </div>
    </ProtectedRoute>
  );
}
