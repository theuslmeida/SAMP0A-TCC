import NavSobreN from "../../componentes/navbar/NavSobre";

export default function Sobre() {
    return (
        <>
            <NavSobreN></NavSobreN>

            <section className="bg-[url('../public/fundo-transparente-png7.png')] bg-cover bg-center py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl">O que é o SMPA</h1>
                    <div className="w-16 h-2 bg-black mx-auto my-4"></div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <img src="/Wpp1.jpeg" alt="" className="w-full lg:w-2/5 mb-4 lg:mb-0" />
                        <p className="text-lg lg:w-3/5 lg:ml-10 text-left">
                        É um sistema a qual tem como objetivo, fazer a verificação para saber  se os funcionários estão hábitos ou não para trabalhar, sendo assim nosso sistema faz a verificação através de uma webcam analisando se os funcionários antes de entrar na área de trabalho estão com os EPI'S necessários, caso não esteja ele não estará hábito a trabalhar evitando assim um possível acidente.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[url('../public/fundo-transparente-png7.png')] bg-cover bg-center py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl">Quais benefícios o SMPA tem?</h1>
                    <div className="w-16 h-2 bg-black mx-auto my-4"></div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <p className="text-lg lg:w-3/5 lg:mr-10">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </p>
                        <img src="/Wpp2.jpeg" alt="" className="w-full lg:w-2/5" />
                    </div>
                </div>
            </section>

            <section className="bg-[url('../public/fundo-transparente-png7.png')] bg-cover bg-center py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl">Como foi a ideia?</h1>
                    <div className="w-16 h-2 bg-black mx-auto my-4"></div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <img src="/Wpp1.jpeg" alt="" className="w-full lg:w-2/5 mb-4 lg:mb-0" />
                        <p className="text-lg lg:w-3/5 lg:ml-10">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>
            </section>

        </>
    );
}
