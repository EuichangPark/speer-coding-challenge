import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import filter from "lodash/filter";

import { api } from "../config/axios.js";
import Layouts from "../components/Layouts.jsx";
import ActivityList from "../components/ActivityList.jsx";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
};

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    api.get("/activities").then((res) => {
      setActivities(res.data);
    });
  }, []);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleArchived = (id, archived) => {
    api
      .post(`/activities/${id}`, { is_archived: !archived })
      .then((res) => {
        if (res.data || res.data.is_archived === !archived) {
          setActivities((current) =>
            current.map((activity) => {
              if (activity.id === id) {
                // return {
                //   ...activity,
                //   is_archived: !archived,
                // };
                return Object.assign({}, activity, { is_archived: !archived });
              }
              return activity;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layouts>
      <Box sx={{ p: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Unarchived" {...a11yProps(0)} />
            <Tab label="Archived" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ActivityList
            activities={filter(activities, ["is_archived", false])}
            handleArchived={handleArchived}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ActivityList
            activities={filter(activities, ["is_archived", true])}
            handleArchived={handleArchived}
          />
        </TabPanel>
      </Box>
    </Layouts>
  );
};

export default ActivityFeed;
