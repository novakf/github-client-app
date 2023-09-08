import React from 'react';
import { useParams } from 'react-router-dom';

const RepositoryPage: React.FC = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default RepositoryPage;
