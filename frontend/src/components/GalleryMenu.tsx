import * as React from "react";
import { AlbumMenu, AlbumMenuTab, CustomTabs } from "../styles/GalleryStyles";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AlbumMenu>
      <CustomTabs
        value={value}
        onChange={handleChange}
        centered
      >
        <AlbumMenuTab label="תמונות עבר" />
        <AlbumMenuTab label="אלבום חתונה" />
      </CustomTabs>
    </AlbumMenu>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { AlbumMenu, AlbumMenuTab, CustomTabs } from "../styles/GalleryStyles";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(1);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <CustomTabPanel value={value} index={0}>
//         Item One
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//       <AlbumMenu sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <CustomTabs value={value} centered onChange={handleChange} aria-label="basic tabs example">
//           <AlbumMenuTab label="אלבום חתונה" {...a11yProps(0)} />
//           <AlbumMenuTab label="תמונות עבר" {...a11yProps(1)} />
//         </CustomTabs>
//       </AlbumMenu>
//     </Box>
//   );
// } 