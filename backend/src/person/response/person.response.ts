export class PersonResponse {
  id: number;
  family_id: number;
  branch_id: number;
  full_name: string;
  gender: number;
  birth_date: Date;
  death_date: Date;
  biography: string;
  avatar: string;
  generation: number;
  is_alive: boolean;
  job: string;
  place_of_birth: string;
}

export class PersonResponseList {
  items: PersonResponse[];
  total: number;
  page: number;
  limit: number;
}
