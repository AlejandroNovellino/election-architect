export enum DraftStatus {
  enProgreso = 'En progreso',
  finalizado = 'Finalizado',
  eliminado = 'Eliminado',
}

export interface GeneralDraftInfo {
  id: string;
  name: string;
  startingDate: Date;
  status: DraftStatus;
}
