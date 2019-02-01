
import reqwest from 'reqwest';
//import { reactLocalStorage } from 'reactjs-localstorage'


const ValidaServico = (self, model, pos) => {

    const aux = {
       // ClientId: reactLocalStorage.get('clientId'),
       // ProjectId: reactLocalStorage.get('projectId')
    }

    Object.assign(model, aux)

    reqwest({
        url:  "VerificacoesComponent/Servico",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)

        },
        success: function (resp) {

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if (resp.message == 'not found') {
                r[pos].message = 'Serviço não encontrado.'
            }
            if (resp.message == 'not assign') {
                r[pos].message = ' Serviço não vinculado a projeto.'
            }

            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data: r,

            })
            self.props.callback(self.state.data)
        }
    }).then((dat) => {
        // self.setState({
        //     data: dat.Modelos,
        //     loading: false,
        //     update:false,
        //     delete:false
        // })
    });


}

const ValidaArea = (self, model, pos) => {

    const aux = {
        //ClientId: reactLocalStorage.get('clientId'),
       // ProjectId: reactLocalStorage.get('projectId')
    }

    Object.assign(model, aux)

    reqwest({
        url:  "VerificacoesComponent/Area",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)

        },
        success: function (resp) {

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if (resp.message == 'not found') {
                r[pos].message = 'Área não encontrada.'
            }
            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data: r,

            })
            self.props.callback(self.state.data)
        }
    }).then((dat) => {
        // self.setState({
        //     data: dat.Modelos,
        //     loading: false,
        //     update:false,
        //     delete:false
        // })
    });


}

const ValidaEquipe = (self, model, pos) => {

    const aux = {
        //ClientId: reactLocalStorage.get('clientId'),
        //ProjectId: reactLocalStorage.get('projectId')
    }

    Object.assign(model, aux)

    reqwest({
        url:  "VerificacoesComponent/Equipe",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)

        },
        success: function (resp) {

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if (resp.message == 'not found') {
                r[pos].message = 'Equipe não encontrada.'
            }
            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data: r,

            })
            self.props.callback(self.state.data)
        }
    }).then((dat) => {
    });


}

const ValidaUnidade = (self, model, pos) => {
    const aux = {
        //ClientId: reactLocalStorage.get('clientId'),
    }


    Object.assign(model, aux)

    reqwest({
        url: "VerificacoesComponent/Unidade",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)

        },
        success: function (resp) {

            
            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            r[pos].disable = false
            r[pos].type = 'number'
            r[pos].validoUnidade = resp.validoUnidade
            if (resp.message == 'not found') {
                r[pos].message = 'Unidade não encontrada.'
            }
            delete resp.ClientId
            
            self.setState({
                data: r,

            })
            self.validarQuantidade(model.numero, pos)
            self.props.callback(self.state.data)
        }
    }).then((dat) => {
    });


}

export { ValidaServico, ValidaArea, ValidaEquipe, ValidaUnidade }


