
export const constantError = {
    SEND_ERROR: {
        CODE: "1",
        MSJ: "No se pudo confirmar el envío de la notificación",
        CODE_MSJ: "1|No se pudo confirmar el envío de la notificación"
    },

    TIMEOUT_ERROR: {
        CODE: "2",
        MSJ: "Problema de comunicacion time out",
        CODE_MSJ: "2|Problema de comunicacion time out"
    },
    EXTERNAL_ERROR: {
        CODE: "3",
        MSJ: "Canal externo no disponible",
        CODE_MSJ: "3|Canal externo no disponible"
    },
    SMS_ERROR: {
        CODE: "4",
        MSJ: "Sin Crédito para el envío de SMS",
        CODE_MSJ: "4|Sin Crédito para el envío de SMS"
    },
    FUNCIONALITY_ERROR: {
        CODE: "5",
        MSJ: "Funcionalidad inexistente",
        CODE_MSJ: "5|Funcionalidad inexistente"
    },
    DEFAULT_ERROR: {
        CODE: "6",
        MSJ: "Error desconocido",
        CODE_MSJ: "6|Error desconocido"
    },
    VALIDATION_ERROR: {
        CODE: "7",
        MSJ: "Error de validación",
        CODE_MSJ: "7|Error de validación"
    },
    VALIDATION_AUTH_ERROR: {
        CODE: "8",
        MSJ: "Credenciales incorrectas para la funcionalidad registrada",
        CODE_MSJ: "8|Credenciales incorrectas para la funcionalidad registrada"
    },
    VALIDATION_FLAG_ERROR: {
        CODE: "9",
        MSJ: "Problemas con la tabla Microbatalla_sms",
        CODE_MSJ: "9|Problemas con la tabla Microbatalla_sms"
    }
}

