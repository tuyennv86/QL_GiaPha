export class ParentChildResponse {
  id: number;
  father_id?: number;
  mother_id?: number;
  child_id: number;
  relationship_type: number;
  father_name?: string;
  mother_name?: string;
  child_name: string;
  gender?: number;
}
