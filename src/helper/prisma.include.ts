
export const MovieInclude = {
    MovieCharacter: {
        include: {
            Character: true
        }
    },
    MovieGenre: {
        include: {
            Genre: true
        }
    }
}

export const GenreInclude = {
    MovieGenre: {
        include: {
            Movie: true,
            Genre: true,
        }
    }
}

export const MovieCharacterInclude = {
    Character: true,
    Movie: {
        include: MovieInclude
  }
}

export const CharacterInclude = {
    MovieCharacter : {
        include: {
          Character: true,
          Movie: true
        }
    }
}


export const MovieGenreInclude = {
    Movie: {
      include : {
        MovieCharacter : {
          include: {
            Character: true
          }
        },
        MovieGenre: {
          include: {
            Genre: true
          }
        }
      }
    }
    
}