import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './NotFoundPage.styles';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate('/');
    }
  });

  return (
    <Container>
      <div>
        웁스바리 <span>404</span> 링딩동
      </div>
      <p>존재하지 않는 페이지로 접근하셨네요</p>
      <small>
        <span>{count}</span>초 뒤 메인페이지로 이동할게요 🏃‍♀️💨
      </small>
    </Container>
  );
};

export default NotFoundPage;
