
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
    },
    MovieDirector: {
        include : {
            Movie: true, 
            People: true
        }
    },
    MovieWriter: {
        include : {
            Movie: true, 
            People: true
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
    MovieCharacter: {
        include: {
            Character: true,
            Movie: true
        }
    }
}


export const MovieGenreInclude = {
    Movie: {
        include: {
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
    }

}

export const PeopleInclude = {
    MovieDirector: {
        include: {
            People: true,
            Movie: true
        }
    },
    MovieWriter: {
        include: {
            People: true,
            Movie: true
        }
    }
}

export const MovieDirectorOrWriter = {
    Movie: {
      include: {
        MovieDirector: {
          include: {
            People: true
          }
        },
        MovieWriter: {
          include: {
            People: true
          }
        },
        MovieGenre: {
          include: {
            Genre: true
          }
        },
        MovieCharacter: {
          include: {
            Character: true
          }
        },
      }
    },
    People: true
  }