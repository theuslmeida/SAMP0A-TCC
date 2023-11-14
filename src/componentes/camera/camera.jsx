import axios from "axios";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function Camera() {
  const webcamRef = React.useRef(null);
  const [countdown, setCountdown] = useState(30);
  const [preDetect, setpreDetect] = useState("");
  const [cont2, setCont2] = useState(4)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
        Pre_detect();
      } 
      else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  async function Pre_detect(){
    if(countdown === 1){
      navigate("/negado")
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        console.log("Enviando uma imagem!")
        const blob = await fetch(imageSrc).then(r => r.blob());
        const Pre_formdata = new FormData();
        Pre_formdata.append('imagem', blob, 'imagem.png');
        Pre_formdata.append('email', localStorage.getItem("email_aluno"));
        const response = await axios.post("http://sampa.pythonanywhere.com/enviar_img/", Pre_formdata)
        setpreDetect(response.data.pre_deteccao_resultado)

        if (response.data.pre_deteccao_resultado === "Te encontramos, tente ficar parado!"){
          setCont2(cont2 - 1)
          console.log(cont2)
          if (cont2 == 0){
            navigate("/aprovado")
          }
        }
      }
      catch (error) {
        alert(error)
      }
    }
  }

  return (
    <>
      <h1 className="text-[30px] ml-[35%] xl:ml-[40%] xl:text-[40px]">Bem-Vindo ao
        <span className="text-red-600">Teste</span></h1>
      <h1 className="xl:text-[25px] text-[20px] mt-[10px] ml-[45%] text-red-600 w-[120px] items-center xl:text- xl:w-[220px]">INSTRUÇÕES</h1>
      <p className="text-[20px]   ml-[35%] xl:ml-[40%]  ">1- Se posicione em frente a câmera</p>
      <p className="text-[20px]   ml-[35%] xl:ml-[40%]  ">2- Fique parado até  a contagem acabar</p>
      <p className="text-[20px]   ml-[35%] xl:ml-[40%]  ">3- Espere a verificação</p>
      {/*<button className="w-52 h-12 rounded-xl shadow-black bg-red-600 mt-14"><h1 className="text-white text-2xl">Testar</h1></button>*/}
      {countdown > 0 ? <p className="h-10 w-96 text-2xl ml-[50%]  ">{countdown}</p> : null}
      <div className=" xl: ml-[25%] ">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="sm:w-[90%] sm:h-[20%] sm:mt-[25%] xl:mt-[5%] xl:w-[50%] xl:ml-[7%] sm:ml-[-10%]  border-slate-950 bg-[#aaa]"
        >
        </Webcam>
        <h1 className="text-[30px] ml-[35%] xl:ml-[40%] xl:text-[30px]">{preDetect}</h1>
      </div>
    </>
  );
}
