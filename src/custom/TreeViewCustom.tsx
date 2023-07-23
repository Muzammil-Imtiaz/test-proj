import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

const TreeViewCustom = ({ data, selected, setSelected }: any) => {
  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  // Function to recursively render nested TreeItems
  const renderTreeItems = (nodes: any[]) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        label={node.label}
        children={node.children && renderTreeItems(node.children)}
      />
    ));
  };

  return (
    <TreeView
      aria-label="controlled"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selected}
      onNodeSelect={handleSelect}
      multiSelect
    >
      {renderTreeItems(data)}
    </TreeView>
  );
};

export default TreeViewCustom;
