import React, { Component } from 'react'
import { Input, Icon, Tooltip } from 'antd'
import {style} from '../style/ServiceStyle'



export default class Service extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }
    }

    componentDidMount() {
        this.validarServico(this.state.data)
    }

    validarServico(data) {

        data.map((e, i) => {
            var codigo = e.codigo
            var descricao = e.descricao

            if (codigo == "" || descricao == "") {
                if (codigo == "") {

                    let aux = this.state.data
                    aux[i].valido = false
                    aux[i].message = "Código inválido"
                    this.setState({
                        data: aux
                    })

                }

                if (descricao == "") {

                    let aux = this.state.data
                    aux[i].valido = false
                    aux[i].message = "Descrição inválida"
                    this.setState({
                        data: aux
                    })
                }

                if (codigo == "" && descricao == "") {

                    let aux = this.state.data
                    aux[i].valido = false
                    aux[i].message = "Código e Descrição inválidos."
                    this.setState({
                        data: aux
                    })
                }
            } else {
                let aux = this.state.data
                    aux[i].valido = true
                    aux[i].message = ""
                    this.setState({
                        data: aux
                    })
            }
        })

        this.props.callback(this.state.data)

    }



    componentDidMount() {
        this.validarServico(this.state.data)
    }

    handleChangeCodigo(e, i) {

        let aux = this.state.data
        aux[i].codigo = e.target.value

        this.setState({
            data: aux
        })
        this.validarServico(this.state.data)
        this.props.callback(this.state.data)
    }


    handleChangeDescricao(e, i) {
        let aux = this.state.data
        aux[i].descricao = e.target.value

        this.setState({
            data: aux
        })
        this.validarServico(this.state.data)
        this.props.callback(this.state.data)

    }

    render() {

        const render = []

        this.state.data.map((e, i) => {
            render.push(
                <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 10, }}>
                        <Input style={e.valido ? style.inputCodigo : style.inputCodigoError} value={e.codigo} onChange={(e) => this.handleChangeCodigo(e, i)} />
                        <Input style={e.valido ? style.inputDescricao : style.inputDescricaoError} value={e.descricao} onChange={(e)=>this.handleChangeDescricao(e, i)}/>
                    </div>

                    {e.valido ?
                        <div style={style.invisibleBlock} ></div> :
                        <div style={style.tooltip} >
                            <Tooltip title={e.message} >
                                <Icon theme="filled" type="info-circle" />
                            </Tooltip>
                        </div>
                    }
                </div>)
        })
        return (
            <div>
                {render}
            </div>
        )
    }
}

/*






  //

*/