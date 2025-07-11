import { Box } from "@mui/material";
import Header from "../../components/Header";
import { ClassesWrapper } from "../../ClassComponent/ClassesWrapper";

  const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Degrees and Performance review"  />
      <Box height="75vh">
              <ClassesWrapper/>

      </Box>
        </Box> 
  );
}

export default Bar;
