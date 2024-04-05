import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    0.5: 'Je n\'ai pas aimé du tout',
    1: 'Je n\'ai pas aimé du tout',
    1.5: 'Moyen',
    2: 'Moyen',
    2.5: 'Ok',
    3: 'Ok',
    3.5: 'Bien',
    4: 'Bien',
    4.5: 'Excellent',
    5: 'Excellent',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


interface HoverRatingProps {
    onInfoChange: (newValue: number) => any;
}

export default function HoverRating({onInfoChange}: HoverRatingProps) {
    const [value, setValue] = React.useState<number | null>(5);
    const [hover, setHover] = React.useState(-1);

    const handleChange = (event: any) => {
        setValue(Number(event.target.value));
        onInfoChange(Number(event.target.value))
    }

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
            {value !== null && (
                <p style={{ margin: 'auto 2.5%'}} >{labels[hover !== -1 ? hover : value]}</p>
            )}
        </div>
    );
}
