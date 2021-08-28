export const yearsEnum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior',
}

export const gradEnum = {
  FA21: 'Fall 2021',
  SP22: 'Spring 2022',
  FA22: 'Fall 2022',
  SP23: 'Spring 2023',
  FA23: 'Fall 2023',
  SP24: 'Spring 2024',
  FA24: 'Fall 2024',
  SP25: 'Spring 2025',
}

export const statusEnum = {
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  INTERVIEWING: 'Interviewing',
  DONE_INTERVIEWING: 'Done Interviewing',
  PENDING: 'Pending',
  INVALID: 'Invalid',
}

export const referralEnum = {
  REFERRAL: 'Referral',
  NO_REFERRAL: 'No Referral',
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
  UPPEREH: 'Upperclassman with experience but eh with everything else',
}

export const rolesEnum = {
  AM: 'Academy Member',
  SWE: 'Software Developer',
  AMSWE: 'Software Developer/Academy Member (we will put you in one of these tracks)',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  UI: 'Product Designer',
}

export const permissionRolesEnum = {
  PENDING: 'Pending',
  MEMBER: 'Member',
  LEAD: 'Lead',
  DIRECTOR: 'Director',
}

export const sortByEnum = {
  NAME: 'Name',
  YEAR: 'Year',
  GRADYR: 'Graduation Year',
  STATUS: 'Status',
  ELO: 'Facemash Score',
  MATCHES: 'Number of Matches',
  AVG_INTERVIEW_SCORE: 'Avg Interview Score',
}

export const compareByEnum = {
  YEAR: 'Year',
  GRADYR: 'Graduation Year',
  STATUS: 'Status',
  ROLES: 'Roles',
}

export const selectByEnum = {
  NAME: 'Name',
  EMAIL: 'Email',
  MAJOR: 'Major',
  HOURS: 'Hours',
  ROLES: 'Roles',
  YEAR: 'Year',
  GRADYR: 'Graduation Year',
  STATUS: 'Status',
  LINKS: 'Links',
  STRONG_REFERRALS: 'Strong Referrals',
  REFERRALS: 'Referrals',
  AVG_INTERVIEW_SCORE: 'Avg Interview Score',
  NUM_INTERVIEWS: 'Number of Interviews',
  ELO: 'Facemash Score',
  MATCHES: 'Number of Matches',
}

export const enumToArray = e => {
  return Object.keys(e).map(key => {
    return e[key]
  })
}
