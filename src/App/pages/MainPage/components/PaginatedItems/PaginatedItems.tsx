import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './PaginatedItems.module.scss';
import ArrowRightIcon from 'icons/ArrowRight';
import ArrowLeftIcon from 'icons/ArrowLeftIcon';
import { RepositoryType } from 'App/types';

type Props = {
  itemsPerPage: number;
  children: React.ReactNode[];
  condition: (values?: string[]) => boolean;
  reps: RepositoryType[];
};

type EventType = {
  selected: number;
};

const PaginatedItems: React.FC<Props> = ({ itemsPerPage, children, condition, reps }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  children = children.filter((child) => {
    return child && condition(reps[(child as any).key].topics);
  });

  const currentItems = children.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(children.length / itemsPerPage);

  const handlePageClick = (event: EventType) => {
    const newOffset = (event.selected * itemsPerPage) % children.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems}
      {currentItems.length > 0 && !currentItems.includes(false) && (
        <ReactPaginate
          activeClassName={`${styles.item} ${styles.active}`}
          breakClassName={styles.item}
          breakLabel={'...'}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          disabledClassName={styles.disabledPage}
          nextClassName={`${styles.item} ${styles.next}`}
          nextLabel={<ArrowRightIcon className={styles.icon} />}
          pageCount={pageCount}
          pageClassName={styles.item}
          previousClassName={`${styles.item} ${styles.previous}`}
          previousLabel={<ArrowLeftIcon className={styles.icon} />}
        />
      )}
    </>
  );
};

export default PaginatedItems;
