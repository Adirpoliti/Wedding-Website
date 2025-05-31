import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", position: "fixed", zIndex: "999",}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="תמונות עבר" />
        <Tab label="אלבום חתונה" />
      </Tabs>
    </Box>
  );
}
