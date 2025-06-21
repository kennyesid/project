import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, IsNumber, ValidateNested, Length, Min, Max } from "class-validator";

export class DataSms {

    @IsNotEmpty({ message: "phoneNumber no debería ser nulo" })
    @IsString({ message: "phoneNumber debe ser un string" })
    @MaxLength(10, { message: "phoneNumber no debería ser mayor a 10 dígitos" })
    @ApiProperty()
    phoneNumber: string;

    @IsNotEmpty({ message: "message no debería ser nulo o vacío" })
    @IsString({ message: "message debe ser un string" })
    @Length(1, 148, { message: "message no debe ser mayor a 148 caracteres" })
    @ApiProperty()
    message: string;

    @IsNotEmpty({ message: "messageType no debería ser nulo" })
    @IsNumber({}, { message: "messageType debe ser un número" })
    @Min(1)
    @Max(3, { message: "messageType no debe ser mayor a 3 dígitos" })
    @ApiProperty()
    messageType: number;

    @IsNotEmpty({ message: "requestorId no debería ser nulo" })
    @IsNumber({}, { message: "requestorId debe ser un número" })
    @Min(1)
    @Max(100000000000, { message: "requestorId debe ser mayor a 100000000000" })
    @ApiProperty()
    requestorId: number;

    @IsNotEmpty({ message: "funcionalityId no debería ser nulo" })
    @IsNumber({}, { message: "funcionalityId debe ser un número" })
    @Min(1)
    @Max(1000, { message: "funcionalityId no debe ser mayor a 1000" })
    @ApiProperty()
    funcionalityId: number
}
export class Metadata {

    @IsNotEmpty({ message: "userCode no debería ser nulo" })
    @IsString({ message: "userCode debe ser un string" })
    @Length(1, 14)
    @ApiProperty()
    userCode: string;

    @IsNotEmpty({ message: "branchCode no debería ser nulo" })
    @IsNumber({}, { message: "branchCode debe ser un número" })
    @Min(1)
    @Max(999, { message: "branchCode no debe ser mayor a 999" })
    @ApiProperty()
    branchCode: number;

    @IsNotEmpty({ message: "applicationCode no debería ser nulo" })
    @IsNumber({}, { message: "applicationCode debe ser un número" })
    @Min(1)
    @Max(99, { message: "applicationCode no debe ser mayor a 99" })
    @ApiProperty()
    applicationCode: number
}

export class SendSms {

    @IsNotEmpty({ message: "data no debería ser nulo" })
    @ValidateNested({ each: false })
    @Type(() => DataSms)
    @ApiProperty()
    data: DataSms;

    @IsNotEmpty({ message: "metadata no debería ser nulo" })
    @ValidateNested({ each: false })
    @Type(() => Metadata)
    @ApiProperty()
    metadata: Metadata

}

