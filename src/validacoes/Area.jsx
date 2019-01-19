import React from 'react'
import { Input, Tooltip, Icon, Spin } from 'antd'
import { style } from '../style/BaseValidateStyle'
import {ValidaArea} from '../request'
const antIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;


export default class Area extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
    }

  }

  componentDidMount() {
    this.validarTodasAreas(this.state.data)
  }

  handleChangeArea(e, i) {
    let aux = this.state.data
    aux[i].value = e.target.value

    this.setState({
      data: aux
    })
  }

  validarTodasAreas(value) {

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
        ValidaArea(that, aux[i], i)
      }
    })

    this.props.callback(this.state.data)

  }

  validarArea(i) {

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
      ValidaArea(that, aux[i], i)
    }
  }

  onBlurArea(e, i) {

    this.validarArea(i)
    this.props.callback(this.state.data)

}

  render() {
    const render = []
    this.state.data.map((e, i) => {
      render.push(
        <div style={style.body} key={i}>
          <div style={{ flex: 8 }}>
            <Input onBlur={(ee) => this.onBlurArea(ee, i)} onChange={(e) => this.handleChangeArea(e, i)} placeholder="Digite uma Área" defaultValue={e.value} style={e.valido ? style.campo : style.campoError} />
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




