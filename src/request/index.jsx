
import reqwest from 'reqwest';


const ValidaServico = (self, model, pos) => {

    const aux = {
        ClientId:"dab98b50-c009-44e3-bc8c-8f59b44fe54f",
        ProjectId:"7ad09ab3-8ef2-430a-b793-67d99845caab"
    }

    Object.assign(model, aux)

    reqwest({
        url: 'http://localhost:3111/api/en/' + "VerificacoesComponent/Servico",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: false,
        withCredentials: false,      
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)
        
        },
        success: function (resp) {

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if(resp.message == 'not found'){
                r[pos].message = 'Serviço não encontrado.'
            }
            if(resp.message == 'not assign'){
                r[pos].message = ' Serviço não vinculado a projeto.'
            }
            
            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data:r,
                
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
        ClientId:"dab98b50-c009-44e3-bc8c-8f59b44fe54f",
        ProjectId:"7ad09ab3-8ef2-430a-b793-67d99845caab"
    }

    Object.assign(model, aux)

    reqwest({
        url: 'http://localhost:3111/api/en/' + "VerificacoesComponent/Area",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: false,
        withCredentials: false,      
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)
        
        },
        success: function (resp) {
            console.log(resp)

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if(resp.message == 'not found'){
                r[pos].message = 'Área não encontrada.'
            }
            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data:r,
                
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
        ClientId:"dab98b50-c009-44e3-bc8c-8f59b44fe54f",
        ProjectId:"7ad09ab3-8ef2-430a-b793-67d99845caab"
    }

    Object.assign(model, aux)

    reqwest({
        url: 'http://localhost:3111/api/en/' + "VerificacoesComponent/Equipe",
        type: 'json',
        method: 'POST',
        contentType: 'application/json',
        crossOrigin: false,
        withCredentials: false,      
        data: JSON.stringify(model)
        ,
        error: function (err) {
            var error = JSON.stringify(err.responseText)
        
        },
        success: function (resp) {
            console.log(resp)

            var r = self.state.data
            r[pos] = resp
            r[pos].loading = false
            if(resp.message == 'not found'){
                r[pos].message = 'Equipe não encontrada.'
            }
            delete resp.ClientId
            delete resp.ProjectId
            self.setState({
                data:r,
                
            })
            self.props.callback(self.state.data)
        }
    }).then((dat) => {
    });


}

export {ValidaServico, ValidaArea, ValidaEquipe}