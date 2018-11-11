import React,{Component} from 'react'
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Tour from 'reactour'
import enableImg from '../../../vendor/assets/img/tutorial/enableApi.png'
import apiName from '../../../vendor/assets/img/tutorial/apiName.png'
import fa2 from '../../../vendor/assets/img/tutorial/2FA.PNG'
import binanceEmail from '../../../vendor/assets/img/tutorial/binanceEmail.png'
import apikeyImg from '../../../vendor/assets/img/tutorial/apiKey.png'
import apiSecretImg from '../../../vendor/assets/img/tutorial/apiSecret.png'
import { loadState, saveState, showTutorial, removeState, isFirstTime } from "../../helpers/localStorage";

export default class Tutorial extends Component{
    constructor(props){
        super(props)
        this.state={
            imageViewer:false,
            isTourOpen: false
        }
        this.addApiSteps = this.addApiSteps.bind(this)        
    }
    getSteps=stepsName=>{
        if(stepsName === 'addApi')
            return this.addApiSteps()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isTourOpen !== this.props.isTourOpen)
            this.setState({isTourOpen: nextProps.isTourOpen})
    }
    toggleTutorial=show=>{
        saveState('showTutorial', show)
    }
    openTutorial = () => showTutorial()

    addApiSteps=()=>(
        [
            {
                selector: '',
                content: () => <div>
                    <span>Bem vindo a bordo! Vamos começar configurando as chaves de sua API.</span><br /><br /><br />
                    <label><input type="checkbox" value={false} onClick={()=>this.toggleTutorial(false)}/> Não mostrar novamente</label>
                </div>,
            },
            {
                selector: '[data-tut="reactour_addAlias"]',
                content: `Dê um nome de sua preferência para a sua conexão e clique na seta a direita
                 para avançar.`
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span>Agora preciso saber se você já possui uma API Key cadastrada na corretora.</span>
                        <br />

                        <button className="btn btn-default"
                            onClick={() => goTo(3)}
                        >
                            O que é isto?
                        </button>
                        <button className="btn btn-primary"

                            onClick={() => goTo(4)}
                        >
                            Sei o que é, mas não possuo.
                        </button>
                    </div>
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> As chaves de sua API são a conexão entra a Cryptonita
                            e a sua corretora. É por meio dessas chaves que os melhores traders
                            poderão efetuar operações em sua conta, enquanto você se preocupa
                            com o que é mais importante para você.
    
                    </span>
                        <button className="btn btn-primary"

                            onClick={() => goTo(4)}
                        >
                            Quero configurar!
                        </button>

                    </div>
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Após autenticar-se na Binance,
                                 você verá uma sessão idêntica a imagem
                                 abaixo. Clique em "Enable".
    
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: enableImg })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Agora dê um nome para sua conexão, pode ser o mesmo nome
                            que você deu no passo 1
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: apiName })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Se estiver com o 2FA habilitado, confirme seu código e verifique seu email.
                            Lá encontrará um link para ativar sua API. Se não estiver com o 2FA hibilitado,
                            prossiga direto para o seu email.
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: fa2 })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Já em seu email, procure por uma mensagem da Binance.
                            Ao entrar clique no botão "Confirm Create".
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: binanceEmail })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '[data-tut="reactour_addApiKey"]',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span>Você provavelmente foi redirecionado para uma página monstrando as configurações
                            de sua API.
                            Selecione e copie o código de sua API como mostra a figura e cole-o na plataforma
                            da Cryptonita, no campo indicado.
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: apikeyImg })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '[data-tut="reactour_addApiSecret"]',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Faça o mesmo que fez no passo anterior, mas agora copie e cole
                            o campo API Secret, como mostra a imagem.
                    </span>
                        <br />
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ imageViewer: true, tutoImg: apiSecretImg })}
                        >
                            Clique para ver a imagem.
                        </button>

                    </div>
            },
            {
                selector: '[data-tut="reactour_submit"]',
                content: ({ goTo }) =>
                    <div className="tutorial-div">
                        <span> Clique no botão indicado e pronto. Você configurou sua chave de API!
                            Agora é hora de escolher um trader para seguir. No menu a esquerda escolha a opção
                            <strong> Trader List </strong> <br/>
                            Bons lucros para você, nos encontramos na Lua!
                    </span>
                        <br />
                    </div>
            },


        ]
    )

    render(){
        return(
            <div>
                <Viewer
                    visible={this.state.imageViewer}
                    zIndex='100000000'
                    onClose={() => { this.setState({ imageViewer: false }); }}
                    onMaskClick={() => { this.setState({ imageViewer: false }); }}
                    images={[{ src: this.state.tutoImg, alt: 'Onde começar a configurar a API' }]}
                    noNavbar={true}
                    changeable={false}
                    noImgDetails={true}
                    attribute={false}
                    rotatable={false}
                    scalable={false}
                />
                <Tour
                    startAt={this.props.startAt}
                    steps={this.getSteps(this.props.steps)}
                    isOpen={this.state.isTourOpen &&
                         this.openTutorial()}
                    onRequestClose={() => this.setState({ isTourOpen: false })}
                    disableKeyboardNavigation={true}
                    onBeforeClose={this.props.onHide}
                />
            </div>
        )
    }
}


