import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { ClassesWrapper } from "../../ClassComponent/ClassesWrapper";
const Pie = ()=> {
  return (
    <Box m="20px">
      <Header title="Attendace && Absence " subtitle="Simple Pie Chart" />
      <Box height="75vh">
      <ClassesWrapper/>
      </Box>
    </Box>
  );
};

export default Pie;
