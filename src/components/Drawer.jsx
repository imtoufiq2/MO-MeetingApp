import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Fab from "@mui/material/Fab"; // Import Fab component
import AddCommentIcon from "@mui/icons-material/AddComment"; // Import icon for Fab
import List from "@mui/material/List";
import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import { useCallback, useState } from "react";
import { commentsData } from "../data/pdfCommetns";
import { useGlobalHook } from "../Contexts";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });

  const { darkMode } = useGlobalHook();
  console.log({ darkMode });
  // State to manage the input value
  const [comment, setComment] = useState("");

  // Handle input change
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  // Handle form submit
  const handleSubmitComment = useCallback(
    (event) => {
      event.preventDefault();
      if (comment) {
        console.log("Comment Submitted: ", comment);
        // Call API here with the comment
        setComment(""); // Clear input after submission
      }
    },
    [comment]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      id="_main_list_box"
      sx={{
        paddingInline: "20px",
        position: "relative",
      }}
      role="presentation"
      className={`${darkMode && "dark_mode_background_color"}`}
    >
      {/* Close Button */}
      <IconButton
        onClick={toggleDrawer(anchor, false)}
        sx={{
          position: "relative",
          right: "0px",
          outline: "none",
          border: "none",
        }}
      >
        <CloseIcon
          sx={{ position: "fixed", right: "10px", color: darkMode && "#fff" }}
        />
      </IconButton>
      <List
        id="_list"
        className="example"
        sx={{
          height: {
            xs: "60vh", // 60% of the viewport height for extra small screens
            lg: "75vh", // 75% of the viewport height for large screens
          },
          overflow: "scroll",
        }}
      >
        {commentsData?.map((cur, index) => {
          const isLastItem = index === commentsData.length - 1;
          const isToufiq = cur?.userName?.toLowerCase() === "toufiq chdoudhari";

          return (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                marginBottom: !isLastItem ? "1rem" : 0,
                justifyContent: isToufiq ? "flex-end" : "flex-start",
                textAlign: isToufiq ? "right" : "left",
              }}
            >
              <Stack
                direction={isToufiq ? "row-reverse" : "row"}
                spacing={1.5}
                alignItems="center"
                sx={{
                  maxWidth: "80%",
                  bgcolor: isToufiq ? "#fbb02f" : `#fff`,
                  padding: "0.5rem",
                  borderRadius: "10px",
                  border: !isToufiq && "1px solid #fbb02f80",
                  justifyContent: isToufiq ? "flex-end" : "flex-start",
                }}
              >
                <Avatar sx={{ bgcolor: "#fb8c00" }}>
                  {cur?.userName?.split(" ")[0]?.charAt(0).toUpperCase()}
                  {cur?.userName
                    ?.split(" ")
                    .slice(-1)[0]
                    ?.charAt(0)
                    .toUpperCase()}
                </Avatar>

                <p style={{ textAlign: "start" }}>{cur?.comments}</p>
              </Stack>
            </Stack>
          );
        })}
      </List>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          alignItems: "center",
          marginBottom: "6px",
          marginTop: "4px",
        }}
        id="_box_submit"
        onSubmit={handleSubmitComment}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ backgroundColor: darkMode && "white" }}
          id="_input_filed"
          value={comment} // Bind input value to state
          onChange={handleInputChange} // Update state on input change
          placeholder="Enter your message" // Optional placeholder instead of label
        />

        <Button
          type="submit"
          variant={comment ? "contained" : "outlined"}
          disabled={!comment} // Disable button if input is empty
          sx={{
            maxWidth: "fit-content",
            maxHeight: "fit-content",
            color: "orange",
            // border: comment && "1px solid orange",
            bgcolor: "white",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* Floating Action Button */}
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        id="_add_comment_wrapper"
        onClick={toggleDrawer("bottom", true)} // Open drawer on click
        sx={{
          position: "fixed",
          right: "10px",
          bottom: "66px",
          // border: "2px solid orange",
        }}
        style={{ outline: "none", border: "none" }}
      >
        <AddCommentIcon sx={{ color: "orange" }} />
      </Fab>

      {/* Swipeable Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
      >
        {list("bottom")}
      </SwipeableDrawer>
    </div>
  );
}
