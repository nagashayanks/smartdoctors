
export interface CurrentUser {
    userId: number;
    userName: string;
}

export interface TransactionSummary {
    transactionId: number;
    sourceAccountNumber: number;
    destinationAccountNumber: number;
    transactionAmount: number;
    transactionType: string;
    transactionDate: string;
    availableBalance: number;
}
export interface BookedslotAppointments{

    hospitalName: string;
    date: string;
    slotTime: string;
    patientId: number;
    patientName: string;
    email: string;
    mobile: number;

 }
