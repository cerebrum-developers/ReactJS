import { Dispatch } from "redux";
import { editUser, deleteUser } from "store/actions/editDocumentSet";
import { getDocumentSets } from "pages/Extract/ExtractDocumentSlice";
import { editTable, deleteTable, getTableSets } from "pages/ManageDocuments/getTableSetsSlice";
import { getPageSets, editPage, deletePage } from "store/actions/getPageSets";
import { getImageSets, editImage, deleteImage } from "store/actions/getImageSets";
import { editSearch, deleteSearch } from "store/actions/editSearch";
import { editTableCells, getTableCells, deleteTableCells } from "store/actions/saveTableCells";

interface ExtractObject {
  PDF: string;
  page: string;
  _page_id: string;
  _table_id: string;
  _table_label: string;
  row_header_texts: null | any[];
  _row_header_score: number;
  col_header_texts: null | any[];
  _col_header_score: number;
  data_point_text: string;
  row_header_input: string;
  col_header_input: string;
  data_point_number: number;
  _row_header_cell_ids: string;
  _row_header_cell_ltrbs: any[];
  _col_header_cell_ids: string;
  _col_header_cell_ltrbs: any[];
  _data_point_cell_id: string;
  _data_point_ltrb: any[];
  _text_above: string;
  Value: number;
  Item: string;
  Format: string;
  Units: string;
  Year: string;
  Currency: string;
  Period: string;
  "Term Ending": string;
  "Table Header": string;
  "Page Number": number;
  Source: string;
  Table_id: string;
  Cell_id: string;
}

export const saveData = async (
  typeName: string,
  source_filename: any,
  save_to_filename: any,
  dispatch: Dispatch,
  callSearchDataGetApi: () => void
) => {
  if (typeName === "documents") {
    await dispatch(editUser({ source_filename, save_to_filename }));
    dispatch(getDocumentSets());
  } else if (typeName === "tables") {
    await dispatch(editTable({ source_filename, save_to_filename }));
    dispatch(getTableSets());
  } else if (typeName === "pages") {
    await dispatch(editPage({ source_filename, save_to_filename }));
    dispatch(getPageSets());
  } else if (typeName === "images") {
    await dispatch(editImage({ source_filename, save_to_filename }));
    dispatch(getImageSets());
  } else if (typeName === "search") {
    await dispatch(editSearch({ source_filename, save_to_filename }));
    callSearchDataGetApi();
  } else if (typeName === "table cell") {
    await dispatch(editTableCells({ source_filename, save_to_filename }));
    dispatch(getTableCells());
  }
};

export const deleteDataDispatch = async (
  dispatch: Dispatch,
  typeName: string,
  source_filename: any,
  callSearchDataGetApi: () => void
) => {
  if (typeName === "documents") {
    await dispatch(deleteUser(source_filename));
    dispatch(getDocumentSets());
  } else if (typeName === "tables") {
    await dispatch(deleteTable(source_filename));
    dispatch(getTableSets());
  } else if (typeName === "pages") {
    await dispatch(deletePage(source_filename));
    dispatch(getPageSets());
  } else if (typeName === "images") {
    await dispatch(deleteImage(source_filename));
    dispatch(getImageSets());
  } else if (typeName === "search") {
    await dispatch(deleteSearch(source_filename));
    callSearchDataGetApi();
  } else if (typeName === "table cell") {
    await dispatch(deleteTableCells(source_filename));
    dispatch(getTableCells());
  }
};

export const dataTaskFunction = (dataTask: any, obj: ExtractObject = {}): any[] => {
  let data: any[] = [];
  dataTask?.queries?.forEach((e: any) => {
    let myObj2: any = e?.datapoints.length ? e?.datapoints : new Array(dataTask?.queries?.[0]?.datapoints.length).fill([obj]);
    if (!e?.datapoints.length) {
      myObj2?.forEach((ele: any, ind: number) => {
        ele[0].PDF = dataTask.queries?.[0]?.datapoints[ind][0].PDF;
        ele[0].col_header_texts = dataTask.queries?.[0]?.datapoints[ind][0].col_header_texts;
        ele[0].col_header_input = dataTask.queries?.[0]?.datapoints[ind][0].col_header_input;
        ele[0].row_header_input = e?.query;
        ele[0].Value_formatted = "";
        ele[0].Year = dataTask.queries?.[0]?.datapoints[ind][0].Year;
      });
    }
    data = [...data, ...myObj2];
  });
  return data;
};

export const taskOptionFunc = (taskOpt: any, dataTableCells: any): any[] => {
  let option: any[] = [];
  if (taskOpt?.data?.myTasks?.length) {
    let opt = taskOpt?.data?.myTasks?.map((ele: any) => {
      return { label: Object.keys(ele)?.[0], value: Object.keys(ele)?.[0], data: ele?.[Object.keys(ele)?.[0]], group: "task" };
    });
    option = [{ label: "Extraction tasks", options: [...opt, { label: "due_date", value: "due_date", data: null }] }];
  }

  if (dataTableCells && "myTableCells" in dataTableCells) {
    if (dataTableCells["myTableCells"]) {
      let key: any[] = [];
      dataTableCells["myTableCells"].forEach((e: any) => {
        key.push({ label: Object.keys(e)[0], value: Object.keys(e)[0], data: e?.[Object.keys(e)[0]], group: "search" });
      });
      option = [...option, { label: "Search tasks", options: key }];
    }
  }
  return option;
};
