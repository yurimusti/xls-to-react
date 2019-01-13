import React from 'react'
import { Input, Tooltip, Icon } from 'antd'
import {style} from '../style/BaseValidateStyle'


export default class Equipe extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
    }

  }

  componentDidMount() {
    this.validarEquipe(this.state.data)
  }

  handleChangeEquipe(e, i) {
    let aux = this.state.data
    aux[i].value = e.target.value

    this.setState({
      data: aux
    })
    this.validarEquipe(this.state.data)
    this.props.callback(this.state.data)
  }

  validarEquipe(value) {

    value.map((e, i) => {
      if (e.value != "") {
        let aux = this.state.data
        aux[i].valido = true
        aux[i].message = ""
        this.setState({
          data: aux
        })
      }else{
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
            <Input onChange={(e) => this.handleChangeEquipe(e, i)} placeholder="Digite uma Equipe" defaultValue={e.value} style={e.valido ? style.campo : style.campoError} />
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




