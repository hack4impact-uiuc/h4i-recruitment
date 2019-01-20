const yearsEnum = {
  FRESHMAN: 'Freshman',
  SOPHOMORE: 'Sophomore',
  JUNIOR: 'Junior',
  SENIOR: 'Senior'
}

const gradEnum = {
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
  SWE: 'Software Developer',
  PM: 'Product Manager',
  TL: 'Tech Lead',
  UI: 'UI/UX Designer'
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
  enumToArray
}
