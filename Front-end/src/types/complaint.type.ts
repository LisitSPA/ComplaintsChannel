export interface RequestComplaint {
    reasons: Reasons[];
    isAnonymous : boolean;
    description : string;
    incidentDate : Date;
    personInvolveds : Involved[];
    complainant : Complainant;
    contactEmail : string;
}

export interface ResponseComplaint {
    id: number;
    description : string;
    reasons: Reasons[];
    incidentDate : Date;
    createdOn : Date;
    trackingCode : string;
    trackingEmail : string;
    eStatus : eComplaintStatus;
    involved : Involved[];
    complainantId : number;    
    contactEmail : string;
    modifiedOn : Date;
    complainant : Complainant;
}

export interface RequestEvidencies {
    complaintId: number;
    attachments : any[]; //files
    attachDescription : string[]//descriptions;
}

export interface Reasons {
    id: number;
}

export interface Involved {
    names: string;
    personDescription: string;
}

export interface Complainant {
    names: string;
    eCompanyStatus: number; //enum eCompanyStatus
    position: string;
    area: string;
    eGenre: number; //1 femenino, 2 masculino
    contactPhone: number
}

export enum eCompanyStatus {
    activo = 1,
    inactivo = 2
}

export enum eComplaintStatus {
    pending = 1,
    inProcess = 2,
    completed = 3,
        rejected = 31,
        sanctionApplied = 32,
        preventiveMeasures = 33
}
