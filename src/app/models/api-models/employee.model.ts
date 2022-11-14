import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Employee{
    id: string,
    name: string,
    dateOfBirth: string,
    mailID: string,
    phoneNumber: number,
    profileImageUrl: string,
    genderId: string,
    gender: Gender,
    address: Address
};