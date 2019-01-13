import React from 'react';
import ReactDOM from 'react-dom';
import Validate from './components/Validate';
import 'antd/dist/antd.css'

const validates = ["date", "URL_SERVICO_VALIDACAO", "URL_AREA_VALIDACAO", "number","URL_EQUIPE_VALIDACAO"]
const titles = ["Data","Serviço", "Área", "Quantidade", "Equipe"];


ReactDOM.render( 
    <Validate /> ,
    document.getElementById('root'));