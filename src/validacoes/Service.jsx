import React, { Component } from 'react'
import { Input, Icon, Tooltip, Spin } from 'antd'
import { style } from '../style/ServiceStyle'
import { ValidaServico } from '../request/index'
const antIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;



export default class Service extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,

        }
    }

    validarTodosServicos(data) {

        var that = this;

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
                aux[i].valido = false
                    aux[i].loading = true
                    this.setState({
                        data: aux
                    })
                ValidaServico(that, aux[i], i)
            }
        })

        this.props.callback(that.state.data)

    }

    validarServico(i) {

        var e = this.state.data[i]
        var that = this
        var codigo = e.codigo
        var descricao = e.descricao

        if (codigo == "" || descricao == "") {
            if (codigo == "") {

                let aux = this.state.data
                aux[i].valido = false
                aux[i].message = "Código inválido"
                this.setState({
                    data: aux,
                    
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

        }
        else {
            let aux = this.state.data
            aux[i].loading = true
            this.setState({
                data:aux
            })
            ValidaServico(that, aux[i], i)
        }
    }


    componentDidMount() {
        this.validarTodosServicos(this.state.data)
        this.props.callback(this.state.data)
    }

    handleChangeCodigo(e, i) {

        let aux = this.state.data
        aux[i].codigo = e.target.value

        this.setState({
            data: aux
        })

    }

    onBlurService(e, i) {

        this.validarServico(i)
        this.props.callback(this.state.data)

    }


    handleChangeDescricao(e, i) {
        let aux = this.state.data
        aux[i].descricao = e.target.value

        this.setState({
            data: aux
        })
    }

    render() {

        const render = []

        this.state.data.map((e, i) => {
            render.push(
                <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 10, }}>
                        <Input onBlur={(ee) => this.onBlurService(ee, i)} style={e.valido ? style.inputCodigo : style.inputCodigoError} value={e.codigo} onChange={(e) => this.handleChangeCodigo(e, i)} />
                        <Input onBlur={(ee) => this.onBlurService(ee, i)} style={e.valido ? style.inputDescricao : style.inputDescricaoError} value={e.descricao} onChange={(e) => this.handleChangeDescricao(e, i)} />
                    </div>

                    {e.loading ?
                    <div style={style.tooltip} >
                            <Spin indicator={antIcon}  />
                        </div>  :
                        e.valido ?
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

