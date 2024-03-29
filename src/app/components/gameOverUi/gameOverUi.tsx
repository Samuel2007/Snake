import { Button, Modal, Box } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type GameOverUiProps = {
  isGameOver: boolean;
  handlePlayAgin: VoidFunction;
};

export default function GameOverUi({
  isGameOver,
  handlePlayAgin,
}: GameOverUiProps) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={isGameOver}
        onClose={handlePlayAgin}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Game Over</h2>
          <p id="parent-modal-description">Retry?</p>
        </Box>
      </Modal>
    </div>
  );
}
