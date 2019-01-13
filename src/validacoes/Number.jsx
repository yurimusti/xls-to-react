import React from 'react'
import { Input, Tooltip, Icon } from 'antd'
import {style} from '../style/BaseValidateStyle'

export default class Number extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
  }

  componentDidMount() {
    this.validarNumero(this.state.data)
  }

  handleChangeNumero(e, i) {
    let aux = this.state.data
    aux[i].value = e.target.value

    this.setState({
      data: aux
    })
    this.validarNumero(this.state.data)
    this.props.callback(this.state.data)
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  validarNumero(value) {

    value.map((e, i) => {
      if (e.value != "") {
        if (this.isNumber(e.value)) {
          let aux = this.state.data
          aux[i].valido = true
          aux[i].message = ""
          this.setState({
            data: aux
          })
        } else {
          let aux = this.state.data
          aux[i].valido = false
          aux[i].message = "Campo numérico."
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
            <Input onChange={(e) => this.handleChangeNumero(e, i)} placeholder="Digite uma quantidade" defaultValue={e.value} style={e.valido ? style.campo : style.campoError} />
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
    )
  }
}




