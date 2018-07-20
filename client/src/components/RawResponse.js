import React from 'react';

const RawResponse = ({ data, error }) => (
  <div>
    {data ? <pre key="data">{JSON.stringify(data, null, 2)}</pre> : null}
    {error ? (
      <pre key="error" style={{ color: 'red' }}>
        {JSON.stringify(error, null, 2)}
      </pre>
    ) : null}
  </div>
);

export default RawResponse;
