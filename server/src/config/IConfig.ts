interface IServerConfig{
    devmode: string,
    port: number,
    jwtSecret: string,
    mongoUrl: string
}

export {IServerConfig}