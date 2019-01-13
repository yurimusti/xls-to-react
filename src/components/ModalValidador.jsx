import React, { Component } from 'react'
import { Modal, Icon } from 'antd'
import {style} from '../style/ModalValidadorStyle'
import Date from '../validacoes/Date'
import Service from '../validacoes/Service'
import Area from '../validacoes/Area'
import Number from '../validacoes/Number'
import Equipe from '../validacoes/Equipe'

export default class ModalValidador extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            show: this.props.show,
            validacao: {
                Data: 0,
                Servico: 0,
                Area: 0,
                Quantidade: 0,
                Equipe: 0
            },
            countDate: 0,
            countService: 0,
            countArea: 0,
            countNumero: 0,
            countEquipe: 0
        }
    }

    componentWillReceiveProps(next){
        var newShow = next.show;
        var newData = next.data
        this.setState({
            show: newShow,
            data: newData
        })
    }

    handleCallbackDate(e) {
        this.state.countDate = 0

        e.map((ee) => {
            if (ee.valido != true) {
                var aux = this.state.countDate
                this.state.countDate = aux + 1
            }

        })

        var auxData = this.state.validacao
        auxData.Data = this.state.countDate

        this.setState({
            validacao: auxData
        })
    }

    handleCallbackService(e) {

        this.state.countService = 0

        e.map((ee) => {
            if (ee.valido != true) {
                var aux = this.state.countService
                this.state.countService = aux + 1
            }

        })

        var auxData = this.state.validacao
        auxData.Servico = this.state.countService

        this.setState({
            validacao: auxData
        })
    }

    handleCallbackArea(e) {
        this.state.countArea = 0

        e.map((ee) => {
            if (ee.valido != true) {
                var aux = this.state.countArea
                this.state.countArea = aux + 1
            }

        })

        var auxData = this.state.validacao
        auxData.Area = this.state.countArea

        this.setState({
            validacao: auxData
        })
    }

    handleCallbackNumero(e) {
        this.state.countNumero = 0

        e.map((ee) => {
            if (ee.valido != true) {
                var aux = this.state.countNumero
                this.state.countNumero = aux + 1
            }

        })

        var auxData = this.state.validacao
        auxData.Quantidade = this.state.countNumero

        this.setState({
            validacao: auxData
        })
    }

    handleCallbackEquipe(e){
        this.state.countEquipe = 0

        e.map((ee) => {
            if (ee.valido != true) {
                var aux = this.state.countEquipe
                this.state.countEquipe = aux + 1
            }

        })

        var auxData = this.state.validacao
        auxData.Equipe = this.state.countEquipe

        this.setState({
            validacao: auxData
        })
    }

    validate(e, values) {
        {
            switch (e) {
                case 'date':
                    return <Date data={values} callback={(e) => this.handleCallbackDate(e)} />

                case 'service':
                    return <Service data={values} callback={(e) => this.handleCallbackService(e)} />

                case 'area':
                    return <Area data={values} callback={(e) => this.handleCallbackArea(e)} />

                case 'number':
                    return <Number data={values} callback={(e) => this.handleCallbackNumero(e)} />
                
                case 'team':
                    return <Equipe data={values} callback={(e) => this.handleCallbackEquipe(e)}/>

                default:
                    return <div></div>
            }
        }
    }

    render() {

        const keys = Object.keys(this.props.data)
        const values = this.props.data

        
        const list = []

        keys.map((e, i) => {
            list.push(
                <div key={i} style={i == 1 ? style.body : style.bodyServico}>

                    {this.state.validacao[e] == 0 ? (
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', position: 'relative', right: 0 }}>
                            <div style={{ padding: 5, borderRadius: 200, background: '#30C6BE', width: 40, height: 40, display: 'flex', margin: -5, justifyContent: 'center', alignItems: 'center' }}><Icon type="check" style={{ fontSize: 20, color: 'white' }} /></div>
                        </div>
                    ) : (
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', position: 'relative', right: 0 }}>
                                <div style={{ padding: 5, borderRadius: 200, background: '#FF5C5C', width: 40, height: 40, display: 'flex', margin: -5, justifyContent: 'center', alignItems: 'center' }}><span style={{ fontSize: 20, color: 'white' }}> {this.state.validacao[e]} </span></div>
                            </div>
                        )

                    }

                    <div style={style.body.header}>
                        <span style={style.body.title}>{e}</span>
                    </div>

                    <div style={{ height: '5vh', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', display: 'flex', alignItems: 'flex-end' }}>
                        <div style={i == 1 ? { width: '100%', display: 'flex', marginLeft: 10 } : { display: 'none' }}>
                            <span style={{ flex: 2, fontSize: '12px', fontWeight: 'bold' }}>Código</span>
                            <span style={{ flex: 6.5, fontSize: '12px', fontWeight: 'bold' }}>Descrição</span>
                        </div>
                    </div>

                    <div style={style.body.content}>
                        {this.validate(values[e][0].type, values[e])}
                    </div>
                </div>
            )
        })

        return (
            <div>
                <Modal
                    title="Validação"
                    visible={this.state.show}
                    style={style.modal}
                    centered={true}
                    width="95%"
                    onOk={()=>alert('teste')}
                    onCancel={()=> this.setState({
                        show:false,
                        data: []
                    })}
                >
                    <div style={style.container}>
                        {list}
                    </div>


                </Modal>
            </div>
        )
    }
}
