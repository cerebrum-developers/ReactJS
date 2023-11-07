import style from "./summary.module.scss";
import { Libraries } from "./Card";

const Library = () => {
  const dataArr = [
    {
      name: "Document One",
      date: "04-05-2023",
      id: 1,
    },
    {
      name: "Document Two",
      date: "04-05-2023",
      id: 2,
    },
    {
      name: "Document Three",
      date: "04-05-2023",
      id: 3,
    },
    {
      name: "Document Four",
      date: "04-05-2023",
      id: 4,
    },
    {
      name: "Document Five",
      date: "04-05-2023",
      id: 5,
    },
    {
      name: "Document Six",
      date: "04-05-2023",
      id: 6,
    },
    {
      name: "Document Seven",
      date: "04-05-2023",
      id: 7,
    },
  ];

  return (
    <div className={style.libraryAll}>
      <div className={style.Hlibrary}>Huggingface Library</div>
      {dataArr.map((ele) => (
        <div key={ele.id}>
          <Libraries dataObj={ele} />
        </div>
      ))}
    </div>
  );
};

export default Library;
