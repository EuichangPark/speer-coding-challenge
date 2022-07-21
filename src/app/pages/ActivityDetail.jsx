import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CallReceived,
  CallMissed,
  Voicemail,
  ArrowBack,
} from "@mui/icons-material";

import Layouts from "../components/Layouts.jsx";
import { api } from "../config/axios.js";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    api.get(`/activities/${id}`).then((res) => {
      setActivity(res.data);
    });
  }, [id]);

  const typoSx = {
    fontSize: 14,
    display: "flex",
    justifyContent: "start",

    "&:not(:last-child)": {
      mb: 1.5,
    },

    "& span": {
      fontSize: 18,
      fontWeight: 600,
    },

    "& label": {
      width: 80,
      display: "inline-block",
    },
  };

  const callTypeSvg = useMemo(() => {
    if (activity.call_type === "missed") {
      return <CallMissed sx={{ color: "error.main" }} />;
    }
    if (activity.call_type === "answered") {
      return <CallReceived sx={{ color: "success.main" }} />;
    }
    return <Voicemail sx={{ color: "background.yellow" }} />;
  }, [activity]);

  const chipColor = useMemo(() => {
    if (activity.call_type === "missed") {
      return "error";
    }
    if (activity.call_type === "answered") {
      return "success";
    }
    return "warning";
  }, [activity]);

  console.log(chipColor);

  return (
    <Layouts>
      <Box sx={{ p: 1, mt: 3 }}>
        <Card sx={{ position: "relative" }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: ".5rem",
              left: ".5rem",
              backgroundColor: "common.white",
              borderRadius: "100%",
              "&:hover svg": {
                color: "common.white",
              },
            }}
          >
            <ArrowBack sx={{ color: "common.black" }} />
          </IconButton>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          />
          <Box sx={{ p: 2 }}>
            <Chip
              icon={callTypeSvg}
              size="small"
              label={activity.call_type}
              color={chipColor}
              sx={{ px: 2, mb: 3 }}
            />
            <Box sx={{ px: 0.5 }}>
              <Typography sx={typoSx} color="text.secondary">
                <label htmlFor="">From: </label>
                <span>{activity.from}</span>
              </Typography>
              <Typography sx={typoSx} color="text.secondary">
                <label htmlFor="">To:</label> <span>{activity.to}</span>
              </Typography>
              <Typography sx={typoSx} color="text.secondary">
                <label htmlFor="">Date: </label>
                <span>
                  {new Date(activity.created_at).toLocaleString("en-US")}
                </span>
              </Typography>
              <Typography sx={typoSx} color="text.secondary">
                <label htmlFor="">Duration:</label>{" "}
                <span>{activity.duration}s</span>
              </Typography>
              <Typography sx={typoSx} color="text.secondary">
                <label htmlFor="">On:</label> <span>{activity.via}s</span>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Layouts>
  );
};

export default ActivityDetail;
