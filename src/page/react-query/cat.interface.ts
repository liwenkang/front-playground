interface CatDTO {
  _id: string;
  name: string;
  age: string;
  breed: string;
}

type CatsDTO = CatDTO[];

export type { CatDTO, CatsDTO };
