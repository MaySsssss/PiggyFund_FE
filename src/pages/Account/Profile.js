import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Avatar,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Sydney',
    country: 'Australia',
    jobTitle: 'Software Developer',
    name: 'Joseph Biden',

};

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    }
}));

const Profile = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <>
            <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
            >
                <Avatar
                    className={classes.avatar}
                    src={user.avatar}
                />
                <div style={{ height: 40 }}></div>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    {`${user.city} ${user.country}`}
                </Typography>
                <Typography
                    className={classes.dateText}
                    color="textSecondary"
                    variant="body1"
                >
                    {`${moment().format('hh:mm A')}`}
                </Typography>
            </Box>
        </>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;