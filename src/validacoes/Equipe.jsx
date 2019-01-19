import React from 'react'
import { Input, Tooltip, Icon, Spin } from 'antd'
import { style } from '../style/BaseValidateStyle'
import {ValidaEquipe} from '../request'
const antIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;


export default class Equipe extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
    }

  }

  componentDidMount() {
    this.validarTodasEquipes(this.state.data)
  }

  handleChangeEquipe(e, i) {
    let aux = this.state.data
    aux[i].value = e.target.value

    this.setState({
      data: aux
    })
  }

  validarTodasEquipes(value) {

    value.map((e, i) => {
      var e = this.state.data[i]
      var that = this
      var area = e.value

      if (area == "") {

        let aux = this.state.data
        aux[i].valido = false
        aux[i].message = "Campo obrigatório."
        this.setState({
          data: aux,

        })
      }
      else {
        let aux = this.state.data
        aux[i].loading = true
        this.setState({
          data: aux
        })
        ValidaEquipe(that, aux[i], i)
      }
    })

    this.props.callback(this.state.data)

  }

  validarEquipe(i) {

    var e = this.state.data[i]
    var that = this
    var equipe = e.value

    if (equipe == "") {

      let aux = this.state.data
      aux[i].valido = false
      aux[i].message = "Campo obrigatório."
      this.setState({
        data: aux,

      })
    }
    else {
      let aux = this.state.data
      aux[i].loading = true
      this.setState({
        data: aux
      })
      ValidaEquipe(that, aux[i], i)
    }
  }

  onBlurEquipe(e, i) {

    this.validarEquipe(i)
    this.props.callback(this.state.data)

}

  render() {
    const render = []
    this.state.data.map((e, i) => {
      render.push(
        <div style={style.body} key={i}>
          <div style={{ flex: 8 }}>
            <Input onBlur={(ee) => this.onBlurEquipe(ee, i)} onChange={(e) => this.handleChangeEquipe(e, i)} placeholder="Digite uma Equipe" defaultValue={e.value} style={e.valido ? style.campo : style.campoError} />
          </div>

          {e.loading ?
            <div style={style.tooltip} >
              <Spin indicator={antIcon} />
            </div> :
            e.valido ?
              <div style={style.invisibleBlock} ></div> :
              <div style={style.tooltip} >
                <Tooltip title={e.message} >
                  <Icon theme="filled" type="info-circle" />
                </Tooltip>
              </div>

          }
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




