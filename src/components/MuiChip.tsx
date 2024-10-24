import { Stack, Chip } from '@mui/material';
import { useState } from "react";

export const MuiChip = (props: any) => {
    const [chipData, setChipData] = useState(['Lena']);

    const handleDelete = (chipToDelete: string) => {
        setChipData(chips => chips.filter((chip) => chip !== chipToDelete));
    }
    return (
        <Stack direction="row" spacing={2}>
            {
                chipData.map(chip => (
                    <Chip key={chip}
                          color='primary'
                          style={props.color}
                          label={chip}
                          onDelete={() => handleDelete(chip)} />
                ))
            }
        </Stack>
    );
}