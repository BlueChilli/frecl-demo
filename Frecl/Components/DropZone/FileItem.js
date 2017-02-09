import React, {PropTypes} from "react";
import {canUseDOM} from "../../Helpers/canUseDOM";

/** Internal component used to display and delete a file item in a list */
const FileItem = ({file, deleteFile, index}) => {
  function onClick(e) {
    e.preventDefault();
    deleteFile(index);
  }

  return (
    <li className="file-item">
      {file.name}
      <button type="button" onClick={onClick}>x</button>
    </li>
  )
};

const filePropType = canUseDOM ? PropTypes.instanceOf(File) : PropTypes.object;

FileItem.propTypes = {
  /** The file to display */
  file: filePropType,
  /** Function to fire when the delete button is clicked */
  deleteFile: PropTypes.function,
  /** Index of the file to delete */
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};


export default FileItem
