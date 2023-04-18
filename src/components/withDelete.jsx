import React from 'react';

const withDeleteButton = (WrappedComponent) => function withDelete(props) {
  const { magazine, onDelete } = props;
  return (
    <div>
      <WrappedComponent {...props} />
      <button type="button" onClick={() => onDelete(magazine)}>Delete</button>
    </div>
  );
};

export default withDeleteButton;
