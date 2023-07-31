import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TreeViewCustom from "../../custom/TreeViewCustom";
import { useNavigate } from "react-router";

const FormPage = () => {
  const [treeData, setTreeData] = useState([]);
  const [treeSelectData, setTreeSelectData] = useState([]);
  const [name, setName] = useState("");
  const [agreeToTnC, setAgreeToTnC] = useState(false);
  const navigate = useNavigate();

  const validated = () => {
    if (name !== "" && treeSelectData.length !== 0 && agreeToTnC) return true;
    alert("Incomplete form input");
    return false;
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://39.32.193.213:5000/treeData");
      const data = await response.json();
      setTreeData(data);
    } catch (error) {
      console.error("Error fetching treeData:", error);
    }
  };
  const handlePostData = async () => {
    try {
      const response = await fetch("http://39.32.193.213:5000/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, treeSelectData, agreeToTnC }),
      });

      if (response.ok) {
        alert("Data successfully posted to the server.");
      } else {
        console.error("Failed to post data to the server.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p={4} maxWidth={600} margin="0 auto">
      <Typography variant="h5" gutterBottom>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </Typography>
      <TextField
        error={false}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        label="Name"
        helperText=""
        fullWidth
      />

      <Box mt={2} mb={4}>
        <TreeViewCustom
          data={treeData}
          selected={treeSelectData}
          setSelected={setTreeSelectData}
        />
        <Button
          onClick={() => {
            navigate("/add");
          }}
        >
          Add item
        </Button>
      </Box>

      <FormControlLabel
        control={<Checkbox />}
        value={agreeToTnC}
        label="Agree to terms"
        onChange={(event: any) => {
          setAgreeToTnC(event.target.checked);
        }}
      />
      <Box mt={2}>
        <Button
          onClick={() => {
            if (validated()) handlePostData();
          }}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default FormPage;
