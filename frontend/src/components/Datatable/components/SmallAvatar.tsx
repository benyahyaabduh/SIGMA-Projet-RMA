import { alpha, styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  marginLeft: 5,
  backgroundColor: "white",
  border: `2px solid ${alpha("#6e78a5", 0.15)}`,
}));

export default SmallAvatar;
