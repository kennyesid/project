import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        ProviderIsTigo: process.env.PROVIDER_IS_TIGO,
        Tigo: {
            endPoint: process.env.OUTBOUND_TIGO_SERVICE,
            version: process.env.TIGO_VERSION,
            cid: process.env.TIGO_CID,
            password: process.env.TIGO_PASSWORD
        },
        Infobip: {
            endPoint: process.env.INFOBIP_SERVICE,
            soapAction: process.env.INFOBIP_SOAP_ACTION,
            sender: process.env.INFOBIP_SENDER
        },
        Oracle: {
            connectionString: process.env.ORACLE_DB_CONSTRING,
            user: process.env.ORACLE_DB_USER,
            pass: process.env.ORACLE_DB_PASS
        },
        Mongo: {
            dataBase: process.env.MONGO_DATABASE,
            port: process.env.PORT_MONGO,
            url: process.env.MONGO_URL,
            dataBaseName: process.env.MONGO_DB_NAME,
            Collection: {
                notificaciones: process.env.MONGO_COLLECTION_NOTIFICACIONES,
                parameter: process.env.MONGO_COLLECTION_PARAMETER,
                trazas: process.env.MONGO_COLLECTION_TRAZAS
            }
        },
        EndPoint:{
            timeOut: process.env.TIMEOUT
        },
        ErrorCode: {
            CONNECTION_REFUSED: 'ECONNREFUSED',
        }
    }
});
