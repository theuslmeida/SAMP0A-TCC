import axios from "axios";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function Camera() {
  const webcamRef = React.useRef(null);
  const [countdown, setCountdown] = useState(10);
  const [preDetect, setpreDetect] = useState("");
  const [cont, setCont] = useState(4)
  const navigate = useNavigate();

  useEffect(() => {
    Pre_detect();
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1)
      } 
      else {
        clearInterval(timer);
        Captura();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  async function Pre_detect(){
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const blob = await fetch(imageSrc).then(r => r.blob());
        const Pre_formdata = new FormData();
        Pre_formdata.append('imagem', blob, 'imagem.png');
        Pre_formdata.append('email', localStorage.getItem("email_aluno"));
        const response = await axios.post("https://sampa.pythonanywhere.com/pre_detectimg/", Pre_formdata)
        setpreDetect(response.data.pre_deteccao_resultado)
        if(countdown === 1 && response.data.pre_deteccao_resultado === "Não estamos conseguindo te detectar"){
          setCountdown(5)
          setCont(cont - 1)
        }
        else if(cont === 0){
          Captura();
        }
      }
      catch (error) {
        alert(error)
      }
      finally{
        setTimeout(Pre_detect, 15000);
      }
    }
  }

  async function Captura() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        try {
          const blob = await fetch(imageSrc).then(r => r.blob());
          const formData = new FormData();
          formData.append('imagem', blob, 'imagem.png');
          formData.append('email', localStorage.getItem("email_aluno"))

          try{
            const response = await axios.post("https://sampa.pythonanywhere.com/api_salvarimg/", formData)
            const resultado = response.data.deteccao_resultado

            if (resultado){
              navigate("/aprovado")
            }
            else {
              const formNeg = new FormData();
              formNeg.append('nome', localStorage.getItem("nome"))
              formNeg.append('email', localStorage.getItem("email_aluno"));
              formNeg.append('cpf', localStorage.getItem("cpf_aluno"))
              formNeg.append('imagem', blob, 'imagem.png');
              console.log(formNeg)
              await axios.post("https://sampa.pythonanywhere.com/Imagens_negativas/?format=json", formNeg)
              navigate("/Negado")
            }
          }
          catch (error){
              alert("Sem respostas do servidor!! " +error)
              window.location.reload()
          }
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);
        }
      } else {
        alert("A camera não foi encontrada!")
        window.location.reload()
      }
    } else {
      console.log("Webcam não detectada");
    }
  }

  return (
    <>
      <h1 className="text-[30px] ml-[35%] xl:ml-[40%] xl:text-[40px]">{preDetect}</h1>
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
      </div>
    </>
  );
}