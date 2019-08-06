const newEventFields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'i.e. Product Showcase'
  },
  {
    label: 'Date',
    name: 'date',
    type: 'date'
  },
  {
    label: 'Start Time',
    name: 'startTime',
    type: 'time'
  },
  {
    label: 'End Time',
    name: 'endTime',
    type: 'time'
  },
  {
    label: 'Location',
    name: 'location',
    placeholder: 'i.e. ECEB'
  },
  {
    label: 'Description',
    name: 'description',
    placeholder: 'i.e. Teams present their final product.'
  },
  {
    label: 'Facebook Event Link',
    name: 'fbLink',
    placeholder: 'i.e. https://www.facebook.com/events/2405129342892922/'
  }
]

const newWorkspaceFields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'i.e. Hack4Impact University of Illinois at Urbana-Champaign'
  },
  {
    label: 'Owner',
    name: 'owner',
    placeholder: 'THIS IS TEMPORARY'
  }
]

const newCycleFields = [
  {
    label: 'Term',
    name: 'term',
    placeholder: 'i.e. SP19, FA20'
  }
]

export { newEventFields, newWorkspaceFields, newCycleFields }
