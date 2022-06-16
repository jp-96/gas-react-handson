import React, { useState } from "react";
import ColorList from "./ColorList";
import AddColorForm from "./AddColorForm";

export default function App() {
  return (
    <>
      <AddColorForm />
      <ColorList />
    </>
  );
}
