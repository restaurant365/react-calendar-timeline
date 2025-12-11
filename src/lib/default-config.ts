export const defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

export const defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1,
}

type UnitValue = {
  long: Intl.DateTimeFormatOptions
  mediumLong: Intl.DateTimeFormatOptions
  medium: Intl.DateTimeFormatOptions
  short: Intl.DateTimeFormatOptions
}
export const defaultHeaderFormats: Record<string, UnitValue> = {
  year: {
    long: { year: 'numeric' },
    mediumLong: { year: 'numeric' },
    medium: { year: 'numeric' },
    short: { year: '2-digit' },
  },
  month: {
    long: { month: 'long', year: 'numeric' },
    mediumLong: { month: 'long' },
    medium: { month: 'short' },
    short: { month: 'numeric', year: '2-digit' },
  },
  week: {
    long: { month: 'short', day: 'numeric' },
    mediumLong: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
  },
  day: {
    long: { weekday: 'long', month: 'long', day: 'numeric' },
    mediumLong: { weekday: 'long', month: 'long', day: 'numeric' },
    medium: { day: 'numeric', weekday: 'short' },
    short: { day: 'numeric' },
  },
  hour: {
    long: { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    mediumLong: { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    medium: { hour: 'numeric', minute: 'numeric' },
    short: { hour: 'numeric' },
  },
  minute: {
    long: { hour: 'numeric', minute: 'numeric' },
    mediumLong: { hour: 'numeric', minute: 'numeric' },
    medium: { hour: 'numeric', minute: 'numeric' },
    short: { minute: 'numeric' },
  },
  second: {
    long: { minute: 'numeric', second: 'numeric' },
    mediumLong: { minute: 'numeric', second: 'numeric' },
    medium: { minute: 'numeric', second: 'numeric' },
    short: { second: 'numeric' },
  },
}
