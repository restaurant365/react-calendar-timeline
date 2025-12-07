import React from 'react'
import Interval from './Interval'
import { Interval as IntervalType, IntervalRenderer, TimelineDate } from '../types/main'
import { SelectUnits } from '../utility/calendar'
import { GetIntervalPropsType } from './types'

export interface CustomDateHeaderProps<Data> {
  headerContext: {
    intervals: IntervalType[]
    unit: SelectUnits
  }
  timelineContext: {
    timelineWidth: number
    visibleTimeStart: number
    visibleTimeEnd: number
    canvasTimeStart: number
    canvasTimeEnd: number
    timezone: string
  }
  getRootProps: (props?: any) => any
  getIntervalProps: GetIntervalPropsType
  showPeriod: (start: TimelineDate, end: TimelineDate) => void
  data: {
    style: React.CSSProperties
    intervalRenderer: (props: IntervalRenderer<Data>) => React.ReactNode
    className?: string
    getLabelFormat: (interval: [TimelineDate, TimelineDate], unit: string, labelWidth: number) => string
    unitProp?: 'primaryHeader'
    headerData?: Data
  }
}

export function CustomDateHeader<Data>({
  headerContext: { intervals, unit },
  getRootProps,
  getIntervalProps,
  showPeriod,
  data: { style, intervalRenderer, className, getLabelFormat, unitProp, headerData },
}: CustomDateHeaderProps<Data>) {
  return (
    <div data-testid={`dateHeader`} className={className} {...getRootProps({ style })}>
      {intervals.map((interval) => {
        const intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth!)
        return (
          <Interval
            key={`label-${interval.startTime.epochMilliseconds}`}
            unit={unit}
            interval={interval}
            showPeriod={showPeriod}
            intervalText={intervalText}
            primaryHeader={unitProp === 'primaryHeader'}
            getIntervalProps={getIntervalProps}
            intervalRenderer={intervalRenderer as any}
            headerData={headerData}
          />
        )
      })}
    </div>
  )
}
