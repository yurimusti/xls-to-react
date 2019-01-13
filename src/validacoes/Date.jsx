import React from 'react'
import { Input, Tooltip, Icon } from 'antd'
import { ANO_ATUAL } from '../config/constants'
import {style} from '../style/BaseValidateStyle'


export default class Date extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
    }

  }

  componentDidMount() {
    this.validarData(this.state.data)
  }

  handleChangeData(e, i) {
    let aux = this.state.data
    aux[i].value = e.target.value

    this.setState({
      data: aux
    })
    this.validarData(this.state.data)
    this.props.callback(this.state.data)
  }

  validarData(value) {

    value.map((e, i) => {
      if (e.value != "") {
        var dia = e.value.substr(0, 2)
        var mes = e.value.substr(3, 2)
        var ano = e.value.substr(6, 4)
        if (e.value.length == 10 && e.value.substr(2, 1) == '/' && e.value.substr(5, 1) == '/') {
          if (dia <= 31 && dia > 0 && mes <= 12 && mes > 0 && ano <= ANO_ATUAL & ano > '1900') {
            let aux = this.state.data
            aux[i].valido = true
            aux[i].message = ""
            this.setState({
              data: aux
            })
          }

        } else {
          let aux = this.state.data
          aux[i].valido = false
          aux[i].message = "Formato inválido: (DD/MM/AAAA) => D: Dia | M: Mês | A: Ano"
          this.setState({
            data: aux
          })
        }
      } else {
        let aux = this.state.data
        aux[i].valido = false
        aux[i].message = "Campo obrigatório."
        this.setState({
          data: aux
        })
      }
    })

    this.props.callback(this.state.data)

  }

  render() {
    const render = []
    this.state.data.map((e, i) => {
      render.push(
        <div style={style.body} key={i}>
          <div style={{ flex: 8 }}>
            <Input onChange={(e) => this.handleChangeData(e, i)} placeholder="Digite uma data" defaultValue={e.value} style={e.valido ? style.campo : style.campoError} />
          </div>

          {e.valido ? (
            <div style={{ flex: 1, visibility: 'block' }} >
            </div>
          ) : (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tooltip title={e.message}  >
                  <Icon theme="filled" type="info-circle" />
                </Tooltip>
              </div>
            )}
        </div>
      )
    })
    return (
      <div>
        {render}
      </div>

      // <div>
      //   <DatePicker defaultValue={moment(this.state.value, dateFormat)} format={dateFormat} style={style.campo} />
      // </div>
    )
  }
}




