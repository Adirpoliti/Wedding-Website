import { format, transports } from "winston";
import * as winston from "winston";

export const loggerData = winston.createLogger({
    transports: [
        new transports.File({
            filename: 'loggerData.text',
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.prettyPrint()
            )
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.prettyPrint()
            )
        })
    ]
})

export const errorData = winston.createLogger({
    transports: [
        new transports.File({
            filename: 'errorData.text',
            level: 'error',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.prettyPrint()
            )
        }),
        new transports.Console({
            level: 'error',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.prettyPrint()
            )
        })
    ]
})