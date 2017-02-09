import React, {PropTypes, Children} from "react";
import {isDOMComponent} from "react-addons-test-utils";
import {List, Map} from "immutable";
import {first} from "lodash";
import DropZone from "react-dropzone";
import classnames from "classnames";
import {compose} from "recompose";
import inputHOC from "../Form/Helpers/inputHOC";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import FileItem from "./FileItem";
import {DropZoneProps, DropZoneInputHOCWithHandlersProps, DropZoneFile} from "../Form/Types/types";


const isFileArray = (files: DropZoneFile) => {
  return List.isList(files) && files.size > 1;
};

const isSingleFile = (files: DropZoneFile) => {
  return List.isList(files) && files.size === 1;
};

const PassDownProps = (props, children) => {
  if (children.type === 'span' || children.type === 'div') {
    return React.cloneElement(children);
  } else {
    return React.cloneElement(children, {
      ...props
    });
  }
};

class DropZoneFrecl extends React.Component<DropZoneInputHOCWithHandlersProps, {}>{
  public static defaultProps:any = {
    children: (<div>Drop Here</div>)
  }
  componentDidMount(){
    this.props.inputChanged(this.getFiles(), false);
  }
  getFiles = () => {
    const {value} = this.props;
    return isFileArray(value) ? value : isSingleFile(value) ? value : null;
  }
  onDrop = (files: File[]) => {
    if (this.props.multiple !== false) {
      const immutFiles = List(files);
      const stateFiles = this.getFiles();
      const removedDuplicates = immutFiles.filter(file => {
        return stateFiles.every(stateFile => {
          return stateFile.get('name') !== file.name
        });
      });
      this.props.inputChanged(removedDuplicates.concat(stateFiles));
    } else {
      this.props.inputChanged(List(Map<string, any>(first<File>(files))));
    }
  }
  deleteFile = (index: number) => {
    const stateFiles = this.getFiles();
    this.props.inputChanged(stateFiles.delete(index));
  }
  render() {
    const {children, className, showList = true, getAttributes} = this.props;
    const attributes = getAttributes();
    const files = this.getFiles();
    const classes = classnames("drop-zone-box", className);
    return (
      <div className="drop-zone">
          <DropZone className={classes} onDrop={this.onDrop} {...attributes}>
            {PassDownProps({files}, children)}
          </DropZone>
        {showList && <ul className="drop-zone-files-list">
          {isFileArray(files) && files.map((file, index) => (
            <FileItem index={index} key={index} file={file} deleteFile={this.deleteFile}/>
          ))}
          {isSingleFile(files) && <FileItem file={files.first()} index={0} deleteFile={this.deleteFile}/>}
        </ul>}
      </div>

    )
  }
}

export default compose<DropZoneInputHOCWithHandlersProps, DropZoneProps>(
  performanceWrapper,
  inputHOC
)(DropZoneFrecl);
