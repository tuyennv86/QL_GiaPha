import { PersonType } from '../enum/person-type.enum';

export class PersonResponse {
  id: number;
  family_id: number;
  branch_id: number;
  full_name: string;
  gender: number;
  birth_date?: Date | null;
  death_date?: Date | null;
  biography: string;
  avatar: string;
  generation: number;
  is_alive: boolean;
  job: string;
  place_of_birth: string;
  note: string;
  person_type: PersonType;
  family?: { id: number; family_name: string } | null;
  branch?: { id: number; branch_name: string } | null;
}

export class PersonResponseList {
  items: PersonResponse[];
  total: number;
  page: number;
  limit: number;
}
