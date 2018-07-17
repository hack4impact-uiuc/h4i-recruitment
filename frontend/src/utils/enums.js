export const yearsenum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior'
}

export const gradenum = {
  FA19: 'Fall 2019',
  SP20: 'Spring 2020',
  FA20: 'Fall 2020',
  SP21: 'Spring 2021',
  FA21: 'Fall 2021',
  SP22: 'Spring 2022',
  FA22: 'Fall 2022',
  SP23: 'Spring 2023'
}

export const statusenum = {
  ACCEPTED: 'Accepted',
  DENIED: 'Rejected',
  INTERVIEWING: 'Interviewing',
  PENDING: 'Pending'
}

export const rolesenum = {
  SWE: 'Software Engineer',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  CD: 'Community Director'
}

export const enumToArray = e => {
  return Object.keys(e).map(key => {
    return e[key]
  })
}
