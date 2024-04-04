// CheckIcon.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface CheckIconProps {
    optional: boolean;
}

const CheckIcon: React.FC<CheckIconProps> = ({ optional }) => {
    const iconColor = optional ? 'purple' : 'green';
    return (
        <FontAwesomeIcon icon={faCheck} style={{ color: iconColor }} />
    );
}

export default CheckIcon;


