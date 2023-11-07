import React, { useState } from 'react'
import Ola from '../../componentes/Olá/ola'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

export default function FotosNegadas() {
const [imagens, setImagens] = useState([])

useEffect(()=>{
  const Pegar_dados = () => {
    axios.get("https://sampa.pythonanywhere.com/Imagens_negativas/?format=json").then(response =>{
      const ResponseImg = response.data
      console.log(ResponseImg);
      setImagens(ResponseImg)
    })
  }
  Pegar_dados()
}, [])

  return (
    <>
    <Ola></Ola>
      <div
        className=" h-full flex justify-center space-x-[30%] bg-no-repeat bg-center bg-cover "
      >
        
      <div className="w-full flex items-center justify-center">
        <div className=" justify-center items-center bg-[url('../public/fundo-transparente-png7.png')] w-[80%] h-full mt-[10%] rounded-[10px]">
        {imagens.map(item =>(
          <div className=' ml-[40%] mt-[10%] justify-center items-center'>
            <img className='w-[30%]' src={item.imagem}/>
            <h2>{item.nome}</h2>
            <h2>{item.email}</h2>
            </div>
        )) }
        {/* <img className='w-[20%]' src={Imagem} /> */}
        {/* <p>{Nome}</p>
        <p>{Email}</p>
        <Button onClick={Pegar_dados}>Alunos sem EPI</Button> */}
        </div>
        
      </div>
      </div>
      <div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div class="group relative">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"></span>
                Basic Tee
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p class="text-sm font-medium text-gray-900">$35</p>
        </div>
      </div>

    </div>
  </div>
</div>
    </>
  )
}
