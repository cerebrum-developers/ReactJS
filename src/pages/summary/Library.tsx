import React from 'react';
import style from './summary.module.scss';
import { Libraries } from './Card';

const Library = () => {
  const dataArr = [
    {
      name: 'Document One',
      date: '04-05-2023',
    },
    {
      name: 'Document Two',
      date: '04-05-2023',
    },
    {
      name: 'Document Three',
      date: '04-05-2023',
    },
    {
      name: 'Document Four',
      date: '04-05-2023',
    },
    {
      name: 'Document Five',
      date: '04-05-2023',
    },
    {
      name: 'Document Six',
      date: '04-05-2023',
    },
    {
      name: 'Document Seven',
      date: '04-05-2023',
    },
  ];

  return (
    <div className={style.libraryAll}>
      <div className={style.Hlibrary}>Huggingface Library</div>
      {dataArr.map((ele) => (
        <Libraries dataObj={ele} />
      ))}
    </div>
  );
};

export default Library;
