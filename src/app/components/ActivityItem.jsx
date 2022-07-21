import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CallReceived,
  CallMissed,
  Voicemail,
  MoreVert,
} from "@mui/icons-material";

const ActivityItem = ({ data, handleArchived }) => {
  const {
    call_type,
    created_at,
    from,
    is_archived,
    via,
    id: activityId,
  } = data;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const callTypeSvg = useMemo(() => {
    if (call_type === "missed") {
      return <CallMissed sx={{ color: "error.main" }} />;
    }
    if (call_type === "answered") {
      return <CallReceived sx={{ color: "success.main" }} />;
    }
    return <Voicemail sx={{ color: "background.yellow" }} />;
  }, [call_type]);

  const handleMore = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: ".5rem",
        borderColor: "common.border",
        borderWidth: 1,
        borderStyle: "solid",
        mb: 3,
        p: 1,
        color: theme.palette.interactive.darkblue,
      }}
    >
      <Box sx={{ px: 1 }}>{callTypeSvg}</Box>
      <Box sx={{ flexGrow: 1, color: theme.palette.text.primary, px: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{from}</Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.text.subdued,
            "& span": { fontWeight: 600, fontSize: 14 },
          }}
        >
          tried to call on <span>{via}</span>
        </Typography>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>
        <IconButton sx={{ p: 1 }} onClick={handleMore}>
          <MoreVert sx={{ width: 14, height: 14 }} />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Button
            onClick={() => handleArchived(activityId, is_archived)}
            sx={{ textTransform: "unset", fontSize: 12, py: 0.5 }}
          >
            {is_archived ? "Unarchived" : "Archived"}
          </Button>
        </Popover>
      </Box>
      <Box
        sx={{
          color: theme.palette.text.subdued,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {new Date(created_at).toLocaleTimeString("en-US")}
      </Box>
    </Box>
  );
};

export default ActivityItem;
