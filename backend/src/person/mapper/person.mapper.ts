import { Person } from '../entities/person.entity';
import { PersonResponse } from '../response/person.response';

export class PersonMapper {
  static toResponse(entity: Person): PersonResponse {
    return {
      id: entity.id,
      family_id: entity.family_id,
      branch_id: entity.branch_id,
      full_name: entity.full_name,
      gender: entity.gender,
      birth_date: entity.birth_date,
      death_date: entity.death_date,
      biography: entity.biography,
      avatar: entity.avatar,
      generation: entity.generation,
      is_alive: entity.is_alive,
      job: entity.job,
      place_of_birth: entity.place_of_birth,
    };
  }
}
