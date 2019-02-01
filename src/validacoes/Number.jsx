import React from 'react'
import { Input, Tooltip, Icon, InputNumber, Spin } from 'antd'
import { style } from '../style/BaseValidateStyle'
import { ValidaUnidade } from '../request';
const antIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;


export default class Number extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
  }

  componentDidMount() {
    this.validarTodasQuantidades(this.state.data)
    this.validarTodasUnidades(this.state.data)
  }

  handleChangeQuantidade(e, i) {

    let aux = this.state.data
    aux[i].numero = e

    this.setState({
      data: aux
    })
    this.validarQuantidade(e, i)
    this.props.callback(this.state.data)
  }

  handleChangeUnidade(e, i) {
    let aux = this.state.data
    aux[i].unidade = e
    this.setState({
      data: aux
    })
  }

  onBlurUnidade(e, i) {
    let aux = this.state.data
    if (aux[i].unidade != '') {
      aux[i].loading = true
      aux[i].disable = true
      this.setState({
        data: aux
      })
      //ValidaUnidade(this, aux[i], i)
      this.props.callback(this.state.data)
    }

  }

  onBlurQuantidade(e, i) {
    let aux = this.state.data
    if (aux[i].unidade != '') {
      aux[i].loading = true
      aux[i].disable = true
      this.setState({
        data: aux
      })
      //ValidaUnidade(this, aux[i], i)
      this.props.callback(this.state.data)
    }

  }

  isNumber(n) {
    var r = n

    r = n.toString()


    if (r.includes(',')) {
      var rAux = r.split(',')
      if (rAux[0].length > 0 && rAux[1].length > 0) {
        return true
      } else {
        return false
      }

    } else {
      return false
    }
  }
 
  validarTodasQuantidades(value) {

    value.map((e, i) => {
      if (e.numero != "") {

        if (this.isNumber(e.numero)) {
          let aux = this.state.data
          aux[i].validoQuantidade = true
          aux[i].message = ""
            this.setState({
              data: aux
            })
        } else {
          let aux = this.state.data
          aux[i].validoQuantidade = false
          aux[i].message = "Formato incorreto."
          this.setState({
            data: aux
          })
        }

      } else {
        let aux = this.state.data
        aux[i].validoQuantidade = false
        aux[i].message = "Campo obrigatório."
        this.setState({
          data: aux
        })
      }
    })

    this.props.callback(this.state.data)

  }

  validarTodasUnidades(value) {
    let that = this;
    value.map((e, i) => {
      if (e.unidade != "") {
        let aux = this.state.data
        aux[i].loading = true
        aux[i].disable = true
        this.setState({
          data: aux
        })
        ValidaUnidade(that, aux[i], i)

      } else {
        let aux = this.state.data
        aux[i].validoUnidade = false
        aux[i].loading = false
        aux[i].disable = false

        aux[i].message = "Campo obrigatório."
        this.setState({
          data: aux
        })
      }
    })
  }

  validarQuantidade(e, i) {

      
    if (e != "") {
      if (this.isNumber(e)) {
        let aux = this.state.data
        
        aux[i].validoQuantidade = true
          this.setState({
            data: aux
          })
      } else {
        
        let aux = this.state.data
        aux[i].validoQuantidade = false;
        aux[i].message = "Formato incorreto. Formato aceito -> (n,n) n=> Numero"
        this.setState({
          data: aux
        })
      }

    } else {
      let aux = this.state.data
      aux[i].validoQuantidade = false
      aux[i].message = "Campo obrigatório."
      this.setState({
        data: aux
      })
    }

    this.props.callback(this.state.data)

  }

  render() {

    const render = []
    this.state.data.map((e, i) => {
      render.push(
        <div style={style.body} key={i}>
          <div style={{ flex: 8, display: 'flex', flexDirection: 'row' }}>
            <Input disabled={e.disable} onBlur={(e) => this.onBlurQuantidade(e, i)} onChange={(e) => this.handleChangeQuantidade(e.target.value, i)} placeholder="Qt" defaultValue={e.numero} style={e.validoQuantidade ? style.campoNumber : style.campoNumberError} />
            <div style={{ marginLeft: 5 }}></div>
            <Input onBlur={(e) => this.onBlurUnidade(e, i)} onChange={(e) => this.handleChangeUnidade(e.target.value, i)} placeholder="Un" defaultValue={e.unidade} style={e.validoUnidade ? style.campoNumber : style.campoNumberError} />
          </div>
          {e.loading ?
            <div style={style.tooltip} >
              <Spin indicator={antIcon} />
            </div> :
            e.validoQuantidade && e.validoUnidade ?
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




