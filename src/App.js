import React,{useEffect,useState} from "react";
import "./App.css";
import ColorScheme from "./colorSchemes.jpg";

const App = () => {

  const [values,setValues] = useState({
    x: 0,
    y: 0,
    targetX : 0,
    targetY : 0
  });

  const {x,y,targetX,targetY} = values;

  useEffect(() => {
    drawImage(ColorScheme);
    setValues({...values,x: document.getElementById("canvas").offsetLeft,y: document.getElementById("canvas").offsetTop});
  },[]);

  const drawImage = (url) => {
    let canvas = document.querySelector('#canvas');

    let img = new Image();
    img.addEventListener("load",() => {
      canvas.getContext('2d').drawImage(img,1,1)
    })
    img.setAttribute('src',url)
    img.crossOrigin="Anonymous"
  }

  const convertToHex = (value) => {
    var hex = value.toString(16);
    if(value< 16){
      hex = "0"+ hex;
    }
    return hex;
  }
  const mouseMove = (e) => {
    console.log(e);
    e.preventDefault();
    setValues({...values,targetX: e.pageX - x,targetY: e.pageY - y});
    // setValues({...values,targetX: e.touches[0].clientX - x,targetY: e.touches[0].clientY - y});
    var coord = "x="+targetX+"y="+targetY;
    var context = e.target.getContext('2d');
    var pixelData = context.getImageData(targetX,targetY,1,1).data;
    // console.log(pixelData);
    var hex = "#"+convertToHex(pixelData[0])+convertToHex(pixelData[1])+convertToHex(pixelData[2]);
    console.log(hex);
    // document.getElementById("status").innerText = coord;
    document.getElementById("color-code").innerText = hex;
    document.getElementById("color").style.backgroundColor = hex;

    // console.log(e.pageX);
    // console.log(e.pageY);
  }

  const copyText = () => {
    let code = document.getElementById("color-code");
    code.select();
    document.execCommand('copy');
    alert("COPIED "+code.innerHTML);
  }
  return (
    <div className="app">
      <canvas id="canvas" 
      className="canvas" 
      onClick={() => copyText()}
      // onMouseMove={(e) => mouseMove(e)}
      onPointerMove={(e) => mouseMove(e)}
      >
    
      </canvas>
      <div id="color" style={{ width: "50px",height: "50px"}}>

      </div>
      <textarea  id="color-code"></textarea >
      <div id="status"></div>
    </div>
  );
}

export default App;
