import React from 'react'
import PropTypes from 'prop-types'
import drum from './animatedDrum.gif'

const LoadingSpinner = (props) => {
  const { isLoading } = props
  if (!isLoading) {
    return null
  }
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'teal',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 150,
          width: 300,
          backgroundColor: '#B7B7B9',
          whiteSpace: 'nowrap',
          fontSize: '16px',
          borderTop: '2px solid white',
          borderRight: '2px solid #222',
          borderBottom: '2px solid #222',
          borderLeft: '2px solid white',
        }}
      >
        <img
          style={{
            height: 50,
            width: 'auto',
          }}
          src={drum}
          alt="Animated Drum"
        />
        Optimizing your experience...
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default LoadingSpinner
