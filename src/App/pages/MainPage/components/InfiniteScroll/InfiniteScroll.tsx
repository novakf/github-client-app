import React, { useEffect, useState } from 'react';
import { RepositoryType } from 'App/types';

type Props = {
  repsOwner?: string;
  reps: RepositoryType[];
  itemsPerPage: number;
  renderRep: (value: RepositoryType) => JSX.Element;
};

const InfiniteScroll: React.FC<Props> = ({ repsOwner, itemsPerPage, reps, renderRep }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState<number>(1);

  const currentReps = reps.slice(0, itemOffset + itemsPerPage);

  useEffect(() => {
    setItemOffset(0);
    setPage(1);
  }, [repsOwner]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setItemOffset(itemOffset + itemsPerPage);
      setPage(page + 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return currentReps.map(renderRep);
};

export default InfiniteScroll;
