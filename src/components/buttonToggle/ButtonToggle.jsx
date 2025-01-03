import React, { useState } from "react";
import Switch from "@mui/material/Switch";

function ButtonToggle({label,value,onChange}) {
  const [isChecked, setIsChecked] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.checked
    setIsChecked(newValue);
    onChange(newValue)
  };

  return (
    <div>
        <p>{label}</p>
        <Switch checked={isChecked} onChange={handleChange} />
    </div>
  );
}

export default ButtonToggle;