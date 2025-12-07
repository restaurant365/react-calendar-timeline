import React, { Component, FC } from 'react'

import { iterateTimes } from '../utility/calendar'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { TimelineTimeSteps } from '../types/main'

interface WrapperColumnsProps {
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  lineCount: number
  minUnit: keyof TimelineTimeSteps
  timeSteps: TimelineTimeSteps
  height: number
  verticalLineClassNamesForTime?: (a: number, b: number) => string[]
}

interface ColumnsProps extends WrapperColumnsProps {
  timezone: string
  getLeftOffsetFromDate: (time: number) => number
}

class Columns extends Component<ColumnsProps> {
  shouldComponentUpdate(nextProps: ColumnsProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.minUnit === this.props.minUnit &&
      nextProps.timeSteps === this.props.timeSteps &&
      nextProps.height === this.props.height &&
      nextProps.timezone === this.props.timezone &&
      nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime
    )
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      timezone,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate,
    } = this.props

    const lines: React.JSX.Element[] = []

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, timezone, (time, nextTime) => {
      const minUnitValue = time[minUnit === 'day' ? 'day' : minUnit]
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)

      let classNamesForTime: string[] = []
      if (verticalLineClassNamesForTime) {
        classNamesForTime = verticalLineClassNamesForTime(time.epochMilliseconds, nextTime.epochMilliseconds - 1)
      }

      // TODO: rename or remove class that has reference to vertical-line
      const classNames =
        'rct-vl' +
        (firstOfType ? ' rct-vl-first' : '') +
        (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ` rct-day-${time.dayOfWeek} ` : ' ') +
        classNamesForTime.join(' ')

      const left = getLeftOffsetFromDate(time.epochMilliseconds)
      const right = getLeftOffsetFromDate(nextTime.epochMilliseconds)
      lines.push(
        <div
          key={`line-${time.epochMilliseconds}`}
          className={classNames}
          style={{
            pointerEvents: 'none',
            top: '0px',
            left: `${left}px`,
            width: `${right - left}px`,
            height: `${height}px`,
          }}
        />,
      )
    })

    return <div className="rct-vertical-lines">{lines}</div>
  }
}

const ColumnsWrapper: FC<WrapperColumnsProps> = ({ ...props }) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate, getTimelineState }) => {
        const timelineState = getTimelineState()
        return <Columns getLeftOffsetFromDate={getLeftOffsetFromDate} timezone={timelineState.timezone} {...props} />
      }}
    </TimelineStateConsumer>
  )
}

export default ColumnsWrapper
