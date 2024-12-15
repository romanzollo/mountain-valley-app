import PropTypes from 'prop-types';

function Empty({ resourceName }) {
    return <p>No {resourceName} could be found.</p>;
}

export default Empty;

// prop-types
Empty.propTypes = {
    resourceName: PropTypes.string.isRequired,
};
