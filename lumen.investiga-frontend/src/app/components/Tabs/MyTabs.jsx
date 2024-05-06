import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function MyTabs() {
  return (
    <Tabs
      aria-label="Basic tabs"
      defaultValue={0}
      sx={{
        width: "650px",
        height: "43px",
        background: "#E1E1E1",
        borderRadius: "10px",
      }}
    >
      <TabList
        tabFlex={1}
        sx={{
          "& button.Mui-selected": {
            color: "#F37021",
            backgroundColor: "transparent",
          },
          "& button.MuiTab-root": {
            "&:hover": {
              backgroundColor: "#D3D3D3",
            },
          },
        }}
      >
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
    </Tabs>
  );
}
