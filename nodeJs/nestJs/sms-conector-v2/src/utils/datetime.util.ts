import { DateTimeModel } from "../sms/models/date.time.model";



export class DateTimeUtil {

    async getDateTime(fecha = new Date()): Promise<DateTimeModel> {

        let resultDateTime = new DateTimeModel();

        let month = ((fecha.getMonth() + 1) < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);

        let day = ((fecha.getDate()) < 10) ? '0' + fecha.getDate() : fecha.getDate();

        //time
        let hour = ((fecha.getHours()) < 10) ? '0' + fecha.getHours() : fecha.getHours();
        let minutes = ((fecha.getMinutes()) < 10) ? '0' + fecha.getMinutes() : fecha.getMinutes();
        let seconds = ((fecha.getSeconds()) < 10) ? '0' + fecha.getSeconds() : fecha.getSeconds();

        resultDateTime.date = fecha.getFullYear() + '-' + month + '-' + day;
        resultDateTime.time = hour + ":" + minutes + ":" + seconds;

        return resultDateTime;
    }

}