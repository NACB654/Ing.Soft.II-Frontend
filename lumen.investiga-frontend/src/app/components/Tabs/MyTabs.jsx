import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function MyTabs({ selectedTab, onChange, label }) {
  return (
    <Tabs
      aria-label="Basic tabs"
      value={selectedTab} // Establece el valor de la pestaña seleccionada
      onChange={onChange}
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
            fontSize: "15px"
          },
        }}
      >
        <Tab>Información de la cuenta</Tab>
        <Tab>{label}</Tab>
        
      </TabList>
    </Tabs>
  );
}
