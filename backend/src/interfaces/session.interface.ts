export interface Session {
  id: number;
  role: string;
}

export type RequestSession = Request & { session?: Session };
