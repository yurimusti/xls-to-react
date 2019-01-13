import React, { Component } from 'react';
import { Modal, Upload, Icon, message, Input, Checkbox, Form, Button } from 'antd'
import Dropzone from 'react-dropzone'

const FormItem = Form.Item;

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visibleModal: true
    }
  }

  onDrop() {
    console.log('drop')
  }

  render() {
    return (
      <div >
        <Modal
          centered={true}
          style={{ height: '100vh' }}
          title="Importar Programação"
          visible={this.state.visibleModal}
          onOk={() => alert('OK')}
          onCancel={() => alert('Cancel')}
        >
          <Form>
            <FormItem label="Versão" required style={{marginBottom:0}}>
              <Input placeholder="Versão" />
            </FormItem>
            <FormItem label='Código' required style={{marginBottom:0}}>
              <Input placeholder="Código" />
            </FormItem>
            <FormItem label='Descrição' required style={{marginBottom:0}}>
              <Input placeholder="Descrição" />
            </FormItem>
            <FormItem label='Ativo' required style={{marginBottom:10}}>
              <Checkbox>Ativo</Checkbox>
            </FormItem>
            <FormItem>
              
            </FormItem>
          </Form>
        </Modal>

        <Modal
          centered={true}
          style={{ height: '100vh' }}
          title="Importação Programação"
          visible={this.state.onDropValid}
          onOk={() => alert('OK')}
          onCancel={() => alert('Cancel')}
        >

        </Modal>


      </div >
    );
  }
}

export default Form.create()(App);
