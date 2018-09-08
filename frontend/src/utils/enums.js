export const yearsEnum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior'
}

export const gradEnum = {
  SP19: 'Spring 2019',
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

export const categoryEnum = {
  FRESHMAYBE: 'freshman - maybe',
  FRESHPOTENTIAL: 'freshman - with lack of experience but high potential and initiative',
  FRESHYES: 'Freshman - yes',
  DONTACCEPT: 'Don’t Accept',
  EH: 'Weak maybe (eh)',
  MAYBE: 'Maybe ( I wouldn’t necessarily accept this candidate, but I’m open to if others are)',
  STRONGMAYBE:
    'Strong Maybe (I wouldn’t fight to accept this candidate, but I think they would be a good addition to the team)',
  VOUCH: 'Strongly Vouch for this candidate',
  UPPEREH: 'Upperclassman with experience but eh with everything else'
}

export const rolesEnum = {
  SWE: 'Software Developer',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  UI: 'UI/UX Designer'
}

export const sortByEnum = {
  GRADYR: 'Graduation Year',
  YR: 'Year',
  STS: 'Status',
  ELO: 'Facemash Score'
}

export const selectByEnum = {
  NAME: 'Name',
  MAJOR: 'Major',
  HOURS: 'Hours',
  ROLES: 'Roles',
  YEAR: 'Year',
  GRADYR: 'Graduation Year',
  STATUS: 'Status',
  RESUME: 'Resume',
  WEBSITE: 'Website',
  LINKEDIN: 'LinkedIn',
  ELO: 'Facemash Score',
  MATCHES: 'Number of Matches'
}

export const enumToArray = e => {
  return Object.keys(e).map(key => {
    return e[key]
  })
}
