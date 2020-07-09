import React, { useState } from "react";
import { ChromePicker } from 'react-color'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import FormatColorTextOutlinedIcon from '@material-ui/icons/FormatColorTextOutlined';

function ColorPicker(props)
{
    const [displayColorPicker,setDisplayColorPicker] = useState(false);
    const [paletteColor,setPaletteColor] = useState({
      h: 250,
      s: 0,
      l: 0.2,
      a: 1
    });
    const [btnName,setBtnName] =useState("");
    
    const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }

    function handleClick(event)
    {
        setBtnName(event.currentTarget.getAttribute('name'));
        setDisplayColorPicker(prevStatus => !prevStatus);
    }
    function handleClose()
    {
      setDisplayColorPicker(false);
      props.DBUpdate();
    }
    function handleChange(color)
    {
      setPaletteColor(color.hsl);
      console.log(color);
      props.onColorChange(btnName,color.hex);
    }

    return(
        <div>
        <button name="bgColor" onClick={handleClick} title="Set note background"><ColorLensOutlinedIcon/ ></button>
        { displayColorPicker ? 
        <div  style={popover}>
          <div style={cover} onClick={handleClose}/>
          <ChromePicker color={paletteColor} onChange={handleChange} disableAlpha={true}/>
        </div>
         : null }

         <button name="fontColor" onClick={handleClick} title="Set note font color"><FormatColorTextOutlinedIcon/ ></button>
        { displayColorPicker ? 
        <div  style={popover}>
          <div style={cover} onClick={handleClose}/>
          <ChromePicker color={paletteColor} onChange={handleChange} disableAlpha={true}/>
        </div>
         : null }
      </div>
    );
}

export default ColorPicker;




