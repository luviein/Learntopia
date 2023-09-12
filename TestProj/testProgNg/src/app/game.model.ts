export interface QuestionResponse {

  question : any
  answer : number
  message : string
}

export interface LoginDetails {
  username: string
  password: string
}


export interface RegisterDetails {
  username: string
  email: string
  passw: string
}

export interface RegisterJwtToken {
  token: string
}

export interface HighScores{
  username: string
  mathScore: number
}

export interface DictionaryQuery {
  query: string
}
