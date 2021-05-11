export class CreateMovieDTO {
    title: string;
    name: "";
    released_date: Date;
    description: string;
}

export type UpdateMovieDTO = Partial<CreateMovieDTO>;