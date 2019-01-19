import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Modal } from 'antd'
import ModalValidador from './ModalValidador'
import XLSX from 'xlsx'

export default class ImportacaoGeral extends Component {



    constructor(props) {
        super(props)

        this.state = {
            show: false,
            importe: {}
        }

        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(e) {
        var files = e.target.files, file;
        if (!files || files.length == 0) return;
        file = files[0];
        const reader = new FileReader();

        var that = this;
        reader.onload = function (e) {
            var filename = files.name;
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            // call 'xlsx' to read the file
            var oFile = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true, cellFormula: true });

            if (oFile.Strings == undefined || oFile.Strings.length == 0) {
                return
            } else {
                if (oFile.Sheets.Programacao != undefined) {

                    const data = oFile.Sheets.Programacao
                    const titles = []
                    var size = 0;
                    var letter = ""
                    var Data = []
                    var Servico = []
                    var Area = []
                    var Quantidade = []
                    var Equipe = []

                    titles.push(data["A2"].v)
                    titles.push(data["B2"].v)
                    titles.push(data["C2"].v)
                    titles.push(data["D2"].v)
                    titles.push(data["E2"].v)
                    titles.push(data["F2"].v)

                    var c = data["!ref"].split(":");
                    letter = c[1].charAt(0)
                    if ((c[1].length - 1) == 1) {
                        size = c[1].charAt(1)
                    }
                    if ((c[1].length - 1) == 2) {
                        size = c[1].charAt(1) + c[1].charAt(2)
                    }
                    if ((c[1].length - 1) == 3) {
                        size = c[1].charAt(1) + c[1].charAt(2) + c[1].charAt(3)
                    }
                    if ((c[1].length - 1) == 4) {
                        size = c[1].charAt(1) + c[1].charAt(2) + c[1].charAt(3) + c[1].charAt(4)
                    }

                    //Data
                    for (var i = 3; i <= size; i++) {
                        let value = (data["A" + i]) == null ? "" : data["A" + i].v
                        var aux = {
                            value:value,
                            type: 'date'
                        }
                        
                        Data.push(aux)
                    }

                    //Servico
                    for (var i = 3; i <= size; i++) {
                        let codigo = (data["B" + i]) == null ? "" : data["B" + i].v
                        let descricao = (data["C" + i]) == null ? "" : data["C" + i].v
                        var aux = {
                            codigo: codigo,
                            descricao: descricao,
                            type: 'service'
                        }
                        Servico.push(aux)
                    }

                    //Area
                    for (var i = 3; i <= size; i++) {
                        let area = (data["D" + i]) == null ? "" : data["D" + i].v
                       var aux = {
                            value: area,
                            type: 'area'
                        }
                        
                        Area.push(aux)
                    }

                    //Quantidade
                    for (var i = 3; i <= size; i++) {
                        let qt = (data["E" + i]) == null ? "" : data["E" + i].v
                        var aux = {
                            value: qt,
                            type: 'number'
                        }
                        
                        Quantidade.push(aux)
                    }

                    //Equipe
                    for (var i = 3; i <= size; i++) {
                        let equipe = (data["F" + i]) == null ? "" : data["F" + i].v
                        var aux = {
                            value: equipe,
                            type: 'team'
                        }
                        
                        Equipe.push(aux)
                    }
                    
                    var aux2 = {}
                    aux2.Data = Data
                    aux2.Servico = Servico
                    aux2.Area = Area
                    aux2.Quantidade = Quantidade
                    aux2.Equipe = Equipe

                    that.setState({
                        importe:aux2,
                        show:true
                    })

                }

            }
        }
        reader.readAsArrayBuffer(e.target.files[0])
    }

    render() {
        return (
            <div>
                <Dropzone onDrop={(a, b, c) => this.onDrop(c)}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps()}

                                style={{ border: '1px dashed #ccc ', borderRadius: 10, padding: '30px 30px' }}
                            >
                                <input {...getInputProps()} />
                                <div style={{ display: 'flex', flex: 1, height: '10vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                    <Icon type="cloud-upload" style={{ fontSize: '32px', color: '#0092cc' }} />
                                    <span style={{ fontSize: '12px', color: '#0092cc', fontWeight: '500' }}>
                                        Importar arquivo .xls
                                    </span>

                                </div>
                            </div>
                        )
                    }}
                </Dropzone>
                <ModalValidador show={this.state.show} data={this.state.importe} />

            </div>
        )
    }
}
