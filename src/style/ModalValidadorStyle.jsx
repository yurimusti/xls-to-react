const style = {
    modal: {
        height: '100vh'
    },
    container: { display: 'flex', flexDirection: 'row', flex: 1, width: '100%' },
    body: {
        height: '75vh',
        background: '#F8F8F8',
        flex: 2,
        marginRight: 10,
        borderRadius: 10,
        header: {
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: '#0092cc', fontSize: 16, fontWeight: 'bold'
        },
        content: { background: '#fff', height: '64vh', margin: 3 }
    },
    bodyServico: {
        height: '75vh',
        width: '100%',
        background: '#F8F8F8',
        flex: 1,
        marginRight: 10,
        borderRadius: 10,
    }

}

export {style}