export const yearsEnum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior'
}

export const gradEnum = {
  FA19: 'Fall 2019',
  SP20: 'Spring 2020',
  FA20: 'Fall 2020',
  SP21: 'Spring 2021',
  FA21: 'Fall 2021',
  SP22: 'Spring 2022',
  FA22: 'Fall 2022',
  SP23: 'Spring 2023'
}

export const statusEnum = {
  ACCEPTED: 'Accepted',
  DENIED: 'Rejected',
  INTERVIEWING: 'Interviewing',
  PENDING: 'Pending'
}

export const rolesEnum = {
  SWE: 'Software Engineer',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  UI: 'UI/UX Designer'
}

export const enumToArray = e => {
  return Object.keys(e).map(key => {
    return e[key]
  })
}
