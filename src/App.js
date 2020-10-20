import React, {useState, useEffect} from 'react';
import api from "./api/index"
import QuizListCard from './components/QuizListCard';

function App() {
  const [quizes, setQuizes] = useState([])

  useEffect(() => {
    api.getQuizes().then(res => setQuizes(res.data))
  }, [api, setQuizes])

  return (
    <div>
      {quizes.map(q => <QuizListCard name={q.name} />)}
    </div>
  );
}

export default App;
