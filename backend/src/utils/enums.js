const yearsEnum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior'
}

const gradEnum = {
  FA21: 'Fall 2021',
  SP22: 'Spring 2022',
  FA22: 'Fall 2022',
  SP23: 'Spring 2023',
  FA23: 'Fall 2023',
  SP24: 'Spring 2024',
  FA24: 'Fall 2024',
  SP25: 'Spring 2025'
}

const statusEnum = {
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  INTERVIEWING: 'Interviewing',
  DONE_INTERVIEWING: 'Done Interviewing',
  PENDING: 'Pending',
  INVALID: 'Invalid'
}

const referralEnum = {
  STRONG_REFERRAL: 'Strong Referral',
  REFERRAL: 'Referral',
  NO_REFERRAL: 'No Referral'
}

const rolesEnum = {
  AM: 'Academy Member',
  AMSWE: 'Software Developer/Academy Member (we will put you in one of these tracks)',
  SWE: 'Software Developer',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  UI: 'UI/UX Designer'
}

const permissionRolesEnum = {
  PENDING: 'Pending',
  MEMBER: 'Member',
  LEAD: 'Lead',
  DIRECTOR: 'Director'
}

const enumToArray = e => {
  return Object.keys(e).map(key => {
    return e[key]
  })
}

module.exports = {
  yearsEnum,
  gradEnum,
  statusEnum,
  referralEnum,
  rolesEnum,
  enumToArray,
  permissionRolesEnum
}
