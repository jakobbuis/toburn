var config = {
    authorisation: {
        url: 'https://todoist.com/oauth/authorize',
        parameters: {
            client_id: '',
            scope: 'data:read',
            state: '1234'
        },
        access_denied: RegExp(/error=access_denied/)
    },
    access: {
        url: 'https://todoist.com/oauth/access_token',
        parameters: {
            client_id: '',
            client_secret: ''
        },
        clean_url: ''
    }
};
