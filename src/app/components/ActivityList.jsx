import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import groupBy from "lodash/groupBy";

import ActivityItem from "./ActivityItem.jsx";

const ActivityList = ({ activities, handleArchived }) => {
  const navigate = useNavigate();
  const groupedActivities = useMemo(
    () =>
      groupBy(activities, (activity) =>
        new Date(activity.created_at).toLocaleDateString("en-US")
      ),
    [activities]
  );

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Box>
      {Object.keys(groupedActivities).map((date) => (
        <Box key={date}>
          <Box sx={{ position: "relative" }}>
            <Divider
              sx={{
                "&::before": { borderTopStyle: "dashed" },
                "&::after": { borderTopStyle: "dashed" },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "text.subdued",
                  textAlign: "center",
                  my: 2,
                }}
              >
                {date}
              </Typography>
            </Divider>
          </Box>
          {groupedActivities[date].map((activity) => (
            <Box
              key={activity.id}
              sx={{ px: 2, cursor: "pointer" }}
              onClick={() => handleNavigate(activity.id)}
            >
              <ActivityItem data={activity} handleArchived={handleArchived} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ActivityList;
