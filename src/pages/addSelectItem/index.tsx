import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

interface Item {
  id: string;
  label: string;
}

const AddItemForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [childrenArray, setChildrenArray] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "children") {
      setChildren(value);
    }
  };

  const handleAddChildren = async () => {
    // Add the children to the childrenArray
    if (children.trim() !== "") {
      setChildrenArray((prevChildren) => [...prevChildren, children.trim()]);
      setChildren(""); // Reset the children input field
    }
  };
  const postData = async () => {
    // Add the children to the childrenArray
    if (children.trim() !== "") {
      setChildrenArray((prevChildren) => [...prevChildren, children.trim()]);
      setChildren(""); // Reset the children input field
    }

    // Prepare the data object to be sent in the POST request
    const newItemData = {
      label: name,
      children: childrenArray.map((child, index) => ({
        id: index,
        label: child,
      })),
    };
    try {
      const response = await fetch("http://localhost:5000/treeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItemData),
      });

      if (response.ok) {
        console.log("Data successfully posted to the server.");
        // You can handle success actions here if needed
      } else {
        console.error("Failed to post data to the server.");
        // You can handle error actions here if needed
      }
    } catch (error) {
      console.error("Error posting data:", error);
      // You can handle error actions here if needed
    }
  };
  return (
    <Box p={4} maxWidth={600} margin="0 auto">
      <TextField
        type="text"
        name="name"
        label="Item Name"
        value={name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="text"
        name="children"
        label="Children"
        value={children}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button color="primary" onClick={handleAddChildren}>
        Add Children
      </Button>
      {/* Display the entered children as multiline view */}
      <TextField
        multiline
        label="Entered Children"
        value={childrenArray.join("\n")}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <Button
        variant="contained"
        onClick={() => {
          postData();
        }}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default AddItemForm;
